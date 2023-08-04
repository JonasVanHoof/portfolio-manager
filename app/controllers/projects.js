import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import ProjectStoreRepository from '../helpers/project-store-repository';

export default class ProjectsController extends Controller {
  @tracked name;
  @tracked description;

  @service store;

  projectStoreRepository = new ProjectStoreRepository(this.store);

  isCreateProjectDisabled = false;
  showCreateProject = false;

  @action
  createProject(event) {
    event.preventDefault();

    this.projectStoreRepository.create(this.name, this.description);

    this.name = '';
    this.description = '';

    this.set('isCreateProjectDisabled', false);
    this.set('showCreateProject', false);
  }

  @action
  setShowCreateCompany(state) {
    this.set('isCreateProjectDisabled', state);
    this.set('showCreateProject', state);
  }
}
