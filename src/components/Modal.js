import React, { useEffect } from "react"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import { useWeb3Contract } from "react-moralis"
import abi from "../abi.json"
import contractAddressData from "../constants/contractAddress.json"
import "./Modal.css"
import MDEditor from "@uiw/react-md-editor"
import axios from "axios"
import dataConst from "../constants/data.json"

function ModalTab({ userAddr, open, handleClose }) {
    const [title, setTitle] = React.useState("")
    const [proposalUrl, setProposalUrl] = React.useState("")
    const [markDownValue, setMarkDownValue] = React.useState(
        "type proposal here ...."
    )

    const contractAddress = contractAddressData.contractAddress
    const { runContractFunction: addProposal } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "addProposal",
        params: { _uri: proposalUrl, _proposer: userAddr, _name: title },
    })

    async function sendProposalUrlToPythonBackend() {

        const pythonApiEndpoint = dataConst.pythonApiEndpoint
        const newDiscussionEndpoint = `${pythonApiEndpoint}/discussions`

        try {
            console.log("sending proposal url to python backend : ", newDiscussionEndpoint)
            const response = await axios({
                method: "post",
                url: newDiscussionEndpoint,
                data: { proposal_url : proposalUrl },
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
            })
            console.log("response from python backend : ", response)
        } catch (error) {
            console.log(error)
        }
 
    }

    const handleClick = async () => {
        console.log(userAddr)
        console.log(markDownValue)
        console.log("entered...")

        try {
            // uploading to ipfs
            const resJson = await axios({
                method: "post",
                url: "https://api.pinata.cloud/pinning/pinJsonToIPFS",
                data: { address: userAddr, markDownData: markDownValue },
                headers: {
                    pinata_api_key: dataConst.pinataApi,
                    pinata_secret_api_key: dataConst.pinataApiSecret,
                },
            })

            // get ipfs url and store for later use
            const ipfsHash = await resJson.data.IpfsHash
            const url_string = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
            console.log("final ipfs url string", `${url_string}`)
            setProposalUrl(url_string)

        } catch (error) {
            console.log(error)
        }
    }

    async function handleProposalUrlUpdate() {
        if (proposalUrl !== "") {
            console.log("proposalUrl state set, trying to send changes", proposalUrl)
            await addProposal()
            await sendProposalUrlToPythonBackend()
        }
    }

    useEffect(() => {
        handleProposalUrlUpdate()

    }, [proposalUrl])

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            radius="10px"
            className="modalContainer"

        >
            <div className="modalStyleContainer">
                <Box
                    className="boxStyleContainer"
                    component="form"
                    noValidate
                    autoComplete="off"
                >
                    <div className="modalHeadMessage1">Have a new idea?</div>
                    {/* <div className="modalHeadMessage2">Let everyone know </div> */}
                    <div className="proposerAddressContainer">
                        <div>Proposer's Address :</div> <div>{userAddr}</div>
                    </div>
                    <TextField
                        id="outlined-name"
                        label="Proposal's Title"
                        value={title}
                        onChange={handleTitleChange}
                        sx={{
                            bgcolor: "#1E1E28",
                            marginTop: "16px",
                            marginBottom: "16px",
                            width: { sm: 800 },
                        }}
                    />
                    <MDEditor
                        value={markDownValue}
                        onChange={setMarkDownValue}
                        className="editorContainer"
                    ></MDEditor>
                    <div className="buttonModalContainer" onClick={handleClick}>Submit</div>
                    {proposalUrl}
                </Box>
            </div>
        </Modal>
    )
}

export default ModalTab
