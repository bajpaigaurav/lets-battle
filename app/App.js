import React from 'react'
import ReactDOM, { render } from 'react-dom'
import Hello from './Hello'
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
            // adding prop name
                <Hello name='Gaurav' lastName='Bajpai' />
            
        )
    }

}
ReactDOM.render(
    <App />,
    document.getElementById('app')
)