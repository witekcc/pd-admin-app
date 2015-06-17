import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {IdKeyValueCollection} from 'Models/IdKeyValueCollection'
import {Services} from 'services';
 
 @inject(HttpClient)
export class LeadTransferConfiguration {

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
		
	}

	replacer(key, value) {
	  if (value.constructor.name === "IdKeyValueCollection") {
	    return undefined;
	  }
	  return value;
	}

	Save(http){

		console.log('Saving ' + this.Id);
		let url = Services.LeadConfig() + this.Id;
		let that = this;
		this.isSaving = true;
		
		http.createRequest(url)
		.asPost()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(this, this.replacer))
		.send().then(function (httpResponse){
		
			that.Id = parseInt(httpResponse.response);

			that.isSaving = false;
		});
 
	}

	Delete(http){

		console.log('Deleting ' + this.Id);
		let url = Services.LeadConfig() + this.Id;
		let that = this;
		this.isSaving = true;

		http.createRequest(url)
		.asDelete()
		.withHeader("Content-Type", "application/json;charset=UTF-8")
		.withContent(JSON.stringify(this, this.replacer))
		.send().then(function (httpResponse){
		
			that.Id = parseInt(httpResponse.response);

			that.isSaving = false;
		});
 
	}
	
	
  	
  }
