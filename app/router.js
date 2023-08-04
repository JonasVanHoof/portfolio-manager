import EmberRouter from '@ember/routing/router';
import config from 'frontend/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('companies');
  this.route('company', { path: '/companies/:id' });
  this.route('employees');
  this.route('employee', { path: '/employees/:id' });
  this.route('projects');
  this.route('project', { path: '/projects/:id' });
});
