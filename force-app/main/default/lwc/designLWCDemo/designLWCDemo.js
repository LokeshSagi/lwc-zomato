/* eslint-disable no-unused-vars */
import { LightningElement, api } from 'lwc';
import testLabel from '@salesforce/label/c.testLabel';
import testResource from '@salesforce/resourceUrl/testResources';
import ACCOUNT_OBJ from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';

import lang from '@salesforce/i18n/lang';
import locale from '@salesforce/i18n/locale';
import currency from '@salesforce/i18n/currency';
import timezone from '@salesforce/i18n/timeZone';

export default class DesignLWCDemo extends LightningElement {
    @api greeting;
    @api heading;

    @api label = {
        testLabel,
        ACCOUNT_OBJ,
        NAME_FIELD,
        lang,
        locale,
        currency,
        timezone,
    };

    @api image = testResource;
}