/* eslint-disable no-alert */
/* eslint-disable no-console */
import {
    LightningElement,
    api,
    wire,
    track
} from 'lwc';

import {
    NavigationMixin,
    CurrentPageReference
} from 'lightning/navigation';

export default class ZomatoRestaurent extends NavigationMixin(LightningElement) {
    @api restaurant;
    @wire(CurrentPageReference) pageRef;


    handleRestClick() {
        //alert('Rest clicked');
        const eventNew = new CustomEvent('restselect', {
            detail: {...this.restaurant}
        });
        this.dispatchEvent(eventNew);
    }

    get getCurrency() {
        //console.log('Getting Currency = ' + this.restaurant.restaurant.currency + ' ' +
        //this.restaurant.restaurant.average_cost_for_two);
        return `Costs ${this.restaurant.restaurant.currency}${this.restaurant.restaurant.average_cost_for_two} for two`;
    }

    get getRatingColor() {
        //console.log(`background-color: ${this.restaurant.restaurant.user_rating.rating_color};`);
        return `background-color: #${this.restaurant.restaurant.user_rating.rating_color}; border-radius: 15px; width: fit-content;`;
    }

    get getThumb() {
        return this.restaurant.restaurant.thumb !== '' ? this.restaurant.restaurant.thumb : 'https://b.zmtcdn.com/data/pictures/1/18791061/fe215facb9548253617bc5d3defb0bc7.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A';
    }

    handleButtonHover() {

    }

    handleOrder() {
        //window.open(this.restaurant.restaurant.order_url);
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: this.restaurant.restaurant.order_url !== undefined ? this.restaurant.restaurant.order_url : 'https://google.com'
            }
        })
    }

    get navigateOrder() {
        //console.log(this.restaurant.restaurant.order_url !== undefined ? this.restaurant.restaurant.order_url : 'https://google.com');
        return this.restaurant.restaurant.order_url !== undefined ? this.restaurant.restaurant.order_url : 'https://google.com';
    }


    get getStatus() {
        //console.log(this.restaurant.restaurant.is_delivering_now === 1 ? 'Accepting Orders' : 'Not Accepting Orders right now');
        return this.restaurant.restaurant.is_delivering_now === 1 ? 'Accepting Orders' : 'Currently not accepting Orders';
    }

    get statusColor() {
        return this.restaurant.restaurant.is_delivering_now === 1 ? 'color: green; font-weight:bold;' : 'color:#FF5858; font-weight:lighter;';
    }

    get disableButton() {
        //console.log('Disable = '+this.restaurant.restaurant.is_delivering_now === 1 ? false : true);
        return this.restaurant.restaurant.is_delivering_now === 1 ? false : true;
    }

    badgeMouseIn(event) {
        //alert(JSON.stringify(event.target.getBoundingClientRect()) +'  clientX'+ event.clientX + '  clientX'+ event.clientY);
        const popup = this.template.querySelector('c-zomato-rating-pop');
        popup.show(event.target, this.restaurant, event.clientX, event.clientY);

    }

    badgeMouseOut() {
        const popup = this.template.querySelector('c-zomato-rating-pop');
        popup.hide();
    }



}