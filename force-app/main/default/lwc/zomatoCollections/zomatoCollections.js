/* eslint-disable no-console */
/* eslint-disable no-alert */
import {
    LightningElement,
    api,
    track
} from 'lwc';
import zCollections from '@salesforce/apex/ZomatoGetCollections.zomatoGetCollections';

export default class ZomatoCollections extends LightningElement {
    @api city;
    @track count = 0;
    @track zCollections;
    @track collections;
    @track cityColls;
    _initBool = false;


    @api
    getCollections(city) {
        //console.log('Value Incoming to child');
        zCollections({
            cid: city.id
        }).then(result => {
            this.collections = JSON.parse(result);
            //console.log(`Result ===>>> ${JSON.stringify(result)}`);
            if (this.collections.collections !== undefined) {
                this.cityColls = this.collections.collections;
            }
            else {
                this.cityColls = undefined;
                this._initBool = false;
            }
        }).catch(error => {
            console.log(`Error in Collections => ${error}`)
        });
    }


    @api
    handleCityDeselect() {
        //console.log('City Deselected in grand child');
        this.cityColls = undefined;
        //this._initBool = true;
        //console.log(`noCitiesCase = ${!this._initBool && !this.cityColls}`);
    }

    get noCitiesCase() {
        //console.log('Inside noCitiesCase');
        return !this._initBool && !this.cityColls;
    }

    get getImg() {
        //console.log('inside getImg');
        return "image";
    }

    get checkItem() {
        //console.log('inside checkItem');
        return "layItem";
    }

    handleCollClick(event) {
        event.preventDefault();
        const clid = event.target.dataset.id;
        const found = this.cityColls.find(ele => {
            return JSON.stringify(ele.collection.collection_id) === clid
        });

        const newFound = {};

        const eventNew = new CustomEvent('collselect', {
            detail: { 'col': Object.assign(newFound, found) }
        });
        this.dispatchEvent(eventNew);
    }

    handleFilterClear() {
        this.dispatchEvent(new CustomEvent('clearcol'));
    }
}