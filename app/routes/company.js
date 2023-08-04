import Route from '@ember/routing/route';
import { service } from '@ember/service';
import EmployeeStoreRepository from '../helpers/employee-store-repository';
import ProjectStoreRepository from '../helpers/project-store-repository';
import CompanyStoreRepository from '../helpers/company-store-repository';

export default class CompanyRoute extends Route {
  @service router;
  @service store;

  companyStoreService = new CompanyStoreRepository(this.store);
  employeeStoreService = new EmployeeStoreRepository(this.store);
  projectStoreService = new ProjectStoreRepository(this.store);

  queryParams = ['id'];

  async model(params) {
    let company = null;
    let companyEmployees = [];
    let companyProjects = [];
    let possibleEmployeesToAdd = [];
    let possibleProjectsToAdd = [];

    if (params.hasOwnProperty('id')) {
      company = await this.companyStoreService.getById(params.id);
      companyEmployees = await company.employees;
      companyProjects = await company.projects;

      const possibleEmployeeProxiesToAdd =
        await this.employeeStoreService.getAll();
      const possibleProjectProxiesToAdd =
        await this.projectStoreService.getAll();

      possibleEmployeesToAdd.push(...possibleEmployeeProxiesToAdd); // TODO only showing one item in the dropdown + filter out already added items
      possibleProjectsToAdd.push(...possibleProjectProxiesToAdd); //
    }

    return {
      actionBarLabels: {
        addEmployeeRelation: 'Add employee',
        removeEmployeeRelation: 'Remove employee',
        removeProjectRelation: 'Remove project',
        addProjectRelation: 'Add Project',
        CANCEL: 'Cancel',
        CREATE: 'Create',
        REMOVE: 'Remove',
      },
      company: company,
      companyEmployees: companyEmployees,
      companyProjects: companyProjects,
      possibleEmployeesToAdd: possibleEmployeesToAdd,
      possibleProjectsToAdd: possibleProjectsToAdd,
    };
  }
}
