import React, { Component } from 'react' // Component is a submodule
import styles from './styles'

class Zone extends Component {   
    render(){
        const zoneStyle = styles.zone
        // grab first zip
        const zipCode = this.props.zone.zipCodes[0]
        return (
        <div style={zoneStyle.container}>
            <h2 style={zoneStyle.header}>
                <a style={zoneStyle.title} href="#">{this.props.zone.name}</a>
            </h2>
            <span className="detail">{zipCode}</span><br />
            <span className="detail">{this.props.zone.numComments} comments </span>
        </div>
        )
    }
}


export default Zone