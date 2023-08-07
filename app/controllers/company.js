import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import CompanyStoreRepository from '../helpers/company-store-repository';
import EmployeeStoreRepository from '../helpers/employee-store-repository';
import ProjectStoreRepository from '../helpers/project-store-repository';

export default class CompanyController extends Controller {
  @service store;

  companyStoreService = new CompanyStoreRepository(this.store);
  employeeStoreService = new EmployeeStoreRepository(this.store);
  projectStoreService = new ProjectStoreRepository(this.store);

  isExecutingAction = false;
  isAddProjectToCompanyVisisble = false;
  isAddEmployeeToCompanyVisisble = false;
  isRemoveEmployeeToCompanyVisisble = false;
  isRemoveProjectToCompanyVisisble = false;

  @action
  async addEmployeeToCompany(companyId) {
    let employeeSelect = document.getElementById('employeeInput');
    const employeeId =
      employeeSelect.options[employeeSelect.selectedIndex].value;
    const employee = await this.employeeStoreService.getById(employeeId);
    await this.companyStoreService.addEmployeesToCompany(companyId, [employee]);

    this.set('isExecutingAction', false);
    this.set('isAddEmployeeToCompanyVisisble', false);
    this.set('isRemoveEmployeeToCompanyVisisble', false);
  }

  @action
  async addProjectToCompany(companyId) {
    let projectSelect = document.getElementById('projectInput');
    const projectId = projectSelect.options[projectSelect.selectedIndex].value;
    const project = await this.projectStoreService.getById(projectId);
    await this.companyStoreService.addProjectsToCompany(companyId, [project]);

    this.set('isExecutingAction', false);
    this.set('isAddProjectToCompanyVisisble', false);
  }

  @action
  async removeEmployeeFromCompany(companyId) {
    let employeeSelect = document.getElementById('employeeToRemoveInput');
    const employeeId =
      employeeSelect.options[employeeSelect.selectedIndex].value;

    await this.companyStoreService.removeEmployeeFromCompany(
      companyId,
      employeeId
    );

    this.set('isExecutingAction', false);
    this.set('isRemoveEmployeeToCompanyVisisble', false);
  }

  @action
  async removeProjectFromCompany(companyId) {
    let projectSelect = document.getElementById('projectToRemoveInput');
    const projectId = projectSelect.options[projectSelect.selectedIndex].value;

    await this.companyStoreService.removeProjectFromCompany(
      companyId,
      projectId
    );

    this.set('isExecutingAction', false);
    this.set('isRemoveProjectToCompanyVisisble', false);
  }

  @action
  setIsShowingAddEmployee() {
    this.set('isAddEmployeeToCompanyVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  setIsShowingRemoveEmployee() {
    this.set('isRemoveEmployeeToCompanyVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  setIsShowingRemoveProject() {
    this.set('isRemoveProjectToCompanyVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  setIsShowingAddProject() {
    this.set('isAddProjectToCompanyVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  deleteCompany(companyId) {
    if (
      window.confirm(
        `Are you sure you want to delete this company with all its relations?`
      )
    ) {
      this.companyStoreService.deleteById(companyId);
      window.location.href = 'http://localhost:4200/companies';
    }
  }

  @action
  toggleIsExecutingAction() {
    this.toggleProperty('isExecutingAction');
    if (this.isExecutingAction == false) {
      this.set('isAddEmployeeToCompanyVisisble', false);
      this.set('isRemoveEmployeeToCompanyVisisble', false);
      this.set('isRemoveProjectToCompanyVisisble', false);
      this.set('isAddProjectToCompanyVisisble', false);
    }
  }
}
