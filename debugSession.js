import { LightningElement, wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/DebugController.fetchAccounts';
import getServerData from '@salesforce/apex/DebugController.getServerData';

export default class DebugSession extends LightningElement {
    result;
    error;

    inputNumber = 'das'; 
    isActive = true;

    accounts = [];
    accountsError;

    // Wire call for object data (used to test data access + reactive debug)
    @wire(fetchAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.accountsError = undefined;
        } else if (error) {
            this.accountsError = error;
            this.accounts = [];
        }
    }

    connectedCallback() {
        this.debugOnLoad();
    }

    debugOnLoad() {
        if (this.enableLogging) {
            console.log('Debug: On Load Triggered');
        }

        if (this.isActive) {
            this.result = 'Component is active';
        } else {
            this.result = 'Component is inactive';
        }

        // Intentional bug: inputNumber is string, Apex expects Integer
        getServerData({ someNumber: this.inputNumber })
            .then(res => {
                this.result = res;
                this.error = undefined;
            })
            .catch(err => {
                this.error = err.body.message;
                this.result = undefined;
            });
    }

    handleClick() {
        if (this.enableLogging) {
            console.log('Button clicked. Input Number:', this.inputNumber);
        }

        getServerData({ someNumber: this.inputNumber })
            .then(res => {
                this.result = res;
                this.error = undefined;
            })
            .catch(err => {
                this.error = err.body.message;
                this.result = undefined;
            });
    }

    get showResult() {
        return this.result && !this.error;
    }

    get showAccounts() {
        return this.accounts && this.accounts.length > 0;
    }
}
