import React, { Component } from 'react'
import Comment from '../pres/Comment'
import styles from '../styles'

class Comments extends Component {
    constructor(){
        super()
        this.state = {
            list: [
                // same signature as our model for comments - body and username
                {body: 'comment 1', username:'plip', timestamp:'10:30'},
                {body: 'comment 2', username:'plop', timestamp:'10:45'},
                {body: 'comment 3', username:'ploop', timestamp:'11:30'}
            ]
        }
    }
    render(){
        const commentList = this.state.list.map((comment, i) => {
            return(
                <li><Comment comment = {comment} /></li>
            )
        })
        return (
            <div>
                <h2>Comments: Zone 1</h2>
                <div style={styles.comment.commentsBox}>
                    <ul style={styles.comment.commentsList}>
                        { commentList }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Comments