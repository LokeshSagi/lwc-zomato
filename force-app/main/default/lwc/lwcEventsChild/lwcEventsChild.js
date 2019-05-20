/* eslint-disable no-console */
import { LightningElement, api } from "lwc";

export default class LwcEventsChild extends LightningElement {
  testObj = {
    prop1: "String 1",
    prop2: "String 2"
  };

  connectedCallback() {
    console.log(`Child -> ${JSON.stringify(this.testObj)}`);
  }

  childHandle() {
    const testObj2 = {

    };

    const myEvent = new CustomEvent('childclick', {
      detail: { val1: this.testObj }

      //detail: { val1: Object.assign(testObj2, this.testObj)}
    });
    this.dispatchEvent(myEvent);
  }

  _observe = obj => {
    if (obj.__isProxy === undefined) {
      let ret = new Proxy(obj || {}, {
        set: (target, key, value) => {
          /// act on the change
          return true;
        },
        get: (target, key) => {
          if (key !== "__isProxy") {
            return target[key];
          }
  
          return true;
        }
      });
      return ret;
    }
    return obj;
  }
  
  @api
  fromParent(eve) {
    console.log(`From Parent to Child Original -> ${JSON.stringify(this.testObj)} -> ${this._observe(this.testObj)}`);
    
    console.log(`From Parent to Child -> ${JSON.stringify(eve)} -> ${this._observe(eve)}`);
  }
}
