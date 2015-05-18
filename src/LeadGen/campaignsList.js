import {inject} from 'aurelia-framework';
import {CampaignCollection} from 'Models/CampaignCollection';
import {bindable, customElement} from 'aurelia-framework';

@inject(CampaignCollection)
@bindable ({  name:'selectedCampaign', attribute:'selected-campaign'})
export class CampaignsList{

	constructor(campaignCollection){
		this.campaignCollection = campaignCollection;
    this.selectedCampaign = null;
    this.campaignSelected = false;
	}

  clearFilter(){
    this.campaignFilter = " ";
  }

  get campaignName(){
  	return this.selectedCampaign.CampaignName;
  }

  get campaignFilter(){
    return this.campaignCollection.filter;
  }

  set campaignFilter(value){
    this.campaignCollection.filter = value;
  }

  get campaigns(){
    return this.campaignCollection.filteredCampaigns;
  }
   
  selectCampaign(campaign) {
    this.campaignSelected = true;

     if(this.campaignCollection != null){
      this.campaignCollection.selectedCampaign = campaign;
       }
     this.selectedCampaign = campaign;     
  }


}