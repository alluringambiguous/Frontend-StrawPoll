import React, { useState, useEffect } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import contractAddressData from "../constants/contractAddress.json"
import "./ProposalCard.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faThumbsUp,
    faThumbsDown,
    faComment,
} from "@fortawesome/free-solid-svg-icons"
import abi from "../abi.json"

function ProposalCard({ name,uri, proposer, upvote, downvote }) {
    const [like, setLike] = useState(upvote)
    const [dislike, setDislike] = useState(downvote)
    const contractAddress = contractAddressData.contractAddress;


    const { runContractFunction: upVote } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "upVote",
        params: {
            _uri: uri,
            _voter: "0x88D7abb5D9b3f458976c494E81FF89E88a801da1",
        },
    })
    const { runContractFunction: downVote } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "downVote",
        params: {
            _uri: uri,
            _voter: "0x88D7abb5D9b3f458976c494E81FF89E88a801da1",
        },
    })
    const { runContractFunction: getDownVotes } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getDownVotes",
        params: {
            _uri: uri,
        },
    })
    const { runContractFunction: getUpVotes } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getUpVotes",
        params: {
            _uri: uri,
        },
    })
    const handleLike = async () => {
        await upVote({ onSuccess: (tx) => handleSuccess(tx) })
    }
    const handleChange = async (upvotes, downvotes) => {
        setLike(parseInt(upvotes))
        setDislike(parseInt(downvotes))
    }
    const handleSuccess = async (tx) => {
        await tx.wait(1)
        console.log("success entered")
        console.log("tx", tx)
        const downvotes = await getDownVotes()
        const upvotes = await getUpVotes()
        console.log(downvotes)
        await handleChange(upvotes,downvotes)
        return ["success", tx]
    }
    const handleDislike = async () => {
        await downVote({ onSuccess: (tx) => handleSuccess(tx) })
    }

    return (
        <div className="proposalCardContainer">
            <div className="porposalCardDataContainer">
                <div className="proposalCircleContainer"></div>
                <div className="proposalAuthorDataContainer">
                    <div className="proposalTitleContainer">{name}</div>
                    <div className="proposalAuthorContainer">
                        {proposer.slice(0, 6)}...
                        {proposer.slice(proposer.length - 4)}
                    </div>
                </div>
            </div>
            <div className="proposalReactionsContainer">
                <div className="proposalReactionContainer">
                    <FontAwesomeIcon
                        icon={faThumbsUp}
                        onClick={async () => {
                            handleLike()
                        }}
                    />
                    <div>{like}</div>
                </div>
                <div className="proposalReactionContainer">
                    <FontAwesomeIcon
                        icon={faThumbsDown}
                        onClick={async () => {
                            handleDislike()
                        }}
                    />

                    <div>{dislike}</div>
                </div>
                <div className="proposalReactionContainer">
                    <FontAwesomeIcon icon={faComment} />
                    <div>{15}</div>
                </div>
            </div>
        </div>
    )
}

export default ProposalCard
