/* eslint-disable no-console */
import { LightningElement } from "lwc";

export default class LwcEventsParent extends LightningElement {
  handleChildClick = event => {
    event.detail.prop1 = "String 3";
    console.log(`Parent --> ${JSON.stringify(event.detail)}`);
    this.template.querySelector("c-lwc-events-child").fromParent(event.detail);
  }
}
