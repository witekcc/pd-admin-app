import {inject, bindable} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {Services} from '../services';
import {DemographicRanking} from '../../../Models/DemographicRanking';

@bindable ({name:'selected', attribute:'selected-type'})
@inject(HttpClient, DemographicRanking)
export class LeadFileGen {
	constructor(http, model) {
		this.http = http;
		this.campaignId = 4890;
    this.rowLimit = 10;
  	this.results = "";
    this.model = model;
  }
}
