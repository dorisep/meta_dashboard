from flask import Flask, render_template, jsonify, redirect, url_for
import sqlite3
from data.basic_query_funcs import queries_dict
import datetime

app = Flask(__name__)

def db_conn():
    conn = None
    try:
        conn = sqlite3.connect('meta_music.db')
        conn.row_factory = sqlite3.Row    
    except sqlite3.Error as e:
        print(e)
    return conn


@app.route("/")
def index():
    return render_template("index1.html")
    

@app.route('/get_init_data')
def get_init_data():
    conn = db_conn()
    cur = conn.cursor()
    init_command = queries_dict["init_query"]
        # query db
    cur.execute(init_command)
    rows = cur.fetchall()
    init_data = [{k: row[k] for k in row.keys()} for row in rows]
    conn.close()
    return jsonify(init_data)
    
# @app.route('/scrape')  


# @app.route('/gimme/<truck>/<car>')
# def gimme(car, truck):
#     return car


if __name__ == "__main__":
    app.run(debug=True)
