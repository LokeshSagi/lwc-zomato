/* eslint-disable no-alert */
/* eslint-disable @lwc/lwc/no-document-query */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
    LightningElement,
    wire,
    track
} from 'lwc';
import getCities from '@salesforce/apex/ZomatoGetCities.getCities';
import {
    fireEvent
} from 'c/pubsub';

export default class ZomatoGetCities extends LightningElement {
    @track cityName;
    @track allCities;
    @track error;
    @track enablePill;
    @track selectedCity;
    @track showInput = true;
    @track items;


    connectedCallback() {
        //console.log('callback init');
    }

    onCityChange(event) {
        if ((event.target.value == null) || (event.target.value === '')) {
            this.allCities = undefined;
            return;
        }
        this.cityName = event.target.value;
        this.loadCities();
    }

    loadCities() {
        //console.log('loading');
        getCities({
            city: this.cityName
        }).then(result => {
            //console.log('result = '+JSON.stringify(result));
            this.allCities = JSON.parse(result);
            //console.log('size => '+JSON.stringify(this.allCities));
        }).catch(error => {
            //console.log('error = '+error);
            this.error = error
        })
    }

    get checkCities() {
        //console.log('checking');
        return this.allCities.location_suggestions.length > 0 ? true : false;
    }

    citySelected(event) {
        //console.log('Selected City = '+JSON.stringify(event.detail.city));
        //alert('1st Parent -> '+event.detail.city.name);
        this.enablePill = true;
        this.showInput = false;
        this.selectedCity = event.detail.city;
        this.items = [{
            type: 'avatar',
            label: event.detail.city.name,
            name: 'avatarpill',
            src: event.detail.city.country_flag_url,
            fallbackIconName: 'standard:user',
            variant: 'square',
            alternativeText: 'User avatar',
        }]
    }

    onPillRemove() {
        this.enablePill = false;
        this.showInput = true;

        let obj = {
            removed: false
        };

        obj.removed = true;
        //alert('1st stage');
        const eventNew = new CustomEvent('pillremove', {
            detail: obj,
            bubbles: true,
            cancelable: true,
            composed: true
        });
        this.dispatchEvent(eventNew);
    }

    onInputFocus() {

        var input = document.getElementById("cityInput");
        //alert('focus');
        //if (input.getAttribute("autocomplete") !== "off") {
        //   input.setAttribute("autocomplete", "off");
        //}
    }



}