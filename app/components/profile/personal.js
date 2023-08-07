import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class PersonalComponent extends Component {
  @tracked givenName;
  @tracked familyName;
  @tracked email;
  @tracked telephone;
  @tracked bio;
}
