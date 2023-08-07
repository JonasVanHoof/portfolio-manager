import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import CompanyStoreRepository from '../helpers/company-store-repository';

export default class CompaniesController extends Controller {
  @tracked name;
  @tracked description;
  @tracked address;

  @service store;
  @service toaster;

  companyStoreRepository = new CompanyStoreRepository(this.store);

  showCreateCompany = false;
  isEditing = false;
  isExecutingAction = false;

  @action
  createCompany(event) {
    event.preventDefault();

    this.companyStoreRepository.create(
      this.name,
      this.description,
      this.address
    );

    this.toaster.success(`Company ${this.name}`, 'Created', {
      timeOut: 3000,
      closable: false,
    });

    this.name = '';
    this.description = '';
    this.address = '';

    this.set('isEditing', false);
    this.set('isExecutingAction', false);
    this.set('showCreateCompany', false);
  }

  @action
  setShowCreateCompany() {
    this.set('showCreateCompany', true);
    this.set('isExecutingAction', true);
  }

  @action
  setShowEditCompany() {
    this.set('isEditing', true);
    this.set('isExecutingAction', true);
  }

  @action
  toggleIsExecuting(state) {
    this.toggleProperty('isExecutingAction');
    if (this.isExecutingAction == false) {
      this.set('showCreateCompany', false);
      this.set('isEditing', false);
    }
  }
}
