/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import { LightningElement, wire, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import COPY_PHONE__C_FIELD from '@salesforce/schema/Account.Copy_Phone__c';

import { getRecord } from 'lightning/uiRecordApi';


export default class LdsGetRecordCustom extends LightningElement {
    @track record;
    @track error;
    
    @track Name;
    @track Phone;
    @track CopyPhone;

    @wire(getRecord, { recordId : '001B000000nTmlJIAS', fields : [NAME_FIELD, PHONE_FIELD, COPY_PHONE__C_FIELD]})
    recordData({ error, data }) {
        if (data) {
            this.record = data;
            this.error = undefined;
            this.Name = this.record.fields.Name.value;
            this.Phone = this.record.fields.Phone.value;
            this.CopyPhone = this.record.fields.Copy_Phone__c.value;
            //alert('LDS Loaded = '+JSON.stringify(Object.values(this.record.fields)));
        } else if (error) {
            this.error = error;
            this.record = undefined;
            alert('error');
        }
    } 

    connectedCallback() {
        //alert('Connected Callback');
    }


}