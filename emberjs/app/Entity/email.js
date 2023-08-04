export default class Email {
  constructor(email) {
    if (email == '') {
      throw {
        message: 'Email cannot be empty',
      };
    }

    if (!email.includes('@')) {
      throw {
        message: `Email ${email} is not a valid email because it does not contain the '@' symbol`,
      };
    }

    this.email = email;
  }

  toString() {
    return this.email;
  }
}
