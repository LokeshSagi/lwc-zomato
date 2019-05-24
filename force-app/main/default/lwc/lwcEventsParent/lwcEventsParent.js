/* eslint-disable no-console */
import { LightningElement } from "lwc";

export default class LwcEventsParent extends LightningElement {
  handleChildClick = event => {
    event.detail.push(5);
    console.log(`In Parent --> ${JSON.stringify(event.detail)}`);
    this.template.querySelector("c-lwc-events-child").fromParent(event.detail);
  }
}
