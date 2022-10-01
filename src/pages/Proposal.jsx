import React from "react"
import Discussion from "../components/Discussion"
import { useState, useEffect } from "react"

import contractAddressData from "../constants/contractAddress.json"
import axios from "axios"
import dataConst from "../constants/data.json"
import "./Proposal.css"
import MDEditor from "@uiw/react-md-editor"
import { useParams } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ProfilePicture from "../components/ProfilePicture"
import { useMoralis, useWeb3Contract } from "react-moralis"
import abi from "../abi.json"
import { Link } from "react-router-dom"

import {
    faThumbsUp,
    faThumbsDown,
    faComment,
    faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons"

function Proposal() {
    // const [like, setLike] = useState(upvote)
    // const [dislike, setDislike] = useState(downvote)
    const { proposalIpfsHash } = useParams()
    const [proposalUrl, setProposalUrl] = useState(
        dataConst.ipfsUrlPrefix + "/" + proposalIpfsHash
    )
    const [proposalDetails, setProposalDetails] = useState({
        uri: "",
        name: "",
        proposer: 0,
        upVotes: 0,
        downVotes: 0,
        markDownData: "",
    })
    const { account } = useMoralis()

    const { Moralis, enableWeb3, isWeb3Enabled } = useMoralis()

    const contractAddress = contractAddressData.contractAddress
    const { runContractFunction: proposalDetail } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "proposalDetail",
        // update to use uri from component
        params: { _uri: proposalUrl },
    })

    const { runContractFunction: upVote } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "upVote",
        params: {
            _uri: proposalUrl,
            _voter: "0x88D7abb5D9b3f458976c494E81FF89E88a801da1",
        },
    })
    const { runContractFunction: downVote } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "downVote",
        params: {
            _uri: proposalUrl,
            _voter: "0x88D7abb5D9b3f458976c494E81FF89E88a801da1",
        },
    })
    const { runContractFunction: getDownVotes } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getDownVotes",
        params: {
            _uri: proposalUrl,
        },
    })
    const { runContractFunction: getUpVotes } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getUpVotes",
        params: {
            _uri: proposalUrl,
        },
    })

    async function updateProposalDetailsFromContract() {
        try {
            const result = await proposalDetail()
            console.log(`data from contract`, result)
            let { uri, name, upVotes, downVotes, proposer } = result //upvotes, downvotes are BigNumber objs
            //bigint to integer
            upVotes = parseInt(upVotes)
            downVotes = parseInt(downVotes)
            // console.log(uri, name, upVotes, downVotes, proposer)
            setProposalDetails((state) => ({
                ...state,
                uri,
                name,
                upVotes,
                downVotes,
                proposer,
            }))
        } catch (error) {
            console.log(`testFetch error`, error)
            console.log("check if web3 is enabled")
        }
    }

    async function updateProposalDetailsFromIPFS() {
        try {
            const response = await axios({
                method: "get",
                url: proposalUrl,
            })

            const { address, markDownData } = await response.data
            console.log("data from IPFS", { address, markDownData })
            setProposalDetails((state) => ({
                ...state,
                markDownData,
            }))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("web3 enabled? ", isWeb3Enabled)
        console.log(
            "proposal opened, proposalUrl (from ipfs hash): ",
            proposalUrl
        )

        // get proposal info from contract
        if (isWeb3Enabled) {
            updateProposalDetailsFromContract()
            updateProposalDetailsFromIPFS()
        } else if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
                console.log("enabled web3")
            }
        }
    }, [isWeb3Enabled])

    const handleLike = async () => {
        await upVote({ onSuccess: (tx) => handleSuccess(tx) })
    }
    const handleChange = async (upvotes, downvotes) => {
        // setLike(parseInt(upvotes))
        // setDislike(parseInt(downvotes))
    }
    const handleSuccess = async (tx) => {
        await tx.wait(1)
        console.log("success entered")
        console.log("tx", tx)
        const downvotes = await getDownVotes()
        const upvotes = await getUpVotes()
        console.log(downvotes)
        await handleChange(upvotes, downvotes)
        return ["success", tx]
    }
    const handleDislike = async () => {
        await downVote({ onSuccess: (tx) => handleSuccess(tx) })
    }

    return (
        <div className="proposalPageDashContainer">
            <div className="topIntroBarContainer">
                <Link
                    to="/home"
                    style={{
                        marginRight: "auto",
                        textDecoration: "none",
                        color: "black",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faAnglesLeft}
                        className="reactionContainer"
                    />
                    Back
                </Link>
                {account ? (
                    <div className="headingProposalPageContainer">
                        {account.slice(0, 6)}...
                        {account.slice(account.length - 4)}{" "}
                    </div>
                ) : (
                    <div className="headingContainer">Hey,</div>
                )}
                <div className="profilePicContainer">
                    {<ProfilePicture address={account} />}
                </div>
            </div>

            <div className="proposalContainer">
                <div className="proposalHeading">
                    <div className="proposalName">
                        <h1>{proposalDetails.name}</h1>
                    </div>
                    <div className="proposalAuthor">
                        <div>by {proposalDetails.proposer}</div>
                    </div>
                </div>
                <div className="ProposalBody">
                    <div>
                        {/* TODO: render markup */}
                        <MDEditor.Markdown
                            source={proposalDetails.markDownData}
                            style={{
                                whiteSpace: "pre-wrap",
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className="proposalContent"
                        />
                    </div>
                </div>
                <div className="proposalFooter">
                    <div className="proposalUpVotes">
                        <FontAwesomeIcon
                            icon={faThumbsUp}
                            className="reactionContainer"
                            onClick={handleLike}
                        />
                        {proposalDetails.upVotes}
                    </div>
                    <div className="proposalDownVotes">
                        <FontAwesomeIcon
                            icon={faThumbsDown}
                            className="reactionContainer"
                            onClick={handleDislike}
                        />{" "}
                        {proposalDetails.downVotes}
                    </div>
                </div>

                <div class="solid"></div>

                <div className="proposalDiscussion">
                    <Discussion proposalUrl={proposalUrl} account={account} />
                </div>

                {/* <div>uri: {proposalDetails.uri}</div>
                <div>name: {proposalDetails.name}</div>
                <div>proposer: {proposalDetails.proposer}</div>
                <div>upvotes: {proposalDetails.upVotes}</div>
                <div>downvotes: {proposalDetails.downVotes}</div>
                <div>markdown: {proposalDetails.markDownData}</div> */}
            </div>
        </div>
    )
}

export default Proposal
