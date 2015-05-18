import {inject} from 'aurelia-framework';
import {bindable, customElement, bindingMode } from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';
import {HttpClient} from 'aurelia-http-client';

@bindable ({
  name:'selectedCampaign', //name of the property on the class
  attribute:'selected-campaign', //name of the attribute in HTML
  changeHandler:'selectedCampaignChanged',//name of the method to invoke when the property changes
  defaultBindingMode: bindingMode.twoWay 
})
@bindable ({
  name:'selectedConfiguration', //name of the property on the class
  attribute:'selected-configuration', //name of the attribute in HTML  
  defaultBindingMode: bindingMode.twoWay 
})
@inject(HttpClient)
export class ConfigurationsList{

constructor(http){
	    this.selectedConfiguration = null;
    	this.configurationMap = new Map();
    	this.selectedConfigurationList = null;
    	this.selectedCampaign= null;
		LeadTransferConfiguration.getAllConfigs(http, this.configurationMap);
} 

selectedCampaignChanged(newValue, oldValue){
	  this.selectedCampaign= newValue;
      if(this.configurationMap.has(newValue.Id)) {
      this.selectedConfigurationList = this.configurationMap.get(newValue.Id);

      if(this.selectedConfigurationList.length > 0){
        this.selectedConfiguration = this.selectedConfigurationList[0]; 
      }
    } else {
      this.selectedConfigurationList = null;
      this.selectedConfiguration = null;
    }
}

selectConfig(config){
    this.selectedConfiguration = config;
}

numberOfConfigurations(campaignId){
    
    if(this.configurationMap.has(campaignId)){
    
      let configs = this.configurationMap.get(campaignId);
      if(configs != null){
        return configs.length;
      }
    }

    return "";
}
   
newConfiguration(){
    
    let config = new LeadTransferConfiguration(null);
    config.CampaignId = this.selectedCampaign.Id;    

    if(!this.configurationMap.has(config.CampaignId)) {
      this.selectedConfigurationList = new Array();
      this.configurationMap.set(config.CampaignId, this.selectedConfigurationList);
    }

    this.selectedConfigurationList.push(config);
    this.selectedConfiguration = config;
}



}
