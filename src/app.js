import {inject} from 'aurelia-framework';
import {Router, Redirect} from 'aurelia-router';
import {AuthorizeStep} from './auth';
import 'bootstrap';
import 'bootstrap/css/bootstrap.css!';

export class App {
 
  configureRouter(config, router){
    config.title = 'PD Administration Application';
    config.addPipelineStep('authorize', AuthorizeStep); 
    config.map([
      // { route: ['','welcome'],  moduleId: './welcome',      nav: true, title:'Welcome'},
       //{ route: 'child-router',  moduleId: './child-router', nav: true, title:'Child Router' , auth: false},
       //{ route: 'campaignsList',  moduleId: './LeadGen/campaignsList', nav: true, title:'Campaigns List' , auth: false},
       // {route: 'login', moduleId: './login', nav: false, title: 'Login'},
        //{ route: ['','leadfilegen'], moduleId: './LeadGen/leadfilegen', nav:true, title:'Lead File Gen'},
        { route: ['','configuration'], moduleId: './LeadGen/configuration', nav:true, title:'Lead File Management'}
    ]);

    this.router = router;
  }
}
