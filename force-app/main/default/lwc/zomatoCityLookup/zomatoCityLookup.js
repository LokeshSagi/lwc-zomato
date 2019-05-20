/* eslint-disable no-alert */
import { LightningElement, api } from 'lwc';

export default class ZomatoCityLookup extends LightningElement {
    @api cityObj;

    get style() {
        return this.cityObj.country_flag_url;
    }

    handleDivClick() {
        const eve = new CustomEvent(
            'selectedcity',
            {
                detail : {
                    city : this.cityObj
                },
                bubbles: true,
                cancelable: true,
                composed: true
            }
        );
        this.dispatchEvent(eve);
    }
}