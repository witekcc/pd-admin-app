import {inject} from 'aurelia-framework';
import {bindable, customElement, bindingMode } from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';
import {LeadTransferConfigLoader} from 'Models/LeadTransferConfigLoader';
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
@inject(HttpClient, LeadTransferConfigLoader)
export class ConfigurationsList{

constructor(http, loader){
	    this.selectedConfiguration = null;
    	this.configurationMap = new Map();
    	this.selectedConfigurationList = null;
    	this.selectedCampaign= null;
      this.http = http;
      this.loader = loader;

		//LeadTransferConfiguration.getAllConfigs(http, this.configurationMap);
} 

selectedCampaignChanged(newValue, oldValue){
	  
    //this.selectedCampaign= newValue;
      //console.log(this.selectedCampaign);
    if(this.configurationMap.has(newValue.Id)) {
      this.selectedConfigurationList = this.configurationMap.get(newValue.Id);
      
    } 
    else {
      this.selectedConfigurationList = this.loadConfigs(newValue.Id);
    }

    if(this.selectedConfigurationList.length > 0){
        this.selectedConfiguration = this.selectedConfigurationList[0]; 
    } 

    //console.log(this.selectedConfiguration);
}

loadConfigs(campaignId){
  let configs = [];
  this.configurationMap.set(campaignId, configs);

  this.loader.GetConfigsForCampaign(campaignId, configs);

  return configs;
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
    
    let config = new LeadTransferConfiguration(this.http, null);
    config.CampaignId = this.selectedCampaign.Id;    

    if(!this.configurationMap.has(config.CampaignId)) {
      this.selectedConfigurationList = [];
      this.configurationMap.set(config.CampaignId, this.selectedConfigurationList);
    }

    this.selectedConfigurationList.push(config);
    this.selectedConfiguration = config;
}

  get canSave(){
    return this.selectedConfiguration != null && !this.selectedConfiguration.isSaving;
  }

  get canDelete(){
    return this.selectedConfiguration != null && this.selectedConfiguration.Id > 0 && !this.selectedConfiguration.isSaving;
  }


  save(){
    this.selectedConfiguration.Save(this.http);
  }

  delete(){
    this.selectedConfiguration.Delete(this.http);
    let index = this.selectedConfigurationList.indexOf(this.selectedConfiguration);
    this.selectedConfigurationList.splice(index, 1);
    
    if(index > 0)
    {
      this.selectedConfiguration = this.selectedConfigurationList[index -1];
    }
    else
    {
      this.selectedConfiguration = null;
    }

  }



}
