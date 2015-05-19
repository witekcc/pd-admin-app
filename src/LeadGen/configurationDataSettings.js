import {bindable, customElement} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';
import {MappingRequest} from 'Models/MappingRequest';

@customElement("configuration-data-settings")
@bindable ({  name:'configuration', attribute:'selected-config', changeHandler:'configChanged'})
export class ConfigurationDataSettings {

constructor(){
  this.testResults = "";
	this.configuration = null;
}

testTemplate() {
  	let url = "http://localhost:9001/generate/" + this.configuration.CampaignId + "?template=" + JSON.stringify(this.configuration.Template) + "&limit=10";
  	let that = this;

  	this.http.get(url).then(function (httpResponse) {
  	
      that.setTestResults(httpResponse.response);
  		
  	});
  	
  }

testTemplates() {
    let request = new MappingRequest();

    request.addTemplate(this.configuration.DynamicPart);
    request.addTemplate(this.configuration.Template);
    request.setReplacementMap(this.configuration.ReplacementMap);
    console.log(request);
    let url = "http://localhost:9001/generate/" + this.configuration.CampaignId;
    let that = this;

    this.http.createRequest(url)
    .asPost()
    .withHeader("Content-Type", "application/json;charset=UTF-8")
    .withContent(JSON.stringify(request))
    .send().then(function (httpResponse) {
    
          let results = JSON.parse(httpResponse.response);
          console.log(results);
          if(results != null && results.MappedTemplates.length > 1)
          {
            that.testResults = results.MappedTemplates[1];
          }
             
    });
  }

  configChanged(oldValue, newValue) {
    this.testResults = "";
  }



}