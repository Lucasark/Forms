import React, { Component } from 'react'
import { register } from './UserFunctions'

class Register extends Component {
  constructor() {
    super()
    this.state = {
        nome: '',
        idade: '',
        registro: '',
        email: '',
        senha: '',
        Q1: '',
        Q2: '',
        Q3: '',
        Q4: '',
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

      const newUser = {
          nome: this.state.nome,
          idade: this.state.idade,
          registro: this.state.registro,
          email: this.state.email,
          senha: this.state.senha,
          Q1: this.state.Q1,
          Q2: this.state.Q2,
          Q3: this.state.Q3,
          Q4: this.state.Q4
    }

    register(newUser).then(res => {
      this.props.history.push(`/login`)
    })
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-5 mx-auto">
            <form noValidate onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Cadastro de perfil Albino</h1>
              <div className="form-group">
                <label htmlFor="name">Nome Albinista:</label>
                <input type="text" className="form-control" name="nome" placeholder="Nome"
                  value={this.state.nome}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="idade">Idade Albinista:</label>
                <input type="text" className="form-control" name="idade" placeholder="Idade"
                  value={this.state.idade}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registro">Registro de Albino:</label>
                <input type="text" className="form-control" name="registro" placeholder="Registro"
                  value={this.state.registro}
                  onChange={this.onChange}
                required/>
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Albiniano:</label>
                <input type="email" className="form-control" name="email" placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="senha">Senha para Albinos: </label>
                <input type="password" className="form-control" name="senha" placeholder="Password"
                  value={this.state.senha}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Q1">Desde Quando vc se considera albino?</label>
                <input type="date" className="form-control" name="Q1" placeholder="DD/MM/AAAA"
                  value={this.state.Q1}
                  onChange={this.onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Q2">Quantas vezes você cultua o albinos por semana?</label>
                <input type="text" className="form-control" name="Q2" placeholder="Diz aí!"
                  value={this.state.Q2}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Q3">Você se considera Albino?</label>
                  {/* MUITO ROLE PRA COLOCAR RADIO????? */}
                <input type="text" className="form-control" name="Q3" placeholder="Sim ou Não"
                  value={this.state.Q3}
                  onChange={this.onChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Q4">Em uma escala de 0 à 10, quanto você odeia os veganos?</label>
                <input type="range" className="form-control" name="Q4" max="10" min="0"
                  value={this.state.Q4}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block" >Cadastrar!</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Register