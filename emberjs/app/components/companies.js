import Component from '@glimmer/component';

export default class CompaniesComponent extends Component {
  get companies() {
    return this.args.companies;
  }

  get isEditing() {
    return this.args.isEditing;
  }
}
