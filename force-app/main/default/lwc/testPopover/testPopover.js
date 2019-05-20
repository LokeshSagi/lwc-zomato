/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable no-empty */
import {
    LightningElement,
    api,
    wire,
    track
} from 'lwc';
import allContacts from '@salesforce/apex/contactAuraService.getAllContacts';
export default class TestPopover extends LightningElement {
    @api contacts;
    @track enablePop = false;
    leftpos;
    toppos;

    @wire(allContacts)
    cons({
        error,
        data
    }) {
        if (data) {
            this.contacts = data;
            this.error = undefined;
            //alert('data = '+JSON.stringify(this.contacts));
            /*for(let i=0; i<this.contacts.length; i++) {

                Object.defineProperty(this.contacts[i], 'short', {
                    value : this.contacts[i].Level__c.charAt(0)
                })
            }*/
        } else if (error) {
            this.contacts = undefined;
            this.error = error;
            alert('In error');
        }
    }

    get myAvatar() {
        return 'slds-app-launcher__tile-figure Primary';
    }

    mouseCame(event) {
        var ev = event.currentTarget.dataset.id;
        //alert('ev = '+ev);
        //console.log('Contact = '+JSON.stringify(this.contacts[ev]));
        //let pop = this.template.querySelector(`[data-targetId="${ev}"]`);
        //let pop = this.template.querySelector({ev});
        //alert('pop= '+pop);
        //pop.removeAttribute("slds-hide");
        //console.log('pop = '+pop);
        //let pop = this.template.querySelector('index');
        //console.log('pop = ' + pop);
        console.log('pos = ' + JSON.stringify(event.target.getBoundingClientRect()));

        this.enablePop = true;
        this.leftpos = event.target.getBoundingClientRect().right;
        this.toppos = event.target.getBoundingClientRect().top;
    }

    mouseout() {
        this.enablePop = false;
    }

    get style() {
        console.log('left:'+this.leftpos + 'px;top:' + this.toppos + 'px');
        return 'left:'+this.leftpos + 'px;top:' + this.toppos + 'px';
    }
}