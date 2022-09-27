# Submission for Hackathon-ETHBerlin3

## SilentProof at Görbraurei: On-Chain Proof of Liveliness
Multi-Modal Proof Based Module with Distributed Signatures for Estabishing On-Chain Check of Liveliness

![Mint Beer](/beer.png)<div align="center"> *Sample use case of SilentProof where a beer NFT can only be minted if the user passes a liveliness check* </div>

<br>

- SilentProof uses unique fusion of cryptography (distributed signatures) and signal processing (3D gesture tracking on a phone wallet) to provide **Proof of Liveliness**. The proof along with context verification algorithm (based on
proximity) will rule out **scalping, spoofing and spinning bots** and also bot farms where multiple phones are placed in co-located farming
units [5].

## Problem
- Bot farms challenge economics of tokenized assets.
83 percent of businesses surveyed experienced at least one bot attack within the past year. Out of that, 39 percent reporting a revenue loss greater than 10 percent. 
- NFTs are minted and then sold via auction on marketplaces. Bots are regularly used during online auctions, especially sniper bots, which will place a winning bid at the latest possible moment of the auction to increase the chances of winning an item at the lowest price.
- Scalpers use bots to manipulate the prices of NFTs, guaranteeing a sale at a favorable price and an even better resale value either through driving NFT prices down, driving NFT prices up or fake bidding.

![Types of Bots](/bot.PNG)<div align="center"> *The bots are getting ubiquitous and so are the attacks.*</div>

## Idea and Architecture
The core idea of SilentProof is to exploit cyber-physical proofs and distributed signature (MPC) for denying bots from participating in any transaction. 
![Silent Proof](/proof.png) <div align="center"> *The core architecture of SilentProof: Collecting Proofs with signature.* </div> 

<br>

- Whenever a transaction is initiated (say NFT Minting) through a dApp; two parallel signature processes are triggered:
- dApp initiates distributed signature with a registered phone wallet. 
- dApp frontend pops up a gif which suggests the user to replicate a gesture with the phone. This essentially is asking for the proof that the user is a hauman being- a) has necessary cognition to understand the motion shown in the gif, b) has possesion of the registered phone wallet and c) can move the phone as suggested. <br> <div align="center"> <img src="/double_flip_rGxyTdh.gif" height = "300px" width = "200px" /> </div> <div align="center"> *One of the suggested gesture to be replicated by the user.*</div>
<br>
- A multi-modal sensing algorithm triggers in the background at phone.
- If the phone is moved by the user in the suggested fashion, Phone Wallet and dApp exchange messages to generate _distributed signatures_ with manifestation of the _proof of livelines_ and send the same to the smart contract.

![Architecture of SilentProof](/finalarch.PNG)<div align="center"> *The sequence diagram of SilentProof.* </div>

## Core Concepts
As such there are two core concepts- generation distributed signatures between the dApp and the approving authority (registered phone wallet) and the very fact that this process is only triggered and the smart-contract is pushed with the expected signature, when the user has passed the check of _liveliness_.

- During registration, the dApp and phone wallet will undergo a distributed key generation.
- The signature generation is triggered with passing of the condition: _Replicate to prove that you are a human_:
- The gesture detection is based on mapping the movement of the phone in 3D space using IMU sensors based sensing framework proposed by Sheng et.al. [4]. 


![Architecture of SilentProof](/gesture.png) <div align="center"> *The sequence of gesture verification.* </div>
<br>
- Prove that you (user accessing the dApp) and the registered phone wallet are in proximity: Apart from the check on the ability to replicate, an offline check also runs in parallel which verifies that the dApp and the phone wallet (phone), which trigger signature, are in same space (proximity i.e., near to each other). This is based on an encrypted offline channel using _inaudible acoustics_. The proximity checks nullifies remote signing/minting attempts or collusions.The developed algorithms also help to identify bots which are co-located using spatial and temporal data fusion across acoustic, radio frequency and sensory domains.


![SilentProof](/silentproof.png)<div align="center"> *Multi-Modality is inherent.* </div>

## Applications
- **Verified Mints**, similar to _blue ticks_ for verified accounts on twitter or other social network platforms: The NFTs which are minted through the Proof of Liveliness.
- Keep bots at bay during NFT launches.
- Deny bot click-farms from gaming metaverse economics.

![NFTs](/verified.png) <div align="center"> *NFTs minted with Proof of Liveliness can be tagged as verified ones.* </div>

## Integration with dApps
- No extra hardware requirement, a simple smartphone is good enough.
- Shipped with a Javascript library and Smartphone SDK (to be integrated with the phone wallet).


## Related Links
1. https://github.com/ethb3rlin/attendees
2. https://goerli.etherscan.io
3. Link to the SilentAuth Android Application: https://simonpure.github.io/kampong/auth/kampong_auth_v3.1.3.apk
4. Shen, Sheng, Mahanth Gowda, and Romit Roy Choudhury. "Closing the gaps in inertial motion tracking." Proceedings of the 24th Annual International Conference on Mobile Computing and Networking. 2018; https://synrg.csl.illinois.edu/papers/muse-mobicom18.pdf
5. https://twitter.com/P2ENewsOfficial/status/1453339722223288323





///elevator pitch




project story
## Inspiration
Currently a minimum bond of 400 GLMR to make a proposal which is eventually refunded. Still, not all users will have easy access to 400 GLMR or feel comfortable with locking it for an indeterminate amount of time. <br>

* This financial barrier stagnates the overall improvement of the blockchain as many good ideas would be left un-proposed.
* Many community members don't put their vote in the proposal because of high fees, which is reflected in governance process as lack of representation of members who don't have enough coins. This in turn centralizes power to stakeholders with more coins.
* A good proposal that only caters only those members having less coins, might get unnoticed.
<br><br>
## What it does
A strawpoll is an unofficial poll that usually takes place before a official governance poll.<br>
Our *"Straw Poll" Dapp* is a intuitive and a community-based web solution that lets users **submit, read, discuss and interact** with proposals published by other users. <br>
The app collects proposal information (i.e. likes, dislikes, proposer etc) **on-chain**. Users can read, vote and discuss the proposals. Further, the top voted proposal is **submitted for official governance periodically**. <br>
 We have launched our app on the Moonbase Alpha testnet.
<br><br>
## How we built it

### Smart Contract
We started with deploying the smart-contract on the monnbase alpha test net. The smart contract records the details of the proposals and encloses a wide variety of usable functions that provide decentralization to our project.

### Fronted
Then, we build the front-end. We designed the website on **figma** keeping in mind user accesibility. The frontend is written in react. We used **moralis** hooks to connect our smart contract to metamask wallet and to call methods on the smart contract. We have also added packages that provide personalised profile pictures.

### IPFS for Data Storage
We store the proposal metadata on-chain using **ipfs** leveraging **pinata** apis.

### Flask Backend and Database
Each proposal has a discussion page, where users can post comments on the proposal, and vote on other users' comments. These discussions are stored in a **SQL** database connected through **REST API** built on **Flask**. 
<br><br>
## Challenges we ran into
As beginners in web3.0 development attempting to build a solution from scratch, we faced a lot of challenges. We learn a lot in the way and overcame most of the challenges!

### What data to upload on chain?
Storing data on chain comes with an extra cost in the form of fees that has to be paid by the user. Data such as the discussion under a proposal can be stored in centralized database with no issues.
The proposal hash is already on the chain which can be used to verify that the proposal is unaltered. <br>

### No support for chainlink keepers
We wanted to use a chainlink keeper to periodically call the `pushToGovernance()` function, but the support is not yet availabe. <br>
We found a workaround by using **Open Zeppelin Defender**.

### Who sends the proposal for governance?
At the end of the week we want to push the top proposal on chain. We had to decide whether to push it for governance automatically or allow users to do it at the end of the week themselves.

Options:

1. The user pushes the proposal to for the official governance poll. They are allowed to do so only once the 7-day expiration period is over. <br>
When solidity receives a request to push a proposal, it verifies the request using the time-stamp of that proposal stored on chain. <br><br>
It verifies the following: <br>
a. Is the proposal at least 7 days old? <br>
b. Is it the most voted proposal?<br>
c. Has a proposal already been sent this week? <br>
<br>
Only after the three checks are verified, the smart contract will send the proposal to chain.
<br>

2. Open Zeppelin defender is integrated with our smart contract, which periodically calls the `pushToGovernance()` function to push the proposal for official governance poll. <br><br>

## Accomplishments that we're proud of

On running into all the challenges mentioned above, we read relavant articles, documentations and other literature for days, and finally built a working solution!

### Putting proposal metadata on IPFS
Proposal metadata is put on IPFS. Discussion is built on flask and stored in SQL database. We decided not to put user comments on chain to save gas fees.


### UI/UX Design
We designed a web solution that is more intuitive to use and interact with for users belonging to both technical and non-technical backgrounds. <br><br>

## What we learned

### Quick developement in a fast paced hackathon project
reading docs, quick debugging.

### Chainlink, ipfs, smart contract, Open Zepplin
We learnt how to use chainlink oracles to call API endpoints to get price feed. 

### React + moralis, 
create react app issues, 

### Database, flask, heroku backend

### User flow diagram

### Worked with team, of developers and UI designers
<br><br>

