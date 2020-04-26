import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import postgraphile from 'postgraphile';
import cors from 'cors';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

const DEV_URL = 'postgres://eveandersson@localhost:5432/foodventure';
const PROD_URL = 'postgres://dbmasteruser:ambitious28@ls-b5847db7ec05ca42f89663b9bf58959b1a786711.cigykusn0o94.ap-southeast-2.rds.amazonaws.com:5432/postgres';

app.use(
  postgraphile(
    process.env.DATABASE_URL || PROD_URL,
    "public",
    {
      watchPg: true,
      graphiql: true,
      enhanceGraphiql: true,
    }
  )
);

const port = process.env.PORT || 3001;
app.listen(port);
console.log('Express server started on port: ' + port);

module.exports = app;