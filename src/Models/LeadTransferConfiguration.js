import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
 
 @inject(HttpClient)
export class LeadTransferConfiguration {
	
	static getConfigsForCampaign(http, campaignId, campaignArray){
		let url = "http://localhost:9002/campaign/" + campaignId;
 
		http.get(url).then(function (httpResponse){
			let items = JSON.parse(httpResponse.response)

			campaignArray = [];

			let counter = 0;
			for(item in items) {
				campaignArray[counter] = new LeadTransferConfiguration(http, item);
				console.log(campaignArray[counter] );
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
					campaignMap.set(campaigns[campaign].CampaignId, Array.from(campaigns.filter( c => c.CampaignId == campaigns[campaign].CampaignId), x => new LeadTransferConfiguration(http, x)));
				 }
			}

			//console.log(campaignMap);
		})
	}
/*
	static saveConfig(http, transferConfig) {
		console.log('Saving ' + transferConfig.Id);
		let url = "http://localhost:9002/" + transferConfig.Id;
		http.createRequest(url)
		.asPost()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(transferConfig))
		.send().then(function (httpResponse){
		
			transferConfig.Id = parseInt(httpResponse.response);
		});
 
	}
*/

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
		this.ActionType = 0;
		this.CustomHeaders = [];
		this.ReplacementMap = [];
		this.isSaving = false;
				
		for (var prop in obj) this[prop] = obj[prop];
		
	}

	NewHeader(){
		let item = {Id : 0, Key : "", Value : ""};
		this.CustomHeaders.push(item);
		return item;
	}

	NewReplacementEntry(){
		let item = {Id : 0, Key : "", Value : ""};
		this.ReplacementMap.push(item);
		return item;
	}

	AddUpdateHeader(header){
		
		let url = "http://localhost:9002/" + this.Id + "/headers";
		
		this.http.createRequest(url)
		.asPost()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(header))
		.send().then(function (httpResponse){
		
		header.Id = parseInt(httpResponse.response);

		});
	}

	AddUpdateReplacementEntry(entry){
		
		let url = "http://localhost:9002/" + this.Id + "/valueMap";
		
		this.http.createRequest(url)
		.asPost()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(entry))
		.send().then(function (httpResponse){
		
		entry.Id = parseInt(httpResponse.response);

		});
	}

	DeleteHeader(header){
		
		let url = "http://localhost:9002/" + this.Id + "/headers";
		
		this.http.createRequest(url)
		.asDelete()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(header))
		.send();

		let index = this.CustomHeaders.indexOf(entry);
		if (index > -1) {
		    this.CustomHeaders.splice(index, 1);
		}

	}

	DeleteReplacementEntry(entry){
		
		let url = "http://localhost:9002/" + this.Id + "/valueMap";
		
		this.http.createRequest(url)
		.asDelete()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(entry))
		.send();

		let index = this.ReplacementMap.indexOf(entry);
		if (index > -1) {
		    this.ReplacementMap.splice(index, 1);
		}

	}

	Save(){

		console.log('Saving ' + this.Id);
		let url = "http://localhost:9002/" + this.Id;
		let that = this;
		this.isSaving = true;

		this.http.createRequest(url)
		.asPost()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(this))
		.send().then(function (httpResponse){
		
			that.Id = parseInt(httpResponse.response);

			that.isSaving = false;
		});
 
	}

	Delete(){

		console.log('Deleting ' + this.Id);
		let url = "http://localhost:9002/" + this.Id;
		let that = this;
		this.isSaving = true;

		this.http.createRequest(url)
		.asDelete()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(this))
		.send().then(function (httpResponse){
		
			that.Id = parseInt(httpResponse.response);

			that.isSaving = false;
		});
 
	}
	
	
  	
  }
