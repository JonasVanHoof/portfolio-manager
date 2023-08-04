import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import EmployeeStoreRepository from '../helpers/employee-store-repository';
import Employee from '../Entity/employee';
import Email from '../Entity/email';

export default class EmployeesController extends Controller {
  @tracked firstName;
  @tracked lastName;
  @tracked email;
  @tracked bio;
  @tracked address;
  @tracked telephone;
  @tracked jobTitle;

  @tracked employeeFilterInput;
  @tracked employees;

  @service store;

  employeeStoreRepository = new EmployeeStoreRepository(this.store);

  showCreateEmployee = false;
  isExecutingAction = false;

  constructor() {
    super(...arguments);
    this.employeeStoreRepository.getAll().then((employees) => {
      this.allEmployees = employees;
      this.employees = this.allEmployees;
    });
  }

  @action
  createEmployee(event) {
    event.preventDefault();

    const employee = new Employee(
      this.firstName,
      this.lastName,
      new Email(this.email),
      this.bio,
      this.address,
      this.telephone,
      this.jobTitle
    );

    this.employeeStoreRepository.create(employee);

    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.bio = '';
    this.address = '';
    this.telephone = '';
    this.jobTitle = '';

    this.set('isCreateEmployeeDisabled', false);
    this.set('showCreateEmployee', false);
    this.set('isExecutingAction', false);
  }

  @action
  setShowCreateEmployee(state) {
    this.set('showCreateEmployee', state);
    this.set('isExecutingAction', state);
  }

  @action
  toggleIsExecuting() {
    this.toggleProperty('isExecutingAction');
    if (this.isExecutingAction == false) {
      this.set('showCreateEmployee', false);
    }
  }

  @action
  getFilteredEmployees() {
    if (!this.employeeFilterInput) {
      this.employees = this.allEmployees;

      return;
    }

    this.employees = this.allEmployees;
    this.employees = this.employees.filter((employee) => {
      const lowerCaseInputValue = this.employeeFilterInput.toLowerCase();
      const lowerCaseEmployeeFullName = employee.fullName.toLowerCase();

      return lowerCaseEmployeeFullName.includes(lowerCaseInputValue);
    });
  }
}
