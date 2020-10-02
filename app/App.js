import React from 'react'
import ReactDOM, { render } from 'react-dom'
import './index.css'


// Component 
// State
// Lifecycle
// UI

function isAuth () {
    return false
}

function isNew () {
    return true
}

export default class App extends React.Component {

    render() {


// if we dont want to wrap all the enements inside a parent div
// React.fragment can be an alternative
        return (
            <React.Fragment>
                <h1> Hello, {name} </h1>
                <h1> today is {new Date().toLocaleString()} </h1>
                <p> what is 2 + 2 {2 + 2}</p>
            </React.Fragment>
        )
    }

}
ReactDOM.render(
    <App />,
    document.getElementById('app')
)