import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class InformationComponent extends Component {
  @tracked name;
  @tracked description;
}
