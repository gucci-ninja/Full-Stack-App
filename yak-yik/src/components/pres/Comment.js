import React, { Component } from 'react'
import styles from '../styles'

class Comment extends Component {
    render(){
        return (
            <div>
                <p style={styles.comment.p}>
                    {this.props.comment.body}
                </p> 
                <span style={styles.comment.span}>{this.props.comment.username}</span>
                <span style={styles.comment.pipe}>|</span>             
                <span style={styles.comment.span}>{this.props.comment.timestamp}</span>
                <hr />
            </div>
        )
    }
}

export default Comment