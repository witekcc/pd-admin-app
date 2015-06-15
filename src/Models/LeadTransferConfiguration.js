import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {IdKeyValueCollection} from 'Models/IdKeyValueCollection'
 
 @inject(HttpClient)
export class LeadTransferConfiguration {
	
	static getConfigsForCampaign(http, campaignId, campaignArray){
		let url = "http://localhost:9002/campaign/" + campaignId;
 
		http.get(url).then(function (httpResponse){
			let items = JSON.parse(httpResponse.response);

			for(let item in items) {				
				campaignArray.push(new LeadTransferConfiguration(http, items[item]));
			 }
		})
	}

	static getAllConfigs(http, campaignMap){
		let url = "http://localhost:9002/";
 		
		http.get(url).then(function (httpResponse){
			campaignMap.clear();

			let campaigns = JSON.parse(httpResponse.response);

			for(let campaign in campaigns){

				if(!campaignMap.has(campaigns[campaign].CampaignId)) {
					campaignMap.set(campaigns[campaign].CampaignId, 
						Array.from(campaigns
							.filter( c => c.CampaignId == campaigns[campaign].CampaignId), 
							x => new LeadTransferConfiguration(http, x)));
				 }
			}

		})
	}

	constructor(http, obj){
		this.http = http;
		this.Name = "New Configuration";
		this.Url = "";
		this.DynamicPart ="";
		this.CampaignId = 0;
		this.LeadCountLimit = 0;
		this.FileCompression = 1;
		this.Template = "";
		this.Notes = "";
		this.UserName = "";
		this.Password = "";
		this.Id = 0;
		this.ActionType = 1;
		this.SuccessCode = 200;
		this.SuccessString = "";
		

		this.CustomHeaders = [];
		this.ReplacementMap = [];
		this.Certificates = [];
		
		this.isSaving = false;
				
		for (var prop in obj) this[prop] = obj[prop];
		
		this.CertificatesCollection = new IdKeyValueCollection(http, this.Certificates, "/certificates", this);
		this.CustomHeadersCollection = new IdKeyValueCollection(http, this.CustomHeaders, "/headers", this);
		this.ReplacementMapCollection = new IdKeyValueCollection(http, this.ReplacementMap, "/valueMap", this);
		console.log(this);
	}

	Save(http){

		console.log('Saving ' + this.Id);
		let url = "http://localhost:9002/" + this.Id;
		let that = this;
		this.isSaving = true;
		
		http.createRequest(url)
		.asPost()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(this))
		.send().then(function (httpResponse){
		
			that.Id = parseInt(httpResponse.response);

			that.isSaving = false;
		});
 
	}

	Delete(http){

		console.log('Deleting ' + this.Id);
		let url = "http://localhost:9002/" + this.Id;
		let that = this;
		this.isSaving = true;

		http.createRequest(url)
		.asDelete()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(this))
		.send().then(function (httpResponse){
		
			that.Id = parseInt(httpResponse.response);

			that.isSaving = false;
		});
 
	}
	
	
  	
  }
