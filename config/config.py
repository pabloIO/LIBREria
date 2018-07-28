from flask import Flask
import os

env = {
    'PORT'      : 5000,
    'HOST'      : '0.0.0.0',
    'APP_ENV'   : 'DEV',
    'APP_SECRET': 'libr0s_abiert0s',
    'APP'       : Flask(__name__, template_folder="public"),
    'SQL_CONF'  : {
        'DB_NAME'  : 'libreria',
        # 'DB_URI'   : 'mysql://root:arr0wf1r3@localhost/valkiria_chatbot_mysql'
        'DB_URI'   : str.format('sqlite:///{0}', os.path.abspath('database/libreria.db'))
    },
    'UPLOADS_DIR': os.path.abspath('local_data'),
    'ALLOWED_EXTENSIONS': set(['pdf', 'png', 'svg', 'gif', 'jpg', 'txt', 'doc', 'docx', 'odt']),
    'API_VERSION': '/api/v1'
}
