import React from "react";
import ReactDOM from "react-dom"

import 'bootstrap/dist/css/bootstrap.min.css'

import Root from './config/root'

const target = document.getElementById('root')

const render = (Component) => {
    ReactDOM.render(<Component />, target)
}

render(Root)