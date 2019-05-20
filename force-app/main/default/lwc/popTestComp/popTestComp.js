import { LightningElement, track } from 'lwc';

export default class PopTestComp extends LightningElement {
    @track enablePop;
    @track pop;
    handlemouseIn(event) {
        this.enablePop = true;
        this.pop = event.target.getBoundingClientRect();
    }

    handleMouseOut() {
        this.enablePop = undefined;
    }

    get popStyle() {
        return 'left:' + this.pop.left + ';top:' + this.pop.top + ';width:fit-content;'
    }
}