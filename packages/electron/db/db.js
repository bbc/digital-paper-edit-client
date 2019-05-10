// https://www.npmjs.com/package/electron-sqlite3
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database(':memory:');
// const db = new sqlite3.Database('./development.sqlite3');


// db.serialize(function() {
//     db.run("CREATE TABLE lorem (info TEXT)");
   
//     var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (var i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize();
   
//     db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
//         console.log(row.id + ": " + row.info);
//     });
//   });
   
//   db.close();

const DB = {};

DB.getProjects = ()=>{
    new Promise((resolve, reject) => {
          resolve({projects:[{
            id: 1,
            title: 'Project title TEST',
            description: 'Project one description'
        }]});
          reject(false);
    });

}

DB.test =()=> {
  console.log('db');
}

// export default DB;
module.exports = DB;