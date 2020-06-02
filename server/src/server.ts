import express from 'express'
import bodyparser from 'body-parser'
import routes from './routes'
import path from 'path'

const app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.use(routes)

app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')))

app.listen(3333);