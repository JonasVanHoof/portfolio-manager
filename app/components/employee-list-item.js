import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import EmployeeStoreRepository from '../helpers/employee-store-repository';

export default class EmployeeListItemComponent extends Component {
  @tracked employee;
  @tracked updatedGivenName;
  @tracked updatedFamilyName;

  @service store;
  employeeStoreService = new EmployeeStoreRepository(this.store);

  @action
  editEmployee(employee) {
    this.employeeStoreService.updateEmployee(
      employee.id,
      this.updatedGivenName,
      this.updatedFamilyName
    );
  }
}
