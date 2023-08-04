import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ProjectStoreRepository from '../helpers/project-store-repository';
import EmployeeStoreRepository from '../helpers/employee-store-repository';
import CompanyStoreRepository from '../helpers/company-store-repository';

export default class ProjectController extends Controller {
  @service store;

  @tracked possibleEmployeesToAssign = [];
  @tracked possibleCompaniesToAssign = [];

  projectStoreRepository = new ProjectStoreRepository(this.store);
  employeeStoreRepository = new EmployeeStoreRepository(this.store);
  companyStoreRepository = new CompanyStoreRepository(this.store);

  isAddEmployeeToProjectVisisble = false;
  isAddCompanyToProjectVisisble = false;
  isRemoveEmployeeToCompanyVisisble = false;
  isExecutingAction = false;

  @action
  deleteProject(projectId) {
    if (
      window.confirm(
        `Are you sure you want to delete this project with all its relations?`
      )
    ) {
      this.projectStoreRepository.deleteById(projectId);
      window.location.href = 'http://localhost:4200/projects';
    }
  }

  @action
  async assignEmployee(projectId) {
    let employeeSelect = document.getElementById('employeeInput');
    const employeeId =
      employeeSelect.options[employeeSelect.selectedIndex].value;
    const employee = await this.employeeStoreRepository.getById(employeeId);
    await this.projectStoreRepository.addEmployeesToProject(projectId, [
      employee,
    ]);
    this.set('isAddEmployeeToProjectVisisble', false);
    this.set('isExecutingAction', false);
  }

  @action
  async assignCompany(projectId) {
    let companySelect = document.getElementById('companyInput');
    const companyId = companySelect.options[companySelect.selectedIndex].value;
    const company = await this.companyStoreRepository.getById(companyId);
    await this.projectStoreRepository.addCompaniesToProject(projectId, [
      company,
    ]);
    this.set('isAddCompanyToProjectVisisble', false);
    this.set('isExecutingAction', false);
  }

  @action
  async removeEmployeeFromProject(projectId) {
    let employeeSelect = document.getElementById('employeeToRemoveInput');
    const employeeId =
      employeeSelect.options[employeeSelect.selectedIndex].value;

    await this.projectStoreRepository.removeEmployeeFromProject(
      projectId,
      employeeId
    );

    this.set('isRemoveEmployeeToCompanyVisisble', false);
    this.set('isExecutingAction', false);
  }

  @action
  setIsShowingRemoveEmployee() {
    this.set('isRemoveEmployeeToCompanyVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  async setIsShowingAssignEmployee() {
    const allEmployees = await this.employeeStoreRepository.getAll();
    this.set('possibleEmployeesToAssign', [...allEmployees]);
    this.set('isAddEmployeeToProjectVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  async setIsShowingAssignCompany() {
    const allCompanies = await this.companyStoreRepository.getAll();
    this.set('possibleCompaniesToAssign', [...allCompanies]);
    this.set('isAddCompanyToProjectVisisble', true);
    this.set('isExecutingAction', true);
  }

  @action
  toggleIsExecutingAction() {
    this.toggleProperty('isExecutingAction');
    if (this.isExecutingAction == false) {
      this.set('isAddCompanyToProjectVisisble', false);
      this.set('isAddEmployeeToProjectVisisble', false);
      this.set('isRemoveEmployeeToCompanyVisisble', false);
    }
  }
}
