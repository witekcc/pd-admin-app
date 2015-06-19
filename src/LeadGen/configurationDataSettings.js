import {bindable, customElement, inject, computedFrom} from 'aurelia-framework';
import {LeadTransferConfiguration} from 'Models/LeadTransferConfiguration';
import {MappingRequest} from 'Models/MappingRequest';
import {HttpClient} from 'aurelia-http-client';
import {AvailableTypes} from 'Models/AvailableTypes';
import {Services} from 'services';
import {TemplateSamples} from "Models/TemplateSamples";
import {CmEditor} from "Components/CmEditor";

@inject(HttpClient, AvailableTypes)
@customElement("configuration-data-settings")
@bindable ({  name:'configuration', attribute:'selected-config', changeHandler:'configChanged'})
@bindable ({ name:'refreshCounter', attribute:'refresh-counter', changeHandler:'refreshChanged'})
export class ConfigurationDataSettings {
constructor(http, types){
  this.http = http;
  this.testResults = "";
  this.alerts = [];
  this.types = types;
  this.samples = TemplateSamples.Samples();
  this.refreshCounter = 0;

}

refreshChanged(newVal, oldValue){
  if(this.cmedit != null){
      this.cmedit.refresh();
    }
}

configChanged(newValue, oldValue){
  this.alerts = [];
}

useTemplate(sample){
  this.configuration.Template = sample;
}

testTemplates() {
    let request = new MappingRequest();

    request.addTemplate(this.configuration.DynamicPart);
    request.addTemplate(this.configuration.Template);
    request.setReplacementMap(this.configuration.ReplacementMap);
    request.Limit = this.configuration.LeadCountLimit;

    if(request.Limit > 10 || request.Limit == 0){
      request.Limit = 10;
    }
    
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
    
    let id = this.configuration.ActionType;
    let action = this.types.ActionTypes.find(function(type){ return type.Id == id;})

    let info = "Sent " + action.Name + " to " + this.configuration.Url + this.configuration.DynamicPart ;
    let alert = {message : info, response : null};

    let that = this;
    this.alerts.push(alert );

    this.http.createRequest(url)
    .asPost()
    .withHeader("Content-Type", "application/text;charset=UTF-8")
    .send()
    .then(function (httpResponse) {

      alert.response = httpResponse.response;

    });


    
    
    
    


  }




}