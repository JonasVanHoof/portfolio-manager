import Component from '@glimmer/component';

export default class EmployeesComponent extends Component {
  get employees() {
    return this.args.employees;
  }

  get isEditing() {
    return this.args.isEditing;
  }
}
