import {App} from '../../src/app';

class RouterStub {
  configure(handler) {
    handler(this);
  }
  map(routes) {
    this.routes = routes;
  }
}

describe('the App module', () => {
  var sut;
  beforeEach(() => { sut = new App(new RouterStub()); });

  it('contains a router property', () => {
    expect(sut.router).toBeDefined();
  });

  it('configures the router title', () => {
    expect(sut.router.title).toEqual('PD Administration Application');
  });

  it('should have a Lead Generation Config route', () => {
    expect(sut.router.routes).toContain({ route: ['','configuration'],  moduleId: './LeadGen/configuration', nav:true, title:'Lead File Management', auth: false });
  });

});
