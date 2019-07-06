import React, { Component } from 'react' // Component is a submodule
// var React = require('react') --- this is es5, we are using es6
import ReactDOM from 'react-dom'
// import Zones from './components/Zones'
import Home from './components/layout/Home'

// App is basically an html tag that we are gonna render in the dom
class App extends Component {
    render(){
        return (
            <div>
                YakYik!!!
                <Home />
            </div>
        )
    }
}

// use react-dome library to render code
ReactDOM.render(<App />, document.getElementById('root')) // it'll take over the root tage with App