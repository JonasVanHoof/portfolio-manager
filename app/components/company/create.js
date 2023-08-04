import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import CompanyStoreRepository from '../../helpers/company-store-repository';
import { alias } from '@ember/object/computed';

export default class CreateComponent extends Component {
  @tracked name;
  @tracked description;
  @tracked address;

  @service store;

  companyStoreRepository = new CompanyStoreRepository(this.store);

  @action
  create() {
    this.companyStoreRepository.create(
      this.name,
      this.description,
      this.address
    );

    this.name = '';
    this.description = '';
    this.address = '';
  }
}
