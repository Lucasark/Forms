import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      nome: '',
      registro: '',
      idade: '',
      email: '',
      Q1: '',
      Q2: '',
      Q3: '',
      Q4: '',
      errors: {}
    }
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token)
    this.setState({
      nome: decoded.identity.nome,
      registro: decoded.identity.registro,
      idade: decoded.identity.idade,
      email: decoded.identity.email,
      Q1: decoded.identity.Q1,
      Q2: decoded.identity.Q2,
      Q3: decoded.identity.Q3,
      Q4: decoded.identity.Q4
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">Dados Cadastrados</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            <tbody>
              <tr>
                <td>Nome</td>
                <td>{this.state.nome}</td>
              </tr>
              <tr>
                <td>Registro</td>
                <td>{this.state.registro}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Idade</td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>Você é albino desde:</td>
                <td>{this.state.Q1}</td>
              </tr>
              <tr>
                <td>Frenquencia do culto Albinista:</td>
                <td>{this.state.Q2}</td>
              </tr>
              <tr>
                <td>Você se declara Albino?</td>
                <td>{this.state.Q3}</td>
              </tr>
              <tr>
                <td>Odio vegano em uma escala de 0 à 10:</td>
                <td>{this.state.Q4}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile