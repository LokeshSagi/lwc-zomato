/* eslint-disable no-alert */
import { LightningElement, api } from 'lwc';

export default class ZomatoRestaurantMap extends LightningElement {
    @api restaurant; 
    mapMarks;
    get mapMarkers() {
        //alert('Inside -> '+JSON.stringify(this.restaurant));
        this.mapMarks = [
            {
                location: {
                    'Latitude': this.restaurant.restaurant.location.latitude,
                    'Longitude': this.restaurant.restaurant.location.longitude
                },
                title: this.restaurant.restaurant.name,

            }
        ]

        return this.mapMarks;
    }

}