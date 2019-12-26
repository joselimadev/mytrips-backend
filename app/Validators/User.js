class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      email: 'email|required',
      password: 'required',
      birthdate: 'required',
      mobile_number: 'required',
    };
  }
}

module.exports = User;
