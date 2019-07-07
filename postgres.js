const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

function getToken(shop){
  return new Promise(function(resolve, reject) {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
    client.connect();
    var string = `SELECT * FROM shops WHERE shop = '${shop}';`
    client.query(string, (err, res) => {
      if (err) throw err;
      resolve(res.rows[0].access_token)
      client.end();
    });
  })
}

module.exports = {
  getToken: getToken
}