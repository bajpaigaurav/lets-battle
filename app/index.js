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

        const auth = isAuth()

        return (

            <div>
                <h1>
                    Future portal
                </h1>
                { auth === true ? 
                <h1>
                    welcome back !
                </h1>
                :
                <h1> Login to see details</h1>
                }
            </div>
        )


        // return (
        //     <div>
        //         <h1> Hello, {name} </h1>
        //         <h1> today is {new Date().toLocaleString()} </h1>
        //         <p> what is 2 + 2 {2 + 2}</p>
        //     </div>
        // )
    }

}
ReactDOM.render(
    <App />,
    document.getElementById('app')
)