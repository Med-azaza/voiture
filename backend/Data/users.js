import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Mabrouka kh',
    email: 'mabrouka@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'test kh',
    email:'test@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
