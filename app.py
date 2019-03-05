from flask import Flask, jsonify, json, request, render_template
#from flask_mysqldb import MySQL
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
#from sqlalchemy import create_engine
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:0000@localhost/form'

app.config['JWT_SECRET_KEY'] = 'secret'

#mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)
db = SQLAlchemy(app)

class Formulario(db.Model):
    __tablename__ = 'formulario'
    idformulario = db.Column('idformulario', db.Integer, primary_key=True)
    nome = db.Column('nome', db.String(45))
    idade = db.Column('idade', db.Integer)
    registro = db.Column('registro', db.String(45))
    email = db.Column('email', db.String(45))
    senha = db.Column('senha', db.String(100))
    Q1 = db.Column('Q1', db.String(20))
    Q2 = db.Column('Q2', db.Integer)
    Q3 = db.Column('Q3', db.String(5))
    Q4 = db.Column('Q4', db.Integer)

    def __init__(self, nome, idade, registro, email, senha, Q1, Q2, Q3, Q4):
        print('DEBUG->CRUD')
        self.nome = nome
        self.idade = idade
        self.email = email
        self.registro = registro
        self.senha = senha
        self.Q1 = Q1
        self.Q2 = Q2
        self.Q3 = Q3
        self.Q4 = Q4

@app.route('/users/register', methods=['POST'])
def register():

    nome = request.get_json()['nome']
    idade = request.get_json()['idade']
    registro = request.get_json()['registro']
    email = request.get_json()['email']
    senha = bcrypt.generate_password_hash(request.get_json()['senha']).decode('utf-8')
    Q1 = request.get_json()['Q1']
    Q2 = request.get_json()['Q2']
    Q3 = request.get_json()['Q3']
    Q4 = request.get_json()['Q4']
    #modificado = datetime.utcnow()

    cursor = Formulario(nome, idade, registro, email, senha, Q1, Q2, Q3, Q4)
    db.session.add(cursor)
    db.session.commit()

    result = {
        "nome": nome,
        "email": email,
        "idade": idade,
        "registro": registro,
        "senha": senha,
        "Q1": Q1,
        "Q2": Q2,
        "Q3": Q3,
        "Q4": Q4
    }

    return jsonify({"result": result})


@app.route('/users/login', methods=['POST'])
def login():
    registro = request.get_json()['registro']
    senha = request.get_json()['senha']
    result = ""

    #SELECT * FROM form WHERE user.registro = resgistro
    user = Formulario.query.filter_by(registro=registro).first()
    if bcrypt.check_password_hash(user.senha, senha):
        access_token = create_access_token(
            identity={'nome': user.nome,
                      'idade': user.idade,
                      'registro': user.registro,
                      'email': user.email,
                      'Q1': user.Q1,
                      'Q2': user.Q2,
                      'Q3': user.Q3,
                      'Q4': user.Q4}
        )
        result = access_token

    else:
        result = jsonify({"error": "Usuario nao identificado"})

    return result

if __name__ == '__main__':
    app.run()
