import Component from '@glimmer/component';

export default class ProjectsComponent extends Component {
  get projects() {
    return this.args.projects;
  }
}
