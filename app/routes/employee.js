import Route from '@ember/routing/route';
import { service } from '@ember/service';
import EmployeeStoreRepository from '../helpers/employee-store-repository';

export default class EmployeeRoute extends Route {
  @service router;
  @service store;

  employeeStoreService = new EmployeeStoreRepository(this.store);

  queryParams = ['id'];

  async model(params) {
    let employee = null;
    let companiesList = [];
    let projectsList = [];

    if (params.hasOwnProperty('id')) {
      employee = await this.employeeStoreService.getById(params.id);
      companiesList = await employee.companies;
      projectsList = await employee.projects;
    }

    return {
      employee: employee,
      companiesList: companiesList,
      projectsList: projectsList,
    };
  }
}
