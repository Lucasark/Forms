import React, { Component } from 'react'
import { login } from './UserFunctions'

class Login extends Component {
  constructor() {
    super()
      this.state = {
      registro: '',
      senha: '',
      errors: {}
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(e) {
    e.preventDefault()

    const user = {
      registro: this.state.registro,
      senha: this.state.senha
    }

    login(user).then(res => {
      if (!res.error) {
        this.props.history.push(`/profile`)
      }
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Entrar no seu cadastro</h1>
              <div className="form-group">
                <label htmlFor="registro">Registro</label>
                <input
                  className="form-control"
                  name="registro"
                  placeholder="Registro"
                  value={this.state.registro}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="senha">Senha</label>
                <input
                  type="password"
                  className="form-control"
                  name="senha"
                  placeholder="Senha"
                  value={this.state.senha}
                  onChange={this.onChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-lg btn-primary btn-block"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login