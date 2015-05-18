import {bindable, customElement} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';

@customElement("configuration-data-settings")
@bindable ({  name:'configuration', attribute:'selected-config'})
export class ConfigurationDataSettings {

constructor(){
  
	this.configuration = null;
}

testTemplate() {
  	let url = "http://localhost:9001/generate/" + this.selectedConfiguration.CampaignId + "?template=" + JSON.stringify(this.selectedConfiguration.Template) + "&limit=10";
  	let that = this;

  	this.http.get(url).then(function (httpResponse) {
  	
      that.setTestResults(httpResponse.response);
  		
  	});
  	
  }


}