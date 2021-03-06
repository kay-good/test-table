import express from "express";
import { resolve } from 'path'

import { Html } from "../client/html.js";

const server = express()
const PORT = process.env.PORT || 8080
const __dirname = process.cwd()

const middleware = [
    express.static(resolve(__dirname, 'dist'))
]

middleware.forEach(it => server.use(it))

server.get('/', (req, res) => {
    res.send('Expresser')
})

server.get('/*', (req, res) => {
    const initialState = {
        location: req.url
    }

    res.send(
        Html({
            body: '',
            initialState
        })
    )
})

server.listen(PORT, () => {
    console.log(`Serving at http://localhost:${PORT}`)
})