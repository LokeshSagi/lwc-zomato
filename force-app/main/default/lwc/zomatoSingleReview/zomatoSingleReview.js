import { LightningElement, api } from 'lwc';

export default class ZomatoSingleReview extends LightningElement {
    @api review;

    get getBadge() {
        return `background-color: #${this.review.review.rating_color}; color: white;`;
    }

    get badgeLabel() {
        return `${this.review.review.rating}`;
    }
}