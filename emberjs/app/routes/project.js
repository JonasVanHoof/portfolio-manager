import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ProjectStoreRepository from '../helpers/project-store-repository';

export default class ProjectRoute extends Route {
  @service router;
  @service store;

  projectStoreService = new ProjectStoreRepository(this.store);

  queryParams = ['id'];

  async model(params) {
    let project = null;
    let employeesList = [];
    let companyList = [];

    if (params.hasOwnProperty('id')) {
      project = await this.projectStoreService.getById(params.id);
      employeesList = await project.employees;
      companyList = await project.companies;
    }

    return {
      project: project,
      employeesList: employeesList,
      companyList: companyList,
    };
  }
}
