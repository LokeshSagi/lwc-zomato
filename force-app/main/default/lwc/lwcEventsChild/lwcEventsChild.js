/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { LightningElement, api } from "lwc";

export default class LwcEventsChild extends LightningElement {
  testObj = [2,3,4];

  connectedCallback() {
    console.log(`Child -> ${JSON.stringify(this.testObj)}`);
  }

  childHandle() {
    const myEvent = new CustomEvent('childclick', {
      detail: this.testObj 

      //detail: {...this.testObj}
    });
    this.dispatchEvent(myEvent);
  }

  
  @api
  fromParent(eve) {

    console.log(`From Parent to Child Original -> ${JSON.stringify(this.testObj)}`);
    console.log(`From Parent to Child -> ${JSON.stringify(eve)}`);

  }
}
