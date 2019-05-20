public class MyFundFilterClass {
    @AuraEnabled(cacheable=true)
    public static WrapperResult getAssetsSectors(sObject objObject, string fld) {
        system.debug('objObject --->' + objObject);
        system.debug('fld --->' + fld);
        List < String > allOpts = new list < String > ();
        // Get the object type of the SObject.
        Schema.sObjectType objType = objObject.getSObjectType();
        
        // Describe the SObject using its object type.
        Schema.DescribeSObjectResult objDescribe = objType.getDescribe();
        
        // Get a map of fields for the SObject
        map < String, Schema.SObjectField > fieldMap = objDescribe.fields.getMap();
        
        // Get the list of picklist values for this field.
        list < Schema.PicklistEntry > values =
            fieldMap.get(fld).getDescribe().getPickListValues();
        
        // Add these values to the selectoption list.
        for (Schema.PicklistEntry a: values) {
            allOpts.add(a.getValue());
        }
        system.debug('allOpts ---->' + allOpts);
        allOpts.sort();
        
        WrapperResult wr = new WrapperResult();
        
        wr.assets = allOpts;
        
        
        List<Sector__c> allSectors = new List<Sector__c>();
        List<String> allsects = new List<String>();
        
        allSectors = [Select Name from Sector__c Order by Name];
        
        system.debug('all sectors size = '+allSectors.size());
        
        for(Integer i=0; i<allSectors.size(); i++){
            allsects.add(allSectors[i].Name);
        }
        
        wr.sectors = allsects;
        
        return wr;
        
    }
    
    
    public class WrapperResult {
        @AuraEnabled
        public List<String> assets { get;set; }
        
        @AuraEnabled
        public List<String> sectors { get;set; }
    } 

}