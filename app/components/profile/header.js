import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class HeaderComponent extends Component {
  @tracked fullName;
  @tracked jobTitle;
}
