public with sharing class contactAuraService {
    public contactAuraService() {

    }

    @AuraEnabled(cacheable=true)
    public static List<sObject> getContactList(String name){
        String key = '%'+name+'%';
        String query = 'Select Id, Name, Email, Phone from Contact Where Name LIKE :key';
        return Database.query(query);
    }

    @AuraEnabled
    public static List<sObject> getAccountList(String name){
        system.debug('Name = '+name);
        String key = '%'+name+'%';
        String query = 'Select Id, Name, Industry from Account Where Name LIKE :key';
        return Database.query(query);
    }

    @AuraEnabled(cacheable=true)
    public static List<Contact> getAllContacts(){
        system.debug('Inside method');
        String str = 'Select Id, FirstName, LastName, Name, Email, Phone, Level__c, Title from Contact';
        return Database.query(str);
    }
}