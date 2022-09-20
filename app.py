from flask import Flask, render_template, jsonify, redirect, url_for
from flask_caching import Cache
import sqlite3
from data.basic_query_funcs import queries_dict
import datetime

config = {
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
}

app = Flask(__name__)
app.config.from_mapping(config)
cache = Cache(app)
def db_conn():
    conn = None
    try:
        conn = sqlite3.connect("meta_music.db")
        conn.row_factory = sqlite3.Row    
    except sqlite3.Error as e:
        print(e)
    return conn


@app.route("/")
def index():
    return render_template("index.html")
    

@app.route('/get_init_data')
def get_init_data():
    conn = db_conn()
    cur = conn.cursor()
    init_command = queries_dict["init_query"]
        # query db
    cur.execute(init_command)
    rows = cur.fetchall()
    data = [{k: row[k] for k in row.keys()} for row in rows]
    conn.close()
    print(data[0])
    return jsonify(data)
 
if __name__ == "__main__":
    app.run()