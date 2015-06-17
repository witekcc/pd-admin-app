import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration'
 
 @inject(HttpClient)
export class LeadTransferConfigLoader {

	constructor(http){
		this.http = http;
		this.IsLoading = false;
		this.loadingCounter = 0;
	}

	GetConfigsForCampaign(campaignId, campaignArray){
		let url = "http://localhost:9002/campaign/" + campaignId;
 		let that = this;
 		this.incrementLoading();
		this.http.get(url).then(function (httpResponse){

			let items = JSON.parse(httpResponse.response);

			for(let item in items) {				
				campaignArray.push(new LeadTransferConfiguration(that.http, items[item]));
			 }

			 that.decrementLoading();
		})
	}

	incrementLoading(){
		this.loadingCounter++;
		this.IsLoading = true;
	}

	decrementLoading(){
		this.loadingCounter--;
		if(this.loadingCounter <= 0){
			this.loadingCounter = 0;
			this.IsLoading = false;
		}
	}

	GetAllConfigs(campaignMap){
		let url = "http://localhost:9002/";
 		let that = this;
 		this.incrementLoading();

		this.http.get(url).then(function (httpResponse){
			campaignMap.clear();

			let campaigns = JSON.parse(httpResponse.response);

			for(let campaign in campaigns){

				if(!campaignMap.has(campaigns[campaign].CampaignId)) {
					campaignMap.set(campaigns[campaign].CampaignId, 
						Array.from(campaigns
							.filter( c => c.CampaignId == campaigns[campaign].CampaignId), 
							x => new LeadTransferConfiguration(that.http, x)));
				 }
			}

			that.decrementLoading();

		})
	}
}