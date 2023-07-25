require('dotenv').config({path: './server/.env'});
const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

require('./server/config/mongoose.config');


app.use(cookieParser());
/*app.use(cors({
    origin: '*'
}));*/

app.use(cors({ origin: true, credentials: true}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

const routes = require('./server/routes/qr.routes');
routes(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));


