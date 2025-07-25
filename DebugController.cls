public with sharing class DebugController {
    @AuraEnabled(cacheable=true)
    public static List<Account> fetchAccounts() {
        return [SELECT Id, Name FROM Account LIMIT 5];
    }

    @AuraEnabled
    public static String getServerData(Integer someNumber) {
        if (someNumber < 0) {
            throw new AuraHandledException('Number cannot be negative');
        }
        return 'Server received number: ' + someNumber;
    }
}
