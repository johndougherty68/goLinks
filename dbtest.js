const sql = require('mssql')

const config = {
    user: 'jeffersontmdb',
    password: 'jeffersonp@ssw0rd',
    server: 'jeffersontmdb.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'TMDB',

    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}

sql.connect(config).then(pool => {
    // Query

    return pool.request()
        .query('select top 15 * from logs')
}).then(result => {
    console.dir(result)

})

sql.on('error', err => {
    console.log(err);
})