/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import {
    LightningElement,
    api,
    wire
} from 'lwc';
import {
    NavigationMixin,
    CurrentPageReference
} from 'lightning/navigation';

export default class PageReference extends NavigationMixin(LightningElement) {
    @api heading = "LWC Navigation";
    @wire(CurrentPageReference)
    pageRef;

    connectedCallback() {
        //alert('current = '+JSON.stringify(this.pageRef));
    }

    navigateTab(event) {
        console.log('Label = ' + event.target.label);
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'LWC_Practice'
            }
        });
    }

    navigateAccountHome(event) {
        console.log('Label = ' + event.target.label);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'home'
            }
        });
    }

    navigateRelationship(event) {
        console.log('Label = ' + event.target.label);
        this[NavigationMixin.Navigate]({
            type: "standard__recordRelationshipPage",
            attributes: {
                recordId: "500B0000004NCnTIAW",
                objectApiName: "Case",
                relationshipApiName: "CaseComments",
                actionName: "view"
            }
        }, false);
    }

    navigateListView(event) {
        console.log('Label = ' + event.target.label);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'list'
            },
            state: {
                filterName: 'AllAccounts'
            }
        });
    }

    navigateDetails(event) {
        console.log('Label = ' + event.target.label);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '001B000000nTmlJIAS',
                objectApiName: 'Account',
                actionName: 'view'
            }
        }, true);
    }

    navigateCreateAccount(event) {
        console.log('Label = ' + event.target.label);
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Account',
                actionName: 'new'
            }
        });
    }

    navigateAccountEdit(event) {
        console.log('Label = ' + event.target.label);
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: '001B000000nTmlJIAS',
                objectApiName: 'Account',
                actionName: 'edit'
            }
        });
    }

    navigateToWebPage() {
        // Navigate to a URL
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: 'http://salesforce.com'
            }
        }, false);
    }
}