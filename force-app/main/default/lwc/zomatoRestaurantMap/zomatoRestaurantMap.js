/* eslint-disable no-console */
/* eslint-disable no-alert */
import { LightningElement, api, track } from 'lwc';

export default class ZomatoRestaurantMap extends LightningElement {
    @api restaurant; 
    
    @track lat;
    @track long;
    get mapMarkers() {
        //alert('Inside -> '+JSON.stringify(this.restaurant));
        let mapMarks = [];
        mapMarks.push(
            {
                location: {
                    'Latitude': this.restaurant.restaurant.location.latitude,
                    'Longitude': this.restaurant.restaurant.location.longitude
                },
                title: this.restaurant.restaurant.name,
                description: this.restaurant.restaurant.location.address

            },
            {
                location: {
                    'Latitude': this.lat,
                    'Longitude': this.long
                },
                title: 'Me',
                icon: 'standard:user'
            }
        )

        return mapMarks;
    }

    connectedCallback() {
        navigator.geolocation.getCurrentPosition(success => {
            this.lat = success.coords.latitude;
            this.long = success.coords.longitude;
            console.log('lat -> '+this.lat);
            console.log('long -> '+this.long);
            console.log('Rest lat -> '+this.restaurant.restaurant.location.latitude);
        });
    }

}