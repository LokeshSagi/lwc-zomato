/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class ZomatoRestaurantModal extends LightningElement {
    @api restaurant;

    get getRestImage() {
        return this.restaurant.restaurant.thumb !== '' ? this.restaurant.restaurant.thumb : 'https://b.zmtcdn.com/data/pictures/1/18791061/fe215facb9548253617bc5d3defb0bc7.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A';
    }

    get restStatus() {
        return this.restaurant.restaurant.is_delivering_now === 1 ? 'Open now' : 'Closed now';
    }

    get getStatus() {
        console.log();
        return this.restaurant.restaurant.is_delivering_now === 1 ? 'color: green;' : 'color: red;';
    }
}