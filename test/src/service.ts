import * as express from 'express'
import {createService} from "../../src";
import {mathService} from "./mathService";
import * as bodyParser from "body-parser";

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/json-rpc', (req, res) => {
    console.log('[Request]', req.body)
    createService(mathService)
        .receive(req.body)
        .then(response => response ? res.send(response) : res.sendStatus(204))
})

export const service = app