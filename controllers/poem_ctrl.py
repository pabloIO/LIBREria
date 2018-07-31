import string, random, json, sys, os.path, uuid
sys.path.append(
    os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir)))
# from models import sesion
import models.models as database
from sqlalchemy.exc import IntegrityError
from sqlalchemy.sql.functions import func
import uuid
from config.config import env
from werkzeug.utils import secure_filename
from flask import flash, redirect, url_for, jsonify


class PoemCtrl(object):
    @staticmethod
    def all(page_num, db, response):
        try:
            res = {
                'success': False,
            }
            total = database.Libro.query.filter(database.Libro.activo == 1)
            books = database.Libro.query.filter(database.Libro.activo == 1).paginate(page=int(page_num), per_page=24).items
            if books == None:
                res['books'] = []
            else:
                # print(books.comentarios)
                serialized = [ { 'id': i.id,
                                'name': i.nombre_libro,
                                'file': i.nombre_archivo,
                                'author': i.autor,
                                'likes': i.likes,
                                'licencia': i.licencia,
                                'image': i.imagen } for i in books ]
                res['books'] = serialized
            res['success'] = True
            res['total'] = get_count(total)
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
    def searchBook(query_p, db, response):
        try:
            res = {
                'success': False,
            }
            books = database.Libro.query.filter(
                    database.Libro.autor.like('%{}%'.format(query_p)) |
                    database.Libro.nombre_libro.like('%{}%'.format(query_p))
                    ).all()
            if books == None:
                res['books'] = []
            else:
                # print(books.comentarios)
                serialized = [ { 'id': i.id,
                                'name': i.nombre_libro,
                                'file': i.nombre_archivo,
                                'author': i.autor,
                                'likes': i.likes,
                                'licencia': i.licencia,
                                'image': i.imagen } for i in books ]
                res['books'] = serialized

            res['success'] = True
        except Exception as e:
            print(e)
            # db.session.rollback()
            res['msg'] = 'Hubo un error al cargar el libro, inténtelo nuevamente'
        finally:
            return response(json.dumps(res), mimetype='application/json')

    @staticmethod
    def uploadBook(db, request, response):
        print(request.form)
        print(request.files)
        # return
        try:
            if request.method == 'POST':
                if 'filebook' not in request.files and 'fileimg' not in request.files:
                    flash('No existe el archivo')
                    return redirect(request.url)
                bookfile = request.files['filebook']
                imgfile = request.files['fileimg']
                if bookfile.filename == '' and imgfile == '':
                    flash('No se selecciono un archivo')
                    return redirect(request.url)
                if (bookfile and allowed_file(bookfile.filename, 'book')) and (imgfile and allowed_file(imgfile.filename, 'img')):
                    bookfilename = uuid.uuid4().hex + secure_filename(bookfile.filename)
                    imgfilename = uuid.uuid4().hex + secure_filename(imgfile.filename)
                    # print(filename)
                    newBook = database.Libro(
                        nombre_libro=request.form['book'],
                        genero=request.form['genre'],
                        autor=request.form['author'],
                        idioma=request.form['language'],
                        licencia=request.form['licence'],
                        nombre_archivo=bookfilename,
                        imagen=imgfilename,
                    )
                    bookfile.save(os.path.join(env['UPLOADS_DIR'] + '/books', bookfilename))
                    imgfile.save(os.path.join(env['UPLOADS_DIR'] + '/images', imgfilename))
                    # return redirect(url_for('uploaded_file',
                    #                         filename=filename))
                    db.session.add(newBook)
                    db.session.commit()
                    # flash('Su archivo se subio con exito')
                    flash('Libro subido con éxito')
                    # redirigir a una pagina que mencione que el libro se subio con exito
                    return redirect(url_for('upload_success'))
            else:
                flash('Libro subido con éxito')
                return redirect(url_for('upload_success'))
        except Exception as e:
            print(e)
            db.session.rollback()
            flash('Hubo un error al cargar el archivo')
            # redirigir a una pagina que mencione que el libro no se subio con exito
            return redirect(url_for('upload_fail'))
