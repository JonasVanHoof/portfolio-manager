import ApplicationAdapter from './application';
import fetch from 'fetch';
export default class EmployeeAdapter extends ApplicationAdapter {
  async query(store, type, query) {
    // const myQuery = {
    //   query: {
    //     match_all: {
    //       'attributes.given-name': 'Jonas',
    //     },
    //   },
    // };
    // console.log(myQuery);

    // const found = await fetch('http:/localhost/search', {
    //   method: 'GET',
    //   body: JSON.stringify(myQuery),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // console.log({ found });
    const employees = await store.findAll('employee');

    
    const result = employees.filter((person) => {
      return person.givenName.includes('na');
    });

    // console.log(result[0]);
    return {
      data: [
        {
          type: 'employee',
          id: '64C2334E0447A80009000008',
          attributes: {
            'given-name': 'Jonas',
            'family-name': 'Van Hoof',
            uuid: '64C2334E0447A80009000008',
            uri: 'http://mu.semte.ch/application/portfolio-manager/employees/64C2334E0447A80009000008',
          },
        },
        {
          type: 'employee',
          id: '64C38D9CAB49BB0009000003',
          attributes: {
            'given-name': 'qwe',
            'family-name': 'wqe',
            uuid: '64C38D9CAB49BB0009000003',
            uri: 'http://mu.semte.ch/application/portfolio-manager/employees/64C38D9CAB49BB0009000003',
          },
        },
        {
          type: 'employee',
          id: '64C38D9CAB49BB0009000003',
          attributes: {
            'given-name': 'qwe',
            'family-name': 'wqe',
            uuid: '64C38D9CAB49BB0009000003',
            uri: 'http://mu.semte.ch/application/portfolio-manager/employees/64C38D9CAB49BB0009000003',
          },
        },
      ],
    };
  }
}
