from flask import Flask, jsonify, json, request, render_template
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_jwt_extended import JWTManager

app = Flask(__name__)
#app.run(debug=True)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '0000'
app.config['MYSQL_DB'] = 'form'
#app.config['MYSQL_HOST'] = 'localhost'
#app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
jwt = JWTManager(app)
CORS(app)


@app.route('/')
def init():

    #return (str(cur.fetchall()))
    return render_template('index.html')

@app.route('/data', methods=['POST'])
def register():

    cur = mysql.connection.cursor()
    nome = request.get_json()['nome']
    criado = datetime.utcnow()

    cur.execute("INSERT INTO formulario(nome, data) VALUES('" + str(nome) + "','" + str(criado) + "')")

    mysql.connection.commit()
    result = {
        "nome": nome,
        "created": criado
    }


    return jsonify({"result": result})

if __name__ == '__main__':
    app.run()
