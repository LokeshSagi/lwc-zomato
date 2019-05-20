/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { LightningElement, wire, track, api } from "lwc";
import getContactList from "@salesforce/apex/contactAuraService.getContactList";
import getAccountList from "@salesforce/apex/contactAuraService.getAccountList";
import { NavigationMixin } from "lightning/navigation";

export default class ContactListDemo extends NavigationMixin(LightningElement) {
  @track searchKey;
  @api searchKeyAccount;
  @track accounts;
  @track errorAccount;

  @wire(getContactList, {
    name: "$searchKey"
  })
  contacts;

  inputChange(event) {
    event.preventDefault();
    console.log("Value1 = " + event.target.value);
    console.log("Contacts = " + JSON.stringify(this.contacts));
    this.searchKey = event.target.value;
  }

  handleAccountChange(event) {
    event.preventDefault();
    console.log("Value2 = " + event.target.value);
    //console.log('Contacts = '+this.contacts);
    this.searchKeyAccount = event.target.value;
  }

  getAccounts(event) {
    console.log("Value3 = " + event.target.value);
    getAccountList({
      name: this.searchKeyAccount
    })
      .then(result => {
        this.accounts = result;
        console.log("result = " + JSON.stringify(result));
      })
      .catch(error => {
        this.errorAccount = error;
      });
  }

  selectedAcc(event) {
    const recordId = event.detail;
    //alert('recordId  ='+recordId);

    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        recordId: recordId,
        actionName: "view"
      }
    });
  }
}
