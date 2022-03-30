var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQLite database.')
        db.run(`CREATE TABLE funcionario (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome text, 
            login text UNIQUE, 
            password text, 
            CONSTRAINT login_unique UNIQUE (login)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                // Table just created, creating some rows
                var insert = 'INSERT INTO funcionario (nome, login, password) VALUES (?,?,?)'
                db.run(insert, ["funcionario teste","func1",md5("func11234")])
            }
        });  
    }
});


module.exports = db