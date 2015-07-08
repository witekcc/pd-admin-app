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
        { route: ['','configuration'], moduleId: './LeadGen/configuration', nav:true, title:'Lead File Management', auth: false}
    ]);

    this.router = router;
  }
}
