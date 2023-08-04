import Route from '@ember/routing/route';
import { service } from '@ember/service';
import CompanyStoreRepository from '../helpers/company-store-repository';

export default class CompaniesRoute extends Route {
  @service store;

  companyStoreService = new CompanyStoreRepository(this.store);

  async model() {
    const companies = await this.companyStoreService.getAll();
    // let res = await this.store.query('employee', {
    //   filter: {
    //     givenName: "Jonas"
    //   }
    // })

    // console.log(res);

    return {
      title: 'Companies',
      companyNameInputLabel: 'Name',
      companyDescriptionInputLabel: 'Description',
      companyAddressInputLabel: 'Address',
      companies: companies,
      actionBarLabels: {
        NEW: 'New',
        CANCEL: 'Cancel',
        CREATE: 'Create',
        EDIT: 'Edit',
      },
    };
  }
}
