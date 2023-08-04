import Route from '@ember/routing/route';
import { service } from '@ember/service';
import ProjectStoreRepository from '../helpers/project-store-repository';

export default class ProjectsRoute extends Route {
  @service store;

  projectStoreService = new ProjectStoreRepository(this.store);

  async model() {
    let projectsList = await this.projectStoreService.getAll();

    return {
      title: 'Projects',
      projectNameInputLabel: 'Name',
      descriptionInputLabel: 'Description',
      actionBarLabels: {
        NEW: 'New',
        CANCEL: 'Cancel',
        CREATE: 'Create',
      },
      projectsList: projectsList,
    };
  }
}
