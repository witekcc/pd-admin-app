import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

@inject(Router)
export class Login{
  constructor(router) {
    console.log(router);
    this.router = router;
  }

  username = '';
  password = '';

  login() {
    if(this.username == 'admin' && this.password == 'admin') {
        return true;
    }
    else
    {
      alert("Invalid credentials");
    }

  }

  activate(params, queryString, routeConfig){
    console.log('Activate Login');
  }

}
