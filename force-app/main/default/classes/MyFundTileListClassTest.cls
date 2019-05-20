@isTest
public class MyFundTileListClassTest {
    static testMethod void testTotalFunds() {
        Sector__c s = new Sector__c(Name='Test Sector');
        insert s;
        Fund__c f = new Fund__c(Name='Test Fund', Sector__c=s.Id);
        insert f;
        
        MyFundTileListClass.totalFunds('{}');
    }
    
    static testMethod void testFunds() {
        Sector__c s = new Sector__c(Name='Test Sector');
        insert s;
        Fund__c f = new Fund__c(Name='Test Fund', Sector__c=s.Id);
        insert f;
        
        MyFundTileListClass.funds('{}', 0, 9);
    }
}