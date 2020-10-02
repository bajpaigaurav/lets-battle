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
            <React.Fragment>
                <Hello 
                    name='Gaurav'
                    lastName='Bajpai'
                    someboolean = {true}
                    someMethod = { () => alert('some message !')}
                    header= { <h1> some html</h1>}
                 />

                 <Hello 
                 name='Gaurav'
                 lastName='Bajpai'
                 someboolean = {true}
                 someMethod = { () => alert('some message !')}
                 header= { <h1> some html</h1>}
              />
            </React.Fragment>
                 
            
        )
    }

}
ReactDOM.render(
    <App/>,
    document.getElementById('app')
)