import {bindable, customElement, inject, computedFrom} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';
import {MappingRequest} from 'Models/MappingRequest';
import {HttpClient} from 'aurelia-http-client';
import {AvailableTypes} from 'Models/AvailableTypes';
import {Services} from 'services';

@inject(HttpClient, AvailableTypes)
@customElement("configuration-data-settings")
@bindable ({  name:'configuration', attribute:'selected-config', changeHandler:'configChanged'})
export class ConfigurationDataSettings {
constructor(http, types){
  this.http = http;
  this.testResults = "";
  this.alerts = [];
  this.types = types;

}

configChanged(newValue, oldValue){
  this.alerts = [];
}

testTemplates() {
    let request = new MappingRequest();

    request.addTemplate(this.configuration.DynamicPart);
    request.addTemplate(this.configuration.Template);
    request.setReplacementMap(this.configuration.ReplacementMap);
    request.Limit = this.configuration.LeadCountLimit;
    
    let url = Services.LeadGen() + "generate/0";
    let that = this;

    this.http.createRequest(url)
    .asPost()
    .withHeader("Content-Type", "application/json;charset=UTF-8")
    .withContent(JSON.stringify(request))
    .send().then(function (httpResponse) {
    
          let results = JSON.parse(httpResponse.response);
          //console.log(results);
          if(results != null && results.MappedTemplates.length > 1)
          {
            that.testResults = results.MappedTemplates[1];
          }
             
    });
  }  
  
  sendTest() {
  
    let url = Services.LeadSend() + "test/" + this.configuration.Id;
    
    this.http.post(url);
    let id = this.configuration.ActionType;
    let action = this.types.ActionTypes.find(function(type){ return type.Id == id;})

    this.alerts.push("Sent " + action.Name + " to " + this.configuration.Url + this.configuration.DynamicPart );
  }




}