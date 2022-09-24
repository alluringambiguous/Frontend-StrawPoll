import React from "react"
import "./Comment.css"

function Comment({ content, author, likes, dislikes, replies }) {
    return (
        <div className="commentContainer">
            <div className="commentLEFT">
                <div className="profilePicture">pfp</div>
            </div>
            <div className="commentRIGHT">
                <div className="commentHeader">
                    <div className="commentAuthor">{author}</div>
                </div>
                <div className="commentContent">{content}</div>
                <div className="commentFooter">
                    <div className="commentLikes">{likes}</div>
                    <div className="commentDislikes">{dislikes}</div>
                    <div className="commentReplies">{replies.length} replies</div>
                    <div className="commentReply">reply</div>
                </div>
            </div>
        </div>
    )
}

export default Comment