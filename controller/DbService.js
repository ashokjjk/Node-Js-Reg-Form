const mgClnt = require('mongodb').MongoClient

var dbUrl = "mongodb://localhost:27017/"

function storeData(name, email, password, confrim) {
    mgClnt.connect(dbUrl, function (err, db) {
        if (err) throw err;
        var dbo = db.db('NodeJs');
        var myObj = { "name": name, "email": email, "pwd": password, "confirm_pwd": confrim };
        dbo.collection("RegData").insertOne(myObj, function (err, res) {
            if (err) throw err;

        })       
        db.close;        
    })
    return "Successfuly signed up";
}
authenticate(1,2)
function authenticate(id,pwd){
    mgClnt.connect(dbUrl,function(err, db){
        if(err) throw err;
        var dbo=db.db('NodeJS')
        dbo.collection("RegData").find().toArray(function(err, result){
            if (err) throw err;
            console.log(result);
        })
    })
}



module.exports.register = storeData;
module.exports.auth = authenticate;