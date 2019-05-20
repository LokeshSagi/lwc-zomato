/* eslint-disable no-console */
import {
    LightningElement,
    api,
    track
} from 'lwc';
import getCuisines from '@salesforce/apex/ZomatoGetCuisines.zomatoGetCuisines';

export default class ZomatoGetCuisines extends LightningElement {
    @track allCuisines;
    @track cuisines;
    options = [];

    @api
    getZomatoCuisines(city) {
        getCuisines({
            cids: city.id
        }).then(result => {
            this.allCuisines = JSON.parse(result);
            //console.log('this.allCuisines = ' + JSON.stringify(this.allCuisines));
            if (this.allCuisines.cuisines.length > 0) {
                this.cuisines = this.allCuisines.cuisines;
                for (let a in this.cuisines) {
                    if (this.cuisines.hasOwnProperty(a)) {
                        let set = {
                            label: this.cuisines[a].cuisine.cuisine_name,
                            value: this.cuisines[a].cuisine.cuisine_id
                        }
                        this.options.push(set);
                        
                    }
                }
                //console.log('this.options = '+JSON.stringify(this.options));
            }
        }).catch(error => {
            console.log('Error = ' + error);

        })
    }

    /*get options() {
        let ops = [];
        for (let a in this.cuisines) {
            if (this.filterObj.hasOwnProperty(a)) {
                let set = {
                    label: this.cuisines[a].cuisine.cuisine_name,
                    value: this.cuisines[a].cuisine.cuisine_id
                }
                ops.push(set);
            }
        }
        console.log('Ops = ' + ops);
        return ops;
    }*/
}