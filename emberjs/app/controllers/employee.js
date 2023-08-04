import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import EmployeeStoreRepository from '../helpers/employee-store-repository';
import ProjectStoreRepository from '../helpers/project-store-repository';
import CompanyStoreRepository from '../helpers/company-store-repository';

export default class EmployeeController extends Controller {
  isAddProjectToEmployeeIsVisisble = false;
  isAddCompanyToEmployeeIsVisisble = false;
  isExecutingAction = false;
  @service store;
  @tracked possibleProjectsToAssign;
  @tracked possibleCompaniesToAssign;

  employeeStoreRepository = new EmployeeStoreRepository(this.store);
  projectStoreRepository = new ProjectStoreRepository(this.store);
  companyStoreRepository = new CompanyStoreRepository(this.store);

  @action
  async setIsShowingAssignProject() {
    const allProjects = await this.projectStoreRepository.getAll();
    this.set('possibleProjectsToAssign', [...allProjects]);
    this.set('isAddProjectToEmployeeIsVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  async setIsShowingAssignCompany() {
    const allCompanies = await this.companyStoreRepository.getAll();
    this.set('possibleCompaniesToAssign', [...allCompanies]);
    this.set('isAddCompanyToEmployeeIsVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  async addProjectToEmployee(employeeId) {
    let projectSelect = document.getElementById('projectSelectInput');
    const projectId = projectSelect.options[projectSelect.selectedIndex].value;
    const projectToAdd = await this.projectStoreRepository.getById(projectId);
    this.employeeStoreRepository.addProjectsToEmployee(employeeId, [
      projectToAdd,
    ]);
  }

  @action
  async addCompanyToEmployee(employeeId) {
    let companySelect = document.getElementById('companySelectInput');
    const companyId = companySelect.options[companySelect.selectedIndex].value;
    const companyToAdd = await this.companyStoreRepository.getById(companyId);
    this.employeeStoreRepository.addCompaniesToEmployee(employeeId, [
      companyToAdd,
    ]);
  }

  @action
  deleteEmployee(employeeId) {
    if (
      window.confirm(
        `Are you sure you want to delete this employee with all its relations?`
      )
    ) {
      this.employeeStoreRepository.deleteById(employeeId);
      window.location.href = 'http://localhost:4200/employees';
    }
  }

  @action
  toggleIsExecutingAction() {
    this.toggleProperty('isExecutingAction');
    if (this.isExecutingAction == false) {
      this.set('isAddProjectToEmployeeIsVisisble', false);
      this.set('isAddCompanyToEmployeeIsVisisble', false);
    }
  }
}
