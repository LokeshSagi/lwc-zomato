/* eslint-disable no-console */
import { LightningElement, wire, api, track } from 'lwc';
import latestReviews from '@salesforce/apex/ZomatoGetReviews.zomatoGetReviews';


export default class ZomatoGetReviews extends LightningElement {
    @api restaurant;
    @api restId;
    @track reviews;
    @track userReviews;
    
    /*
    @wire(latestReviews, {'resId': '${}'})
    wiredReviews({error, data}) {
        if(data) {
            this.reviews = JSON.parse(data);
            this.userReviews = this.reviews.user_reviews;
        }
        else if(error) {
            console.log('Error -> '+error);
        }
    }
    */

    connectedCallback() {

        latestReviews({
            'resId': this.restaurant.restaurant.id
        }).then(result => {
            this.reviews = JSON.parse(result);
            this.userReviews = this.reviews.user_reviews;
        }).catch(error => {
            console.log('Error -> '+error);
        })
    }

}