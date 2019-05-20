import { LightningElement, api, track } from 'lwc';


export default class MyFirstLWC extends LightningElement {
    @api name = 'Lokesh';
    @track title = ' SFDC Consulatant ';
    phone = '123456789';
    email = 'lokesh.sagi@gmail.com';
    

    handleMouseOver() {
        // eslint-disable-next-line no-alert
        alert('Mouse Came');
        this.name = 'Krishna';
    }
}