import { ResourceModel } from './resource-models';

export default class ProjectStoreRepository {
  constructor(store) {
    this.store = store;
  }

  async getAll() {
    const projects = await this.store.findAll(ResourceModel.PROJECT);

    return projects;
  }

  create(projectName, description) {
    if (projectName == '' || typeof projectName !== 'string') {
      throw {
        message: 'Please fill in the project name, cannot be empty',
      };
    }

    if (description == '' || typeof description !== 'string') {
      throw {
        message: 'Please fill in the description, cannot be empty',
      };
    }

    const newProject = this.store.createRecord(ResourceModel.PROJECT, {
      name: projectName,
      description: description,
    });

    try {
      newProject.save();
    } catch (error) {
      throw {
        message: `Something went wrong while creating a new project(${projectName})`,
      };
    }
  }

  updateProperties(projectId, projectName, description) {
    let project = this.store.peekRecord(ResourceModel.PROJECT, projectId);

    if (projectName != '') {
      project.name = projectName;
    }

    if (description != '') {
      project.description = description;
    }

    try {
      project.save();
      project.reload();
    } catch (error) {
      throw {
        message: `Something went wrong while updating project with id: ${projectId})`,
      };
    }
  }

  async getById(id) {
    return this.store
      .findRecord(ResourceModel.PROJECT, id)
      .then((project) => project);
  }

  async deleteAll() {
    const projects = await this.getAll();

    projects.forEach((project) => {
      project.destroyRecord();
    });
  }

  async deleteById(projectId) {
    const project = this.store.peekRecord(ResourceModel.PROJECT, projectId);
    try {
      project.destroyRecord();
    } catch (error) {
      throw {
        message: `Something went wrong while deleting project with id: ${projectId}`,
      };
    }
  }

  async addCompaniesToProject(projectId, companies) {
    let project = this.store.peekRecord(ResourceModel.PROJECT, projectId);
    let projectCompanies = await project.companies;
    projectCompanies.push(...companies);

    try {
      project.save();
      project.reload();
    } catch (error) {
      throw {
        message: `Something went wrong when adding companies to the project with id: ${projectId}.`,
      };
    }

    // // // TEMP add the relation of company also to the project so its two way
    for (const company of companies) {
      let peekCompany = this.store.peekRecord(
        ResourceModel.COMPANY,
        company.id
      );
      let companyProjects = await peekCompany.projects;
      companyProjects.push(project);

      try {
        peekCompany.save();
        peekCompany.reload();
      } catch (error) {
        throw {
          message: `Something went wrong when adding project to the company with id: ${project.id}.`,
        };
      }
    }
    // // // END TEMP
  }

  async addEmployeesToProject(projectId, employees) {
    let project = this.store.peekRecord(ResourceModel.PROJECT, projectId);
    let projectEmployees = await project.employees;
    projectEmployees.push(...employees);

    try {
      project.save();
      project.reload();
    } catch (error) {
      throw {
        message: `Something went wrong while adding employees to project with id: ${projectId})`,
      };
    }

    // TEMP add the relation of company also to the employee so its two way
    for (const employee of employees) {
      let peekEmployee = this.store.peekRecord(
        ResourceModel.EMPLOYEE,
        employee.id
      );
      let employeeProjects = await peekEmployee.projects;
      employeeProjects.push(project);

      try {
        peekEmployee.save();
        peekEmployee.reload();
      } catch (error) {
        throw {
          message: `Something went wrong while adding companies to employee with id: ${employee.id})`,
        };
      }
    }
    // END TEMP
  }

  async removeEmployeeFromProject(projectId, employeeId) {
    let peekProject = this.store.peekRecord(ResourceModel.PROJECT, projectId);
    let employeesProxy = await peekProject.employees;

    const employees = [...employeesProxy].filter((employee) => {
      return employee.id !== employeeId;
    });

    peekProject.employees = employees;

    try {
      peekProject.save();
    } catch (error) {
      throw {
        message: `Something went wrong while removing a relation between the project with id: ${projectId} and the relation to employee with id: ${employeeId}`,
      };
    }
  }
}
