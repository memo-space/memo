export const Signup_Schema = {
  description: 'Signup User',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 10 },
      password: { type: 'string', minLength: 6, maxLength: 20 },
      email: { type: 'string', format: 'email' }
    },
    required: ['name', 'password', 'email']
  }
}

export const Login_Schema = {
  description: 'User Login',
  body: {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 2, maxLength: 10 },
      password: { type: 'string', minLength: 6, maxLength: 20 }
    },
  }
}