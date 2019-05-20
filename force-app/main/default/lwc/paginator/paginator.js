import { LightningElement } from 'lwc';

export default class Paginator extends LightningElement {
    handlePrev() {
        const prevEvent = new CustomEvent(
            'prev',
            {
                detail : {text :'Prev'}
            });
        this.dispatchEvent(prevEvent);
    }

    handleNext() {
        const nextEvent = new CustomEvent('next',
        {
            detail :  {text :'Next'}
        });
        this.dispatchEvent(nextEvent);
    }
}