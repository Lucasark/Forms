from flask import Flask, jsonify, json, request, render_template
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import (create_access_token)

app = Flask(__name__)
#app.run(debug=True)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '0000'
app.config['MYSQL_DB'] = 'form'
#app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)


@app.route('/users/register', methods=['POST'])
def register():

    cur = mysql.connection.cursor()
    nome = request.get_json()['nome']
    idade = request.get_json()['idade']
    registro = request.get_json()['registro']
    email = request.get_json()['email']
    senha = bcrypt.generate_password_hash(request.get_json()['senha']).decode('utf-8')
    Q1 = request.get_json()['Q1']
    Q2 = request.get_json()['Q2']
    Q3 = request.get_json()['Q3']
    Q4 = request.get_json()['Q4']

    #DEBUG
    #Q1 = 0
    #Q2 = 0
    #Q3 = 0
    #Q4 = 0

    #modificado = datetime.utcnow()

    cur.execute("INSERT INTO formulario(nome, idade, registro, email, senha, Q1, Q2, Q3, Q4) VALUES('" +
                str(nome) + "','" +
                idade + "','" +
                str(registro) + "','" +
                str(email) + "','" +
                str(senha) + "','" +
                Q1 + "','" +
                Q2 + "','" +
                Q3 + "','" +
                Q4 + "')")

    mysql.connection.commit()

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
    cur = mysql.connection.cursor()
    registro = request.get_json()['registro']
    senha = request.get_json()['senha']
    result = ""

    cur.execute("SELECT * FROM formulario where registro = '" + str(registro) + "'")
    rv = cur.fetchone()

    if bcrypt.check_password_hash(rv['senha'], senha):
        access_token = create_access_token(
            identity={'nome': rv['nome'],
                      'idade': rv['idade'],
                      'registro': rv['registro'],
                      'email': rv['email'],
                      'Q1': rv['Q1'],
                      'Q2': rv['Q2'],
                      'Q3': rv['Q3'],
                      'Q4': rv['Q4']}
        )
        result = access_token

    else:
        result = jsonify({"error": "Usuario nao identificado"})

    return result

if __name__ == '__main__':
    app.run()
