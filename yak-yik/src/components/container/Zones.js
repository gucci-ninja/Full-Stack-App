import React, { Component } from 'react' // Component is a submodule
import Zone from '../pres/Zone'

class Zones extends Component {
    // object initializer
    constructor(){
        super()
        this.state = {
            // list of zones
            list: [
                {name:'Zone 1', zipCode:'10012', numComments:10},
                {name:'Zone 2', zipCode:'10013', numComments:20},
                {name:'Zone 3', zipCode:'10014', numComments:30},
                {name:'Zone 4', zipCode:'10015', numComments:40},
                {name:'Zone 5', zipCode:'10016', numComments:50}
                
            ]
        }
                
    }
    render(){
        // loop through state, map does this automatically. INside parentheses is what we do
        // callback in es6, in es 5 --> function(){ }
        const listItems = this.state.list.map((zone, i) => {
            return (
                // return a list item
                <li><Zone zone={zone} /></li>
            )
        })

        return (
            <div>
                <ol>
                    {listItems}
                </ol>
            </div>
        )
    }
}

export default Zones