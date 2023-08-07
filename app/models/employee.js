import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { ResourceModel } from '../helpers/resource-models';

export default class EmployeeModel extends Model {
  @attr('string') givenName;
  @attr('string') familyName;
  @attr('string') email;
  @attr('string') bio;
  @attr('string') telephone;
  @attr('string') address;
  @attr('string') jobTitle;

  @hasMany(ResourceModel.COMPANY, {
    async: true,
    inverse: 'employees',
  })
  companies;
  @hasMany(ResourceModel.PROJECT, {
    async: true,
    inverse: 'employees',
  })
  projects;

  get fullName() {
    return `${this.givenName ?? ''} ${this.familyName ?? ''}`;
  }
}
