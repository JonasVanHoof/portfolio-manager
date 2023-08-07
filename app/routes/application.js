import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    return {
      menuTitles: [
        {
          label: 'Employees',
          route: 'http://localhost:4200/employees',
        },
        {
          label: 'Companies',
          route: 'http://localhost:4200/companies',
        },
        {
          label: 'Projects',
          route: 'http://localhost:4200/projects',
        },
      ],
    };
  }
}
