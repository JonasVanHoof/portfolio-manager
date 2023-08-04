import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import CompanyStoreRepository from '../helpers/company-store-repository';

export default class CompanyListItemComponent extends Component {
  @tracked company;
  @tracked isEditing;
  @tracked updatedCompanyName;

  @service store;
  companyStoreService = new CompanyStoreRepository(this.store);

  @action
  getEmployeeCount(companyId) {
    if (!companyId) {
      return 0;
    }

    const company = this.store.peekRecord('company', companyId);
    const employees = company.employees;

    return employees.length;
  }

  @action
  getProjectCount(companyId) {
    if (!companyId) {
      return 0;
    }

    const company = this.store.peekRecord('company', companyId);
    const projects = company.projects;

    return projects.length;
  }

  @action
  editCompany(company) {
    if (this.updatedCompanyName || this.updatedCompanyName !== '') {
      this.companyStoreService.updateProperties(
        company.id,
        this.updatedCompanyName
      );
    }
  }
}
