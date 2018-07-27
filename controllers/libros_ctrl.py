import string, random, json, sys, os.path, uuid
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
# from models import sesion
import models.models as database
from sqlalchemy.exc import IntegrityError
import uuid
from config.config import env
from werkzeug.utils import secure_filename
from flask import flash, redirect, url_for, jsonify

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in env['ALLOWED_EXTENSIONS']

def id_generator(size=150, chars=string.ascii_uppercase + string.digits):
    return ''.join(random.choice(chars) for _ in range(size))


class LibrosCtrl(object):
    @staticmethod
    def all(db, response):
        try:
            res = {
                'success': False,
            }
            books = database.Libro.query.all()
            if books == None:
                res['books'] = []
            else:
                # print(books.comentarios)
                serialized = [ { 'id': i.id,
                                'name': i.nombre_libro,
                                'file': i.nombre_archivo,
                                'author': i.autor,
                                'likes': i.likes,
                                'image': i.imagen } for i in books ]
                res['books'] = serialized
            res['success'] = True
        except Exception as e:
            print(e)
            # db.session.rollback()
            res['msg'] = 'Hubo un error al obtener los libros, inténtelo nuevamente'
        finally:
            return response(json.dumps(res), mimetype='application/json')

    @staticmethod
    def getBook(book_id, db, response):
        try:
            res = {
                'success': False,
            }
            book = database.Libro.query.get(book_id)
            res['success'] = True
            res['book'] = book
        except Exception as e:
            print(e)
            # db.session.rollback()
            res['msg'] = 'Hubo un error al cargar el libro, inténtelo nuevamente'
        finally:
            return response(json.dumps(res), mimetype='application/json')

    @staticmethod
    def uploadBook(db, request, response):
        try:
            if request.method == 'POST':
                if 'file' not in request.files:
                    flash('No existe el archivo')
                    return redirect(request.url)
                file = request.files['file']
                if file.filename == '':
                    flash('No se selecciono un archivo')
                    return redirect(request.url)
                if file and allowed_file(file.filename):
                    filename = uuid.uuid4().hex + secure_filename(file.filename)
                    print(filename)
                    newBook = database.Libro(
                        nombre_libro=request.form['book_name'],
                        autor=request.form['author'],
                        nombre_archivo=filename,
                    )

                    file.save(os.path.join(env['UPLOADS_DIR'] + '/books', filename))
                    # return redirect(url_for('uploaded_file',
                    #                         filename=filename))
                    db.session.add(newBook)
                    db.session.commit()
                    # flash('Su archivo se subio con exito')
                    return redirect(request.url)
        except Exception as e:
            print(e)
            db.session.rollback()
            flash('Hubo un error al cargar el archivo')
            return redirect(request.url)
