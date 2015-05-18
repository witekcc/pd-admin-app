import {Router, Redirect} from 'aurelia-router';

export class AuthorizeStep {
  static inject() { return [] }
  constructor() {}
  run(routingContext, next) {
    // Check if the route has an "auth" key
    // The reason for using `nextInstructions` is because
    // this includes child routes.
    if (routingContext.nextInstructions.some(i => i.config.auth)) {
      var isLoggedIn = /* insert magic here */false;
      console.log('Starting Auth');
      if (!isLoggedIn) {
        console.log('redirecting auth');
        return next.cancel(new Redirect('login'));
      }
    }

    console.log('returning auth');
    return next();
  }

  
}
