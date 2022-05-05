def query_artist(artist):
    command = (f"select * from albums where artist = '{artist}'")
    return command

# func for artist queries
def query_year(year):
    command = (f"select * from albums where album_year like '%{year}'")
    return command

# func for artist queries
def query_genre(genre):
    command = (f"select * from albums where album_genre = '{genre}'")
    return command

def init_index():
    command = (f"select * from albums")

    # command = (f"select record_label, album, artist, album_genre, substr(date, -4) date, meta_score, user_score from albums")
    return command
    
queries_dict = {
    "init_query": init_index(),
    "ar_query": query_artist,
    "yr_query": query_year,
    "ge_query": query_genre
    }