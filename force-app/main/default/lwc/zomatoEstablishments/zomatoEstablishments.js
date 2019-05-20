/* eslint-disable no-console */
import {
    LightningElement,
    api,
    track
} from 'lwc';
import zEstablishments from '@salesforce/apex/ZomatoGetEstablishments.zomatoGetEstablishments'

export default class ZomatoEstablishments extends LightningElement {
    @track estabs;
    @track myEstabs;
    _initBool = false;

    @api
    getEstablishments(city) {
        //console.log('Value incoming to establishments');
        zEstablishments({
                cid: city.id
            })
            .then(result => {
                //console.log('Result = '+JSO   N.stringify(result));                
                this.estabs = JSON.parse(result);
                //console.log('estabs = '+(this.estabs.establishments.length));
                if(this.estabs.establishments.length > 0) {
                    this.myEstabs = this.estabs.establishments;
                    //console.log('myEstabs = '+JSON.stringify(this.myEstabs));
                }
                else {
                    this.myEstabs = undefined;
                    this._initBool = false;
                }
            })
            .catch(error => {
                // TODO Error handling
                console.log('Error in establishments= '+error);
            });
    }

    get noEstCase() {
        //console.log('Inside noCitiesCase');
        return !this._initBool && !this.myEstabs; 
    }

    @api
    handleCityDeselect() {
        //console.log('City Deselected in grand child');
        this.myEstabs = undefined;
        //this._initBool = true;
        //console.log(`noCitiesCase = ${!this._initBool && !this.myEstabs}`);
    }

    get checkClass() {
        //console.log('coming to checkClass');
        return "freeText";
    }

    handleEstSelect(event) {
        event.preventDefault();
        const eve = event.target.dataset.ind;
        //console.log('eve = '+(typeof eve));

        const found = this.myEstabs.find(e => {
            //console.log(typeof e.establishment.id);
            return JSON.stringify(e.establishment.id) === eve;
        })

        //console.log(`found = ${JSON.stringify(found)}`);

        const tarFound = {};
        const eventFound = new CustomEvent('estfound', {
            detail: { est : Object.assign(tarFound, found) }
        });
        this.dispatchEvent(eventFound);
    }

    handleClear() {
        this.dispatchEvent(new CustomEvent('clearest'));
    }

}