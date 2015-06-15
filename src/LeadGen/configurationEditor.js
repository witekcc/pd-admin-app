import {bindable, inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';

@inject(HttpClient)
@bindable ({  name:'configuration', attribute:'selected-config'})
export class ConfigurationEditor {

	constructor(http){
		this.http = http;
		this.configuration = null;
		
	}

	get canSave(){
		return this.configuration != null && !this.configuration.isSaving;
	}

	get canDelete(){
		return this.configuration != null && this.configuration.Id > 0 && !this.configuration.isSaving;
	}


	save(){
		this.configuration.Save(this.http);
	}

	delete(){
		this.configuration.Delete(this.http);
	}

}