import React, { Component } from 'react' // Component is a submodule
import Zone from '../pres/Zone'

class Zones extends Component {
    // object initializer
    constructor(){
        super()
        this.state = {
            // list of zones
            zone: {
                name: '',
                zipCode: ''
            },
            list: []
        }
                
    }
    
    // this will add both name and zipcode
    updateZone(event){
        console.log('updateZone: '+ event.target.id+'=='+event.target.value)
        let updatedZone = Object.assign({}, this.state.zone)
        updatedZone[event.target.id] = event.target.value

        this.setState({
            zone: updatedZone
        })
    
    }
    
    addZone(event){
        console.log('add zone: '+JSON.stringify(this.state.zone))
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(this.state.zone)
        this.setState({
            list: updatedList
        })
    }

    render(){
        // loop through state, map does this automatically. INside parentheses is what we do
        // callback in es6, in es 5 --> function(){ }
        const listItems = this.state.list.map((zone, i) => {
            return (
                // return a list item
                <li key={i}><Zone zone={zone} /></li>
            )
        })

        return (
            <div>
                <ol>
                    {listItems}
                </ol>

                <input id="name" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Name" />
                <input id="zipCode" onChange={this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zipe Code" />
                <button onClick={this.addZone.bind(this)} className="tn btn-danger">Add Zone</button>
            </div>
        )
        
    }
}

export default Zones