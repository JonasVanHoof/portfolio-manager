import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { ResourceModel } from '../helpers/resource-models';

export default class ProjectModel extends Model {
  @attr('string') name;
  @attr('string') description;
  @hasMany(ResourceModel.COMPANY, {
    async: true,
    inverse: 'projects',
  })
  companies;
  @hasMany(ResourceModel.EMPLOYEE, {
    async: true,
    inverse: 'projects',
  })
  employees;
}
