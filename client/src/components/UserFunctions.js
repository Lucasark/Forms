import axios from 'axios'

export const register = newUser => {
  return axios
    .post('users/register', {
        nome: newUser.nome,
        idade: newUser.idade,
        email: newUser.email,
        senha: newUser.senha,
        registro: newUser.registro,
        Q1: newUser.Q1,
        Q2: newUser.Q2,
        Q3: newUser.Q3,
        Q4: newUser.Q4
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      registro: user.registro,
      senha: user.senha
    })
    .then(response => {
      localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('users/profile', {
      //headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      console.log(response)
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}