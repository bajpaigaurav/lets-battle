import React from 'react'
import ReactDOM, { render } from 'react-dom'
import Battle from './components/battle'
import NavBar from './components/NavBar'
import Popular from './components/popular'
import { ThemeProvider } from './context/theme'
import './index.css'
import List from './List'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Results from './components/Results'


// Component 
// State
// Lifecycle
// UI

// function isAuth () {
//     return false
// }

// function isNew () {
//     return true
// }

export default class App extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            theme: 'light',
            toggleTheme: () => {
                this.setState(({theme})=> ({
                    theme: theme === 'light' ? 'dark' : 'light'
                }))
            }
        }
    }

    render() {


// if we dont want to wrap all the enements inside a parent div
// React.fragment can be an alternative
        return (
            // adding prop name
            // <React.Fragment>
            //     <Hello 
            //         name='Gaurav'
            //         lastName='Bajpai'
            //         someboolean = {true}
            //         someMethod = { () => alert('some message !')}
            //         header= { <h1> some html</h1>}
            //      />

            //      <Hello 
            //      name='Gaurav'
            //      lastName='Bajpai'
            //      someboolean = {true}
            //      someMethod = { () => alert('some message !')}
            //      header= { <h1> some html</h1>}
            //   />
            //     <List/>
            // </React.Fragment>
            
            <Router basename='/lets-battle'>
                
                <ThemeProvider value={this.state}>
                    <div  className={this.state.theme}>
                        <div className='container'>
                            <NavBar></NavBar>
                            <Switch>
                                <Route exact path='/' component={Popular} />
                                <Route exact path='/battle' component={Battle} />
                                <Route path='/battle/results' component={Results}></Route>
                                <Route render={()=><h1>404</h1>}></Route>
                            </Switch>
                        </div>
                    </div>
                    
                </ThemeProvider>
            </Router>
                 
            
        )
    }

}
ReactDOM.render(
    <App/>,
    document.getElementById('app')
)