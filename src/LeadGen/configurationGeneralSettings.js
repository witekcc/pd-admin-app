import {bindable} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';

@bindable ({  name:'configuration', attribute:'selected-config'})
export class ConfigurationGeneralSettings {

constructor(){
	this.configuration = null;
}


}