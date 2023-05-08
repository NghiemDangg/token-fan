const { ethers } = require('ethers');
// Set up Alchemy URL and API Key
const VFC_ADDRESS = process.env.REACT_APP_VFC_ADDRESS;;
const BALLOT_ADDRESS = process.env.REACT_APP_BALLOT_ADDRESS;
const VFC_ABI = require('./abi/VFC.json');
const BALLOT_ABI = require('./abi/Ballot.json'); 
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth_goerli');
const VFC = new ethers.Contract(VFC_ADDRESS, VFC_ABI, provider);
const BALLOT = new ethers.Contract(BALLOT_ADDRESS, BALLOT_ABI, provider);


module.exports = {
    VFC,
    BALLOT
}