@isTest
public class MyFundFilterClassTest {
    static testMethod void testFundFilter() {
        Fund__c fund = new Fund__c();
        String asset = 'Asset_Class__c';
        MyFundFilterClass.getAssetsSectors(fund, asset);
    }
}