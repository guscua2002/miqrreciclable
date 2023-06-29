require('dotenv').config({path: './server/.env'});
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./server/config/mongoose.config');


app.use(cookieParser());
/*app.use(cors({credentials: true, origin: 'http://localhost:3000'}));*/
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



const routes = require('./server/routes/qr.routes');
routes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));