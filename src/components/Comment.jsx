import React from "react"
import { useEffect, useState } from "react"

import "./Comment.css"
import dataConst from "../constants/data.json"
import axios from "axios"
import ProfilePicture from "../components/ProfilePicture"


function Comment({
    discussion_url,
    content,
    author,
    likes,
    dislikes,
    replies,
    
}) {
    const pythonApiPrefix = dataConst.pythonApiPrefix

    const [commentLikes, setCommentLikes] = React.useState(likes)
    const [commentDislikes, setCommentDislikes] = React.useState(dislikes)
    const [commentReplies, setCommentReplies] = React.useState(replies)

    // form to add new comment
    const [newCommentContent, setNewCommentContent] = React.useState("")

    useEffect(() => {
        //post comment to backend

    }, [])

    return (
        <div className="commentContainer">

                <div className="commentContainer">
                    <div className="commentLEFT">
                        <div className="profilePicture">pfp</div>
                    </div>
                    <div className="commentRIGHT">                        
                        <div className="commentAuthor">{author}</div>                        
                        <div className="commentContent">{content}</div>
                        <div className="commentFooter">
                            <div className="commentLikes">{likes}</div>
                            <div className="commentDislikes">{dislikes}</div>
                            <div className="commentReplies">
                                {replies.length} replies
                            </div>
                            <div className="commentReply">reply</div>
                        </div>
                    </div>
                </div>
            
        </div>
    )
}

export default Comment
