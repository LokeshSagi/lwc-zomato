/* eslint-disable no-alert */
/* eslint-disable no-console */
import {
    LightningElement,
    wire,
    track
} from 'lwc';

import {
    registerListener,
    unregisterAllListeners
} from 'c/pubsub';

import {
    CurrentPageReference
} from 'lightning/navigation';

import myResults from '@salesforce/apex/ZomatoGetRestaurents.zomatoAllRests';

export default class ZomatoRestaurentResults extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @track restRes;
    @track myRests;
    @track noResults;
    @track totalResults;
    @track totalPages;
    @track currentPage = 1;
    @track _filter;

    @track clickedRest;

    @track showModal;

    connectedCallback() {
        registerListener("filterUpdate", this.handleFilterUpdate, this);
        registerListener("cityDeselect", this.handleCityRest, this);
    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleRestFromChild(event) {
        //alert('info came');
        this.showModal = true;
        this.clickedRest = event.detail;
        //alert('Detail -> '+JSON.stringify(event.detail));
    }

    removeModal() {
        this.showModal = undefined;
    }

    handleCityRest() {
        this.myRests = undefined;
    }

    handleFilterUpdate(filter) {
        console.log("Filter--->" + JSON.stringify(filter));
        this._filter = filter;
        myResults({
            filters: JSON.stringify(this._filter)
        }).then(result => {
            
            this.restRes = JSON.parse(result);
            //console.log(`Restaurents => ${JSON.stringify(this.restRes)}`);
            if(this.restRes.restaurants.length > 0) {
                this.myRests = this.restRes.restaurants;
                this.totalResults = this.restRes.results_found > 100 ? 100 : this.restRes.results_found;
                //alert('this.totalResults -> '+this.totalResults);
                //alert('filter.count -> '+filter.count);
                this.totalPages = Math.ceil(this.totalResults / filter.count);
                if(this.restRes.results_found <= 10) {
                    this.currentPage = 1;
                }
            }
            else {
                this.myRests = undefined;
                this.noResults = true;
            }
        }).catch(error => {
            console.log(`Error = ${error}`);
        })
    }

    onLeftClick() {
        this._filter.offset = this._filter.offset - this._filter.count;
        this.currentPage = this.currentPage - 1;
        this.handleFilterUpdate(this._filter);
    }

    onRightClick() {
        this._filter.offset = this._filter.offset + this._filter.count;
        this.currentPage = this.currentPage + 1;
        this.handleFilterUpdate(this._filter);
    }

    get leftDis() {
        return this.currentPage === 1 ? true : false;
    }
    get rightDis() {
        return this.currentPage === this.totalPages ? true : false;
    }
}