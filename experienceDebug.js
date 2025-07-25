import { LightningElement, wire, track } from 'lwc';
import getAccountsWithContacts from '@salesforce/apex/ExperienceDebugController.getAccountsWithContacts';
import getRegionHierarchy from '@salesforce/apex/ExperienceDebugController.getRegionHierarchy';

export default class ExperienceDebug extends LightningElement {
    @track accounts = [];
    @track regions = [];
    @track selectedAccount = null;
    @track error;

    @wire(getAccountsWithContacts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.selectedAccount = data.length > 0 ? data[0] : null; // <-- Breakpoint 1
        } else if (error) {
            this.error = error;
        }
    }

    @wire(getRegionHierarchy)
    wiredRegions({ error, data }) {
        if (data) {
            this.regions = data; // <-- Breakpoint 2
        } else if (error) {
            this.error = error;
        }
    }

    get hasContacts() {
        return this.selectedAccount?.Contacts?.length > 0; // <-- Breakpoint 3
    }
}
