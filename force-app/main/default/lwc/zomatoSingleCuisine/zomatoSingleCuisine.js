/* eslint-disable no-console */
import { LightningElement, api } from 'lwc';

export default class ZomatoSingleCuisine extends LightningElement {
    @api cuisine;

    get options() {
        let st = [];
        st.push(this.cuisine);
        console.log('st = '+st);
        return st;
    }
}