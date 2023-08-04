import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { ResourceModel } from '../helpers/resource-models';
import { inject as service } from '@ember/service';

export default class ProjectListItemComponent extends Component {
  @tracked project;
  @service store;

  @action
  getCompanyNames(projectId) {
    const project = this.store.peekRecord(ResourceModel.PROJECT, projectId);
    const companies = project.companies;
    console.log(companies.map((company) => company.name));

    return companies.map((company) => company.name);
  }
}
