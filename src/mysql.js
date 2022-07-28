//Mysql connection
const mysql = require('mysql')
const { promisify } = require('util')
const { db } = require('./keys')

const pool =  mysql.createPool(db)

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('DATABASE WAS DOWN')
        } 
        if (err.code === 'ER_CON_COUNT_ERRO') {
            console.error('DATABASE HAS TO MANY CONNECTIONS') 
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('DATABASE ECONNREFUSED')
        }
    }
    if (connection) connection.release()
    console.log('Connected')
    return
})

//promisify pool query
pool.query = promisify(pool.query)

module.exports = pool