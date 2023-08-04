import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class MenuTitleItemComponent extends Component {
  @tracked title;
  @tracked route;
}
