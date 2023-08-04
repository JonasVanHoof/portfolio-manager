import Route from '@ember/routing/route';
export default class EmployeesRoute extends Route {
  async model() {
    return {
      title: 'Employees',
      firstNameInputLabel: 'Firstname',
      lastNameInputLabel: 'Lastname',
      emailInputLabel: 'Email',
      telephoneInputLabel: 'Telephone',
      addressInputLabel: 'Address',
      bioInputLabel: 'Bio',
      jobTitleInputLabel: 'Job Title',
      companyInputLabel: 'Company',
      actionBarLabels: {
        NEW: 'New',
        CANCEL: 'Cancel',
        CREATE: 'Create',
        EDIT: 'Edit',
        SEARCH: 'Search',
      },
    };
  }
}
