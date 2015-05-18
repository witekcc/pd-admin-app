import {bindable} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';

@bindable ({  name:'configuration', attribute:'selected-config'})
export class ConfigurationEditor {

constructor(){
	this.configuration = null;
	
}

get canSave(){
	return this.configuration != null && !this.configuration.isSaving;
}

get canDelete(){
	return this.configuration != null && this.configuration.Id > 0 && !this.configuration.isSaving;
}


save(){
	this.configuration.Save();
}

delete(){
	this.configuration.Delete();
}

}