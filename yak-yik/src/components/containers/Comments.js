import React, { Component } from 'react'
import Comment from '../pres/Comment'
import styles from './styles'
import superagent from 'superagent'

class Comments extends Component {
    constructor(){
        super()
        this.state = {
            comment: {
                username: '',
                body: '',
                timestamp: ''
            },
            list: [
                // same signature as our model for comments - body and username
                // this will be populated
            ]
        }
    }

    componentDidMount(){
        superagent
        .get('api/comment')
        .query(null)
        .set('Accept', 'application/json')
        .end((err, response) => {
            if(err){
                alert('ERROR: '+err)
                return
            }

            let results = response.body.results

            this.setState({
                list: results
            })
        })
    }
    // triggered when someone submits a comment
    submitComment(){
        console.log('submit comment: '+JSON.stringify(this.state.comment))
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(this.state.comment)
        
        this.setState({
            list: updatedList
        })
        
    }
    
    updateUsername(event){
        //console.log('updatedUsername: '+event.target.value)
        // this.state.comment['username'] = event.target.value - WRONG

        // create a copy and update it
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['username'] = event.target.value
        
        this.setState({
            comment: updatedComment
        })
    }

    updateBody(event){
        //console.log('updatedBody: '+event.target.value)
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['body'] = event.target.value
        
        this.setState({
            comment: updatedComment
        })
    }

    updateTimestamp(event){
        let updatedComment = Object.assign({}, this.state.comment)
        updatedComment['timestamp'] = event.target.value
        
        this.setState({
            comment: updatedComment
        })
    }

    render(){
        const commentList = this.state.list.map((comment, i) => {
            return(
                <li key={i}><Comment comment = {comment} /></li>
            )
        })
        return (
            <div>
                <h2>Comments: Zone 1</h2>
                <div style={styles.comment.commentsBox}>
                    <ul style={styles.comment.commentsList}>
                        { commentList }
                    </ul>

                    <input onChange={this.updateUsername.bind(this)} className="form-control" type="text" placeholder="Username" /><br />
                    <input onChange={this.updateBody.bind(this)} className="form-control" type="text" placeholder="Comment" /><br />
                    <input onChange={this.updateTimestamp.bind(this)} className="form-control" type="text" placeholder="Time" /><br />
                    <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit Comment</button>
                </div>
            </div>
        )
    }
}

export default Comments