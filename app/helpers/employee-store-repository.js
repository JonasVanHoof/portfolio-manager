import Employee from '../Entity/employee';
import { ResourceModel } from './resource-models';

export default class EmployeeStoreRepository {
  constructor(store) {
    this.store = store;
  }

  async getAll() {
    return this.store
      .findAll(ResourceModel.EMPLOYEE)
      .then((employees) => employees);
  }

  create(employee) {
    if (employee instanceof Employee) {
      const newEmployee = this.store.createRecord(ResourceModel.EMPLOYEE, {
        givenName: employee.givenName,
        familyName: employee.familyName,
        email: employee.email.toString(),
        bio: employee.bio,
        telephone: employee.telephone,
        address: employee.address,
        jobTitle: employee.jobTitle,
      });

      try {
        newEmployee.save();
      } catch (error) {
        throw {
          message: `Something went wrong while creating a new employee(${givenName} ${familyName})`,
        };
      }
    } else {
      throw {
        message: 'employee should be of class Employee',
      };
    }
  }

  updateProperties(employeeId, givenName, familyName, email) {
    let employee = this.store.peekRecord(ResourceModel.EMPLOYEE, employeeId);

    if (givenName != '') {
      employee.givenName = givenName;
    }

    if (familyName != '') {
      employee.familyName = familyName;
    }

    if (email != '') {
      employee.email = email;
    }

    try {
      employee.save();
      employee.reload();
    } catch (error) {
      throw {
        message: `Something went wrong while updating employee with id: ${employeeId})`,
      };
    }
  }

  async getById(employeeId) {
    return this.store
      .findRecord(ResourceModel.EMPLOYEE, employeeId)
      .then((employee) => employee);
  }

  async deleteAll() {
    const employees = await this.getAll();

    employees.forEach((employee) => {
      employee.destroyRecord();
    });
  }

  async addProjectsToEmployee(employeeId, projects) {
    let employee = this.store.peekRecord(ResourceModel.EMPLOYEE, employeeId);
    let employeeProjects = await employee.projects;
    employeeProjects.push(...projects);

    try {
      employee.save();
      employee.reload();
    } catch (error) {
      throw {
        message: `Something went wrong when adding projects to the employee with id: ${employeeId}.`,
      };
    }

    // // // TEMP add the relation of company also to the project so its two way
    for (const project of projects) {
      let peekProject = this.store.peekRecord(
        ResourceModel.PROJECT,
        project.id
      );
      let projectEmployees = await peekProject.employees;
      projectEmployees.push(employee);

      try {
        peekProject.save();
        peekProject.reload();
      } catch (error) {
        throw {
          message: `Something went wrong when adding employee to the project with id: ${project.id}.`,
        };
      }
    }
    // // // END TEMP
  }
  async addCompaniesToEmployee(employeeId, companies) {
    let employee = this.store.peekRecord(ResourceModel.EMPLOYEE, employeeId);
    let employeeCompanies = await employee.companies;
    employeeCompanies.push(...companies);

    try {
      employee.save();
      employee.reload();
    } catch (error) {
      throw {
        message: `Something went wrong when adding companies to the employee with id: ${employeeId}.`,
      };
    }

    // // // TEMP add the relation of company also to the project so its two way
    for (const company of companies) {
      let peekCompany = this.store.peekRecord(
        ResourceModel.COMPANY,
        company.id
      );
      let companyEmployees = await peekCompany.employees;
      companyEmployees.push(employee);

      try {
        peekCompany.save();
        peekCompany.reload();
      } catch (error) {
        throw {
          message: `Something went wrong when adding employee to the company with id: ${company.id}.`,
        };
      }
    }
    // // // END TEMP
  }

  async deleteById(employeeId) {
    const employee = this.store.peekRecord(ResourceModel.EMPLOYEE, employeeId);
    try {
      employee.destroyRecord();
    } catch (error) {
      throw {
        message: `Something went wrong while deleting employee with id: ${employeeId}`,
      };
    }
  }
}
