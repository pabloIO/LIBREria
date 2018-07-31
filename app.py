from flask import Flask, render_template, request, Response
from flask_cors import CORS, cross_origin
from config.config import env
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__, template_folder="public")
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = env['APP_SECRET']
app.config['UPLOAD_FOLDER'] = env['UPLOADS_DIR']
## DATABASE CONFIG AND INSTANTIATION
app.config['SQLALCHEMY_DATABASE_URI'] = env['SQL_CONF']['DB_URI']
db = SQLAlchemy(app)

cors = CORS(app, resources={r"/login": {"origins": "http://localhost:3000"}})

from controllers import libros_ctrl

@app.route("/")
def main():
    return render_template('index.html')

@app.route("/acerca")
def about():
    return render_template('about.html')

@app.route("/licencias")
def licencias():
    return render_template('licencias.html')

## CREAR ESTAS DOS PAGINAS
@app.route("/libro-exito")
def upload_success():
    return render_template('libro-exito.html')

@app.route("/libro-error")
def upload_fail():
    return render_template('libro-error.html')
##
@app.route(env['API_VERSION'] + "/libros/page/<page_num>", methods=['GET'])
def books(page_num):
    return libros_ctrl.LibrosCtrl.all(page_num, db, Response)

@app.route(env['API_VERSION'] + "/libros/search/<criteria>", methods=['GET'])
def books_search(criteria):
    return libros_ctrl.LibrosCtrl.searchBook(criteria, db, Response)

@app.route(env['API_VERSION'] + "/libros/<book_id>", methods=['GET'])
def book(book_id):
    return libros_ctrl.LibrosCtrl.getBook(book_id, db, Response)

@app.route(env['API_VERSION'] + "/libro/upload", methods=['POST', 'GET'])
def upload_book():
    return libros_ctrl.LibrosCtrl.uploadBook(db, request, Response)


# @app.route("/chat_room")
# def chat_room():
#     return render_template('chatRoom.html')
#
# @app.route("/login", methods=['POST'])
# @cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
# def login():
#     return login_ctrl.LoginCtrl.login(db, request.form, Response)
#
# @app.route('/user/<user_id>/conversation')
# def show_user_conversation(user_id):
#     return chat_ctrl.ChatCtrl.getConversation(user_id, db, Response)
#
# @app.route('/user/<user_id>/conversation/user-text')
# def show_conversation_text(user_id):
#     return chat_ctrl.ChatCtrl.getConversationText(user_id, db, Response)

if __name__ == '__main__':
    print(str.format('CONECTADO EN PUERTO {0}', env['PORT']))
    app.run(host=env['HOST'], port=env['PORT'], debug=True, threaded=True)
