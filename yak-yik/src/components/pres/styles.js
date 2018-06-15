// module.exports in es5
// there is a general style sheet and then specific ones for components
export default {
    universal: {

    },
    comment: {
        commentsBox: {
            padding:12,
            background:'#f9f9f9',
            border:'1px solid #ddd'
        },
        commentsList: {
            listStyleType:'none'
        },
        span: {
            fontWeight:200
        },
        pipe: {
            marginLeft:12, 
            marginRight:12
        },
        p: {
            fontSize:20,
            fontWeight:400
        }
    },
    zone: {
        container: {
            padding:16, 
            background:'#f9f9f9', 
            marginTop:12, 
            border:'1px solid #ddd'
        },
        header: {
            marginTop:0,
            marginBottom:0
        },
        title:
        {
            textDecoration:'none', 
            color:'red'
        }
    }
}