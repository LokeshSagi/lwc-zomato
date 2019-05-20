import { LightningElement, track } from 'lwc';
export default class HelloWorld extends LightningElement {
    @track greeting = 'World';
    @track contacts = [
        {
            Id : 123,
            name : 'Lokesh',
            Title : 'Dev'
        },
        {
            Id : 234,
            name : 'Krishna',
            Title : 'Con'
        },

        {
            Id : 345,
            name : 'Sagi',
            Title : 'Man'
        }    
    ];
    changeHandler(event) {
        this.greeting = event.target.value;
    }
}