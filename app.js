var express = require ("express");
var mongoose = require ("mongoose");
var request = require ("request");
var app = express();
var aData = null;


mongoose.connect("mongodb://localhost/BANCA");
var db = mongoose.connection;
var Document = null;
db.on("error", console.error.bind(console,"Connection error:"));
db.once('open',function(callback){

	var SAN_schema = mongoose.Schema({
	fecha: String,
	abierto: Number,
	alto: Number,
	bajo: Number,
	cierre: Number,
	});
	Document = mongoose.model('Document', SAN_schema);

	var urlSantander = "https://www.quandl.com/api/v3/datasets/YAHOO/MC_SAN.json?api_key=HGoTu3E3A_Lsv6biw1kc";
	request({
		url: urlSantander,
		json: true
	}, function (error, response, body){

		if (!error && response.statusCode == 200){
		var parseo = body.dataset.data;
		//console.log(parseo)
		var jsonString=[];
		/*var jsonDato={};
			for(var i = 0 ; i < 10; i++){
				jsonDato.fecha = String(parseo[i][0]);
				jsonDato.abierto = parseFloat(parseo[i][1]);
				jsonDato.alto = parseFloat(parseo[i][2]);
				jsonDato.bajo = parseFloat(parseo[i][3]);
				jsonDato.cierre = parseFloat(parseo[i][4]);
				jsonString.push(jsonDato);
			}*/
		
			var jsonDato00={};
			jsonDato00.fecha = String(parseo[0][0]);
			jsonDato00.abierto = parseFloat(parseo[0][1]);
			jsonDato00.alto = parseFloat(parseo[0][2]);
			jsonDato00.bajo = parseFloat(parseo[0][3]);
			jsonDato00.cierre = parseFloat(parseo[0][4]);
			jsonString.push(jsonDato00);
			var jsonDato01={};
			jsonDato01.fecha = String(parseo[1][0]);
			jsonDato01.abierto = parseFloat(parseo[1][1]);
			jsonDato01.alto = parseFloat(parseo[1][2]);
			jsonDato01.bajo = parseFloat(parseo[1][3]);
			jsonDato01.cierre = parseFloat(parseo[1][4]);
			jsonString.push(jsonDato01);
			var jsonDato02={};
			jsonDato02.fecha = String(parseo[2][0]);
			jsonDato02.abierto = parseFloat(parseo[2][1]);
			jsonDato02.alto = parseFloat(parseo[2][2]);
			jsonDato02.bajo = parseFloat(parseo[2][3]);
			jsonDato02.cierre = parseFloat(parseo[2][4]);
			jsonString.push(jsonDato02);
			var jsonDato03={};
			jsonDato03.fecha = String(parseo[3][0]);
			jsonDato03.abierto = parseFloat(parseo[3][1]);
			jsonDato03.alto = parseFloat(parseo[3][2]);
			jsonDato03.bajo = parseFloat(parseo[3][3]);
			jsonDato03.cierre = parseFloat(parseo[3][4]);
			jsonString.push(jsonDato03);
			var jsonDato04={};
			jsonDato04.fecha = String(parseo[4][0]);
			jsonDato04.abierto = parseFloat(parseo[4][1]);
			jsonDato04.alto = parseFloat(parseo[4][2]);
			jsonDato04.bajo = parseFloat(parseo[4][3]);
			jsonDato04.cierre = parseFloat(parseo[4][4]);
			jsonString.push(jsonDato04);
			var jsonDato05={};
			jsonDato05.fecha = String(parseo[5][0]);
			jsonDato05.abierto = parseFloat(parseo[5][1]);
			jsonDato05.alto = parseFloat(parseo[5][2]);
			jsonDato05.bajo = parseFloat(parseo[5][3]);
			jsonDato05.cierre = parseFloat(parseo[5][4]);
			jsonString.push(jsonDato05);
			var jsonDato06={};
			jsonDato06.fecha = String(parseo[6][0]);
			jsonDato06.abierto = parseFloat(parseo[6][1]);
			jsonDato06.alto = parseFloat(parseo[6][2]);
			jsonDato06.bajo = parseFloat(parseo[6][3]);
			jsonDato06.cierre = parseFloat(parseo[6][4]);
			jsonString.push(jsonDato06);
			var jsonDato07={};
			jsonDato07.fecha = String(parseo[7][0]);
			jsonDato07.abierto = parseFloat(parseo[7][1]);
			jsonDato07.alto = parseFloat(parseo[7][2]);
			jsonDato07.bajo = parseFloat(parseo[7][3]);
			jsonDato07.cierre = parseFloat(parseo[7][4]);
			jsonString.push(jsonDato07);
			var jsonDato08={};
			jsonDato08.fecha = String(parseo[8][0]);
			jsonDato08.abierto = parseFloat(parseo[8][1]);
			jsonDato08.alto = parseFloat(parseo[8][2]);
			jsonDato08.bajo = parseFloat(parseo[8][3]);
			jsonDato08.cierre = parseFloat(parseo[8][4]);
			jsonString.push(jsonDato08);
			var jsonDato09={};
			jsonDato09.fecha = String(parseo[9][0]);
			jsonDato09.abierto = parseFloat(parseo[9][1]);
			jsonDato09.alto = parseFloat(parseo[9][2]);
			jsonDato09.bajo = parseFloat(parseo[9][3]);
			jsonDato09.cierre = parseFloat(parseo[9][4]);
			jsonString.push(jsonDato09);
			var jsonArrayValor = JSON.parse(JSON.stringify(jsonString));
		
			var aDocs = jsonArrayValor;
			for (var n = 0; n < aDocs.length; n++){
				var docToAdd = new Document(aDocs[n]);
				docToAdd.save(function(error,docToAdd){
					if (error) return console.error(error)
				});
			}
		}
	});
});
app.use(express.static('./'));


// Send all records when there's a GET request to `localhost:3000/test`
app.get('/BANCA', function (req, res) {
	Document.find(function(err, records){
		aData = records;
		res.send(aData);
	});
});

app.listen(7070);
console.log("Servidor conectado puerto 7070");