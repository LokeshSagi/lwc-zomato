import { LightningElement, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';

export default class LdsCreateRecord extends LightningElement {
    @track fields = [NAME_FIELD, WEBSITE_FIELD];
}