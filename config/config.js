
module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://usuario1:123456a@ds119374.mlab.com:19374/red_social',
    dbName:'red_social',
    SECRET_TOKEN:'miclavedetokens'
}
    
