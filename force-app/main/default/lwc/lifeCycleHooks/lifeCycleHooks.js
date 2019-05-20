/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import { LightningElement } from 'lwc';

export default class LifeCycleHooks extends LightningElement {
    constructor() {
        super();
        alert('In Constructor Callback');
    }

    connectedCallback() {
        alert(' In Connected Callback');
    }

    disconnectedCallback() {
        alert(' In disconnected Callback');
    }

    renderedCallback() {
        alert(' In rendered Callback');
    }

    errorCallback(error, stack) {
        alert(' In error Callback');
    }
}