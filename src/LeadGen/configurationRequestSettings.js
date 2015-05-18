import {bindable, customElement, inject} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';
import {AvailableTypes} from 'Models/AvailableTypes';

@customElement("configuration-request-settings")
@bindable ({  name:'configuration', attribute:'selected-config'})
@inject(AvailableTypes)
export class ConfigurationRequestSettings {

constructor(availableTypes){
  
  this.availableTypes = availableTypes;
	this.configuration = null;
}


}