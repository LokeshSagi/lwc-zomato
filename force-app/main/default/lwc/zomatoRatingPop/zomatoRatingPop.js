/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-console */
import {
    LightningElement,
    track,
    api
} from 'lwc';

const OFFSET_TOP = 234;
const OFFSET_RIGHT = 70;

export default class ZomatoRatingPop extends LightningElement {

    @track enablePop;
    @track position;
    _argx;
    _argy;
    restnt;

    get popStyle() {
        //alert('top:' + this.position.top + '; left:' + this.position.right + ';');
        //console.log('Position = ' + 'left:' + this._argx + 'px;top:' + this._argy + 'px; width: fit-content;');
        return 'left:' + this._argx + 'px;top:' + this._argy + 'px;';
    }



    @api
    show(element, rest, x, y) {
        //alert('showing = '+rest.restaurant.user_rating.rating_text);
        this.restnt = rest;
        const rect = element.getBoundingClientRect();
        //alert('showing = '+this.restnt.restaurant.user_rating.rating_text);
        
        if (this.restnt.restaurant.user_rating.rating_text === 'Good') {
            this._argx = rect.x - 25;
            this._argy = rect.y + 35;
        }

        else  {
            this._argx = rect.x - 30;
            this._argy = rect.y + 35;
        }

        this.enablePop = true;
    }

    @api
    hide() {
        this.enablePop = false;
    }
}