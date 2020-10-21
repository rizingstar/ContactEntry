const { AsyncNedb } = require('nedb-async')

var db = new AsyncNedb({ filename: './database/contact.db', autoload: true });


export default db;
