import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';

@inject(HttpClient)
export class Configuration {
	constructor(http) {
		this.http = http;
		this.testResults = "";
    this.selectedConfiguration = null;
    this.selectedConfigurationList = null;
    this.campaignSelected = true;

  }

 

}