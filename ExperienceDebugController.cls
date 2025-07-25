public with sharing class ExperienceDebugController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccountsWithContacts() {
        return [SELECT Id, Name, (SELECT Id, LastName, Email FROM Contacts LIMIT 2) FROM Account LIMIT 5];
    }

    @AuraEnabled(cacheable=true)
    public static List<Region__c> getRegionHierarchy() {
        return [SELECT Id, Name, Type__c, Parent_Region__c, Parent_Region__r.Name FROM Region__c WHERE Type__c != null];
    }
}