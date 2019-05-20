/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable @lwc/lwc/no-async-operation */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import { LightningElement, api, wire } from "lwc";

import { CurrentPageReference } from "lightning/navigation";

import { fireEvent } from "c/pubsub";

import { registerListener, unregisterAllListeners } from "c/pubsub";

export default class ZomatoFilters extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  @api cityObj;

  filterObj = {
    cityId: "",
    type: "",
    estId: "",
    colId: "",
    offset: 0,
    count: 10
  };

  connectedCallback() {
    registerListener("citySelect", this.citySelected, this);
    registerListener("cityDeselect", this.pillRemoved, this);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  citySelected(event) {
    //alert('In Parent -> '+event.detail.city.name);
    this.cityObj = event.detail.city;

    /*let com = this.template.querySelector('c-zomato-collections');
        if(com) {
            com.getCollections(this.cityObj);
        }*/
    Object.defineProperties(this.filterObj, {
      cityId: {
        value: this.cityObj.id,
        writable: true
      },
      type: {
        value: "city",
        writable: true
      }
    });

    //console.log('Filter Object => '+this.filterObj.length);
    setTimeout(() => {
      this.template
        .querySelector("c-zomato-collections")
        .getCollections(this.cityObj);
      this.template
        .querySelector("c-zomato-establishments")
        .getEstablishments(this.cityObj);
      //this.template.querySelector('c-zomato-get-cuisines').getZomatoCuisines(this.cityObj);
      fireEvent(this.pageRef, "filterUpdate", this.filterObj);
    }, 300);
  }

  pillRemoved(event) {
    //alert(`Value when pill removed ==>> ${event.detail.removed}`);
    this.cityObj = undefined;
    //this.resetFilterObj();
    //alert(JSON.stringify(this.filterObj));
    //alert(this.filterObj.keys());
    for (let a in this.filterObj) {
      //alert('a = ' + a);
      if (
        this.filterObj.hasOwnProperty(a) &&
        a != "offset" &&
        a != "type" &&
        a != "count"
      ) {
        console.log("Key = " + a);
        // eslint-disable-next-line dot-notation
        this.filterObj[a] = "";
      }
    }
    this.template.querySelector("c-zomato-collections").handleCityDeselect();
    this.template.querySelector("c-zomato-establishments").handleCityDeselect();
    //fireEvent(this.pageRef, "cityDeselect");
  }

  handleEstFound(event) {
    //console.log('Found in Parent =>'+JSON.stringify(event.detail.est));
    Object.defineProperty(this.filterObj, "estId", {
      value: event.detail.est.establishment.id,
      writable: true
    });

    console.log("Filter 1=>" + this.filterObj.cityId);

    fireEvent(this.pageRef, "filterUpdate", this.filterObj);
  }

  handleColFound(event) {
    Object.defineProperty(this.filterObj, "colId", {
      value: event.detail.col.collection.collection_id,
      writable: true
    });

    console.log("Filter 2=>" + this.filterObj.cityId);

    fireEvent(this.pageRef, "filterUpdate", this.filterObj);
  }

  handleColClear() {
    this.filterObj.colId = "";
    Object.defineProperty(this.filterObj, "clearCol", {
      value: true,
      writable: true
    });
    fireEvent(this.pageRef, "filterUpdate", this.filterObj);
  }

  handleEstClear() {
    this.filterObj.estId = "";
    Object.defineProperty(this.filterObj, "clearEst", {
        value: true,
        writable: true
      });
    fireEvent(this.pageRef, "filterUpdate", this.filterObj);
  }
}