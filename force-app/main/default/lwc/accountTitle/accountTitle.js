import { LightningElement, api } from 'lwc';

export default class AccountTitle extends LightningElement {
    @api account;

    handleAccount(event) {
        event.preventDefault();
        const select = new CustomEvent(
            'selectacc', 
            {
                detail : this.account.Id
            });
        this.dispatchEvent(select);
    }
}