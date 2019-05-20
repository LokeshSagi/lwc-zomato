import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
export default class ShowToastComp extends LightningElement {
    @api title;
    @api message;
    @api variant;

    @api variantOptions = [
        { label: 'error', value: 'error' },
        { label: 'warning', value: 'warning' },
        { label: 'success', value: 'success' },
        { label: 'info', value: 'info' },
    ]

    onTitleChange(event) {
        this.title = event.target.value;
    }

    onMessageChange(event) {
        this.message = event.target.value;
    }

    onVariantChange(event) {
        this.variant = event.target.value;
    }

    onIconClick() {
        const evt = new ShowToastEvent({
            title : this.title,
            message : this.message,
            variant : this.variant,
            mode : 'sticky'
        });
        
        this.dispatchEvent(evt);
     }


}