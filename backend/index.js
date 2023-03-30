const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");
var cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const swagger = require('./swagger.json');

const apiRouter = require('./Routes/apiRoutes.js')
const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use('/api', apiRouter);
app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));

app.use((error, req, res, next) => {
	if(req.file){
		fs.unlink(req.file.path, (err) => {
			console.log(err);
		})
	}
	if (res.headerSent) {
		return next(error);
	}
	res.status(error.code || 500);
	res.json({message: error.message || 'An unkown error occured'});
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000);
