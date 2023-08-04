import { ResourceModel } from './resource-models';

export default class CompanyStoreRepository {
  constructor(store) {
    this.store = store;
  }

  async getAll() {
    return this.store
      .findAll(ResourceModel.COMPANY)
      .then((companies) => companies);
  }

  create(name, description, address) {
    if (name == '' || typeof name !== 'string') {
      throw {
        message: 'Please fill in the company name, cannot be empty',
      };
    }
    if (description == '' || typeof description !== 'string') {
      throw {
        message: 'Please fill in the company description, cannot be empty',
      };
    }
    if (address == '' || typeof address !== 'string') {
      throw {
        message: 'Please fill in the company address, cannot be empty',
      };
    }

    const newCompany = this.store.createRecord(ResourceModel.COMPANY, {
      name: name,
      description: description,
      address: address,
    });

    try {
      newCompany.save();
    } catch (error) {
      throw {
        message: `Something went wrong while creating a new company(${name})`,
      };
    }
  }

  updateProperties(companyId, companyName) {
    let company = this.store.peekRecord(ResourceModel.COMPANY, companyId);

    if (companyName != '') {
      company.name = companyName;
    }

    try {
      company.save();
      company.reload();
    } catch (error) {
      throw {
        message: `Something went wrong while updating company with id: ${companyId})`,
      };
    }
  }

  async addEmployeesToCompany(companyId, employees) {
    let company = this.store.peekRecord(ResourceModel.COMPANY, companyId);
    let companyEmployees = await company.employees;
    companyEmployees.push(...employees);

    try {
      company.save();
      company.reload();
    } catch (error) {
      throw {
        message: `Something went wrong while adding employees to company with id: ${companyId})`,
      };
    }

    // TEMP add the relation of company also to the employee so its two way
    for (const employee of employees) {
      let peekEmployee = this.store.peekRecord(
        ResourceModel.EMPLOYEE,
        employee.id
      );
      let employeeCompanies = await peekEmployee.companies;
      employeeCompanies.push(company);

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

  async addProjectsToCompany(companyId, projects) {
    let company = this.store.peekRecord(ResourceModel.COMPANY, companyId);
    let companyProjects = await company.projects;
    companyProjects.push(...projects);

    try {
      company.save();
      company.reload();
    } catch (error) {
      throw {
        message: `Something went wrong when adding projects to the company with id: ${companyId}.`,
      };
    }

    // // TEMP add the relation of company also to the project so its two way
    for (const project of projects) {
      let peekProject = this.store.peekRecord(
        ResourceModel.PROJECT,
        project.id
      );
      let projectCompanies = await peekProject.companies;
      projectCompanies.push(company);

      try {
        peekProject.save();
        peekProject.reload();
      } catch (error) {
        throw {
          message: `Something went wrong when adding company to the project with id: ${project.id}.`,
        };
      }
    }
    // // END TEMP
  }

  async getById(companyId) {
    return this.store
      .findRecord(ResourceModel.COMPANY, companyId)
      .then((company) => company);
  }

  async deleteById(companyId) {
    const company = this.store.peekRecord(ResourceModel.COMPANY, companyId);
    try {
      company.destroyRecord();
    } catch (error) {
      throw {
        message: `Something went wrong while deleting company with id: ${companyId}`,
      };
    }
  }

  async deleteAll() {
    const companies = await this.getAll();

    companies.forEach((company) => {
      company.destroyRecord();
    });
  }

  async removeEmployeeFromCompany(companyId, employeeId) {
    let peekCompany = this.store.peekRecord(ResourceModel.COMPANY, companyId);
    let employeesProxy = await peekCompany.employees;

    const employees = [...employeesProxy].filter((employee) => {
      return employee.id !== employeeId;
    });

    peekCompany.employees = employees;

    try {
      peekCompany.save();
    } catch (error) {
      throw {
        message: `Something went wrong while removing a relation between the company with id: ${companyId} and the relation to employee with id: ${employeeId}`,
      };
    }
  }

  async removeProjectFromCompany(companyId, projectId) {
    let peekCompany = this.store.peekRecord(ResourceModel.COMPANY, companyId);
    let projectsProxy = await peekCompany.projects;

    const projects = [...projectsProxy].filter((project) => {
      return project.id !== projectId;
    });

    peekCompany.projects = projects;

    try {
      peekCompany.save();
    } catch (error) {
      throw {
        message: `Something went wrong while removing a relation between the company with id: ${companyId} and the relation to project with id: ${projectId}`,
      };
    }
  }
}
