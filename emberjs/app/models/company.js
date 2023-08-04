import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { ResourceModel } from '../helpers/resource-models';

export default class CompanyModel extends Model {
  @attr('string') name;
  @attr('string') description;
  @attr('string') address;

  @hasMany(ResourceModel.EMPLOYEE, {
    async: true,
    inverse: 'companies',
  })
  employees;
  @hasMany(ResourceModel.PROJECT, {
    async: true,
    inverse: 'companies',
  })
  projects;
}
