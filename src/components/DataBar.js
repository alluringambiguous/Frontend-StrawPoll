import React, { useEffect, useState } from "react"
import "./DataBar.css"
import DataCard from "./DataCard"
import { useMoralis, useWeb3Contract } from "react-moralis"
import abi from "../abi.json"
import contractAddressData from "../constants/contractAddress.json"

function DataBar() {
    const [topAddr, setTopAddr] = useState()
    const [topName, setTopName] = useState("")
    const [card, setCard] = useState([])
    const contractAddress = contractAddressData.contractAddress

    const { isWeb3Enabled } = useMoralis()

    const { runContractFunction: topContract } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "topContract",
        params: {},
    })
    const { runContractFunction: getPriceGLMRToDollar } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "getPriceGLMRToDollar",
        params: {},
    })
    async function updateUi() {
        const topCont = await topContract()
        const glmrToUsd = await getPriceGLMRToDollar()
        const topA = await topCont.uri
        const topN = await topCont.name
        setCard([])
        console.log("hello")
        let weekday = new Date().getDay()
        console.log(weekday)
        let dayLeft = 7 - weekday

        console.log(topCont.uri)
        setTopName(topN)
        setTopAddr(topA)
        console.log(topName)
        setCard((oldArray) => [
            ...oldArray,
            [
                <DataCard
                    key={1}
                    Title={"This Weeks Top Proposal"}
                    Data={topN}
                    TopContractAddress={topA}
                />,
                <DataCard
                    key={2}
                    Title={"GLMR Price"}
                    Data={`$ ${glmrToUsd}`}
                    TopContractAddress={"http://glmrtousdconverter"}
                />,
                <DataCard
                    key={3}
                    Title={"Push for Governance in"}
                    Data={`${dayLeft} days`}
                    TopContractAddress={"http://glmrtousdconverter"}
                />,
                <DataCard
                    key={4}
                    Title={"Push for Governance in"}
                    Data={`${dayLeft} days`}
                    TopContractAddress={"http://glmrtousdconverter"}
                />,
            ],
        ])
    }

    useEffect(() => {
        updateUi()
    }, [isWeb3Enabled])
    return (
        <div className="dataBarContainer">
            <div className="tempContainer">
                {card}
                {/* <DataCard
                    Title={"This Weeks Top Proposal"}
                    Data={topName}
                    Link={"http:/ex...s.com"}
                    TopContractAddress = {topAddr}
                /> */}
                {/* <DataCard Title={"Price of GLMR"} Data={"$ 0.52"} />
                <DataCard
                    Title={"Next Burn"}
                    Data={"4 Days"}
                    Circle={"4/7 in circle form"}
                />
                <DataCard
                    Title={"Last Weeks Top Proposal"}
                    Data={"0xd34w...45fd"}
                    Link={"http:/ex...s.com"}
                /> */}
            </div>
        </div>
    )
}

export default DataBar
