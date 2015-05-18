import {HttpClient} from 'aurelia-http-client';
import {inject} from 'aurelia-framework';
import {computedFrom} from 'aurelia-framework';

@inject(HttpClient)
export class CampaignCollection {

	constructor(http){
		this.campaigns = null;
		this.selectedCampaign = null;
		this.isLoaded = false;
		this.filtered = null;
		this.lastFilter = "";
		this.filter = "";
		this.loadCampaigns(http);
	}

	loadCampaigns(http){
		let url = "http://localhost:9004/";
		let that = this;
	
		http.get(url).then(function (httpResponse){

			let campaigns = JSON.parse(httpResponse.response);
			
			that.doneLoading(campaigns);
			

		})
	}

	@computedFrom("campaigns", "filter")
	get filteredCampaigns(){
		if(this.filter == this.lastFilter){
			return this.filtered;
		}	

		this.lastFilter = this.filter;

		if(this.filter == "")
			return this.campaigns;

		this.filtered = this.campaigns.filter(this.doFilter, this);
		return this.filtered;
	}

	doFilter(item){
      return item.CampaignName.toLowerCase().includes(this.filter.toLowerCase()) || item.Id.toString().includes(this.filter);
    }

	doneLoading(value){
		
		this.campaigns = value;
		this.filtered = value;
		this.isLoaded = true;
	}

	selectCampaign(campaign){
		this.selectedCampaign = campaign;
	}	



}