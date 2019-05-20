public class MyFundTileListClass {
    
    public class Filter {
        @AuraEnabled
        public String nameString { get;set; }
        
        @AuraEnabled
        public String assetString { get;set; }
        
        @AuraEnabled
        public String sectorString { get;set; }
        
        @AuraEnabled
        public Decimal minYtdReturn { get;set; }
        
        @AuraEnabled
        public Decimal maxYtdReturn { get;set; }
        
        @AuraEnabled
        public Decimal min1YearReturn { get;set; }
        
        @AuraEnabled
        public Decimal max1YearReturn { get;set; }
        
        @AuraEnabled
        public Decimal min5YearReturn { get;set; }
        
        @AuraEnabled
        public Decimal max5YearReturn { get;set; }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<Fund__c> funds(String filters, Integer offsetNum, Integer fundsToDis) {
        
        Filter filter = (Filter) JSON.deserializeStrict(filters, MyFundTileListClass.Filter.Class);
        
        List<Fund__c> returnFunds = new List<Fund__c>();
        String query = '';
        Integer off;
        Integer fds;
        
        String nameStr = filter.nameString;
        String assetStr = filter.assetString;
        String sectorStr = filter.sectorString;
        
        Decimal minYtdReturn = filter.minYtdReturn;
        Decimal maxYtdReturn = filter.maxYtdReturn;
        Decimal min1YearReturn = filter.min1YearReturn;
        Decimal max1YearReturn = filter.max1YearReturn;
        Decimal min5YearReturn = filter.min5YearReturn;
        Decimal max5YearReturn = filter.max5YearReturn;
        
        //query = 'SELECT Id, Name, Sector__r.Name, Asset_Class__c, Abbreviation__c, Five_Year_Return__c, One_Year_Return__c, Rating__c, Two_Year_Return__c, YTD_Return__c FROM Fund__c where ID != null Order by Name Limit :fds OFFSET :off';
        
        query = 'SELECT Id, Name, Sector__r.Name, Asset_Class__c, Abbreviation__c, Five_Year_Return__c, One_Year_Return__c, Rating__c, Two_Year_Return__c, YTD_Return__c FROM Fund__c where ID != null';
        
        if(nameStr == ''){
            nameStr = '%';
        }
        else {
            nameStr = '%'+nameStr+'%';
        }
        system.debug(nameStr);
        
        
        query = query+' and Name LIKE :nameStr';
        
        if(assetStr != '') {
            query = query + ' and Asset_Class__c =:assetStr';
        }
        
        if(sectorStr != ''){
            query = query + ' and Sector__r.Name =:sectorStr';
        }
        
        query = query + ' and YTD_Return__c  >= :minYtdReturn and YTD_Return__c  <= :maxYtdReturn';
        query = query + ' and One_Year_Return__c >= :min1YearReturn and One_Year_Return__c <= :max1YearReturn';
        query = query + ' and Five_Year_Return__c >= :min5YearReturn and Five_Year_Return__c <= :max5YearReturn';
        
        query = query + ' Order by Name';
        
        
        If(fundsToDis!=null) {
            fds = Integer.valueOf(fundsToDis);
            query = query + ' Limit :fds';
        }
        
        If(offsetNum!=null) {
            off = Integer.valueOf(offsetNum);
            query = query + ' OFFSET :off';
        }
        
        try {
            returnFunds = Database.query(query);
            system.debug(returnFunds.size());
            return returnFunds;
        }
        
        Catch(Exception e) {
            system.debug(e.getMessage());  
            throw new AuraHandledException('Something went wrong:'+e.getMessage());
        } 
    }
    
    @AuraEnabled(cacheable=true)
    public static Integer totalFunds(String filters) {
        Integer tot;
        Filter filter = (Filter) JSON.deserializeStrict(filters, MyFundTileListClass.Filter.Class);
        String query = '';

        String nameStr = filter.nameString;
        String assetStr = filter.assetString;
        String sectorStr = filter.sectorString;
        
        Decimal minYtdReturn = filter.minYtdReturn;
        Decimal maxYtdReturn = filter.maxYtdReturn;
        Decimal min1YearReturn = filter.min1YearReturn;
        Decimal max1YearReturn = filter.max1YearReturn;
        Decimal min5YearReturn = filter.min5YearReturn;
        Decimal max5YearReturn = filter.max5YearReturn;
        
        //query = 'SELECT Id, Name, Sector__r.Name, Asset_Class__c, Abbreviation__c, Five_Year_Return__c, One_Year_Return__c, Rating__c, Two_Year_Return__c, YTD_Return__c FROM Fund__c where ID != null Order by Name Limit :fds OFFSET :off';
        
        query = 'SELECT Count() FROM Fund__c where ID != null';
        
        if(nameStr == ''){
            nameStr = '%';
        }
        else {
            nameStr = '%'+nameStr+'%';
        }
        system.debug(nameStr);
        
        
        query = query+' and Name LIKE :nameStr';
        
        if(assetStr != '') {
            query = query + ' and Asset_Class__c =:assetStr';
        }
        
        if(sectorStr != ''){
            query = query + ' and Sector__r.Name =:sectorStr';
        }
        
        query = query + ' and YTD_Return__c  >= :minYtdReturn and YTD_Return__c  <= :maxYtdReturn';
        query = query + ' and One_Year_Return__c >= :min1YearReturn and One_Year_Return__c <= :max1YearReturn';
        query = query + ' and Five_Year_Return__c >= :min5YearReturn and Five_Year_Return__c <= :max5YearReturn';
                
        try {
            tot = Database.countQuery(query);
            system.debug(tot);
            return tot;
        }
        
        Catch(Exception e) {
            system.debug(e.getMessage());  
            throw new AuraHandledException('Something went wrong:'+e.getMessage());
        } 
    }
}