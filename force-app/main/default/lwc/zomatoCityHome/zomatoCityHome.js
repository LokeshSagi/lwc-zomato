/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @lwc/lwc/no-async-operation */
import {
    LightningElement,
    wire,
    api
} from 'lwc';
import {
    CurrentPageReference
} from 'lightning/navigation';

import {
    fireEvent
} from 'c/pubsub';

export default class ZomatoCityHome extends LightningElement {
    @wire(CurrentPageReference) pageRef;
    @api cityObj;

    filterObj = {
        "cityId": "",
        "type": "",
        "estId": "",
        "colId": "",
        "offset": 0

    };

    citySelected(event) {
        //alert('In Parent -> '+event.detail.city.name);
        /*this.cityObj = event.detail.city;

        let com = this.template.querySelector('c-zomato-collections');
        if(com) {
            com.getCollections(this.cityObj);
        }
        Object.defineProperties(this.filterObj, {
            "cityId": {
                value: this.cityObj.id,
                writable: true
            },
            "type": {
                value: 'city',
                writable: true
            }
        });*/

        setTimeout(() => {
            fireEvent(this.pageRef, "citySelect", event);
            fireEvent(this.pageRef, "filterUpdate", this.filterObj);
        }, 300)
    }

    pillRemoved(event) {
        //alert(`Value when pill removed ==>> ${event.detail.removed}`);
        this.cityObj = undefined;
        //this.resetFilterObj();
        //alert(JSON.stringify(this.filterObj));
        //alert(this.filterObj.keys());
        /*
        for (let a in this.filterObj) {
            //alert('a = ' + a);
            if (this.filterObj.hasOwnProperty(a) && a !== 'offset' && a !== 'type' !== 'count') {
                console.log('Key = ' + a);
                // eslint-disable-next-line dot-notation
                this.filterObj[a] = '';
            }
        } */
        fireEvent(this.pageRef, "cityDeselect", event);
    }
}