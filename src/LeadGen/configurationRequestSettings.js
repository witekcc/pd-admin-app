import {bindable, customElement, inject} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';
import {AvailableTypes} from 'Models/AvailableTypes';

@customElement("configuration-request-settings")
@bindable ({  name:'configuration', attribute:'selected-config', changeHandler: 'configChanged'})
@inject(AvailableTypes)
export class ConfigurationRequestSettings {

constructor(availableTypes){
  
  this.availableTypes = availableTypes;

}

configChanged(newVal, oldVal){
	
}

get CustomHeadersCollection() {
	if(this.configuration == null){
		return null;
	}

	return this.configuration.CustomHeadersCollection;
}

get CertificatesCollection() {
	if(this.configuration == null){
		return null;
	}

	return this.configuration.CertificatesCollection;
}




}