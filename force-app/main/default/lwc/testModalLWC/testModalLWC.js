/* eslint-disable no-alert */
import { LightningElement, track } from 'lwc';

export default class TestModalLWC extends LightningElement {
    @track modalOpen;

    openModal() {
        this.modalOpen = true;
    }

    handleClose() {
        //alert('closing');
        this.modalOpen = '';
    }
}