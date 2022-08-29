require('dotenv').config();
const { ethers } = require("ethers");
const BRLC_ABI = require("./BRLC_ABI.json");
const { PRIVATE_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider('https://rpc.mainnet.cloudwalk.io/')

const address = '0xd898e193a8a2138b4be66e5bd8772bb352c8fd23' //BRLC Address

//const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

const contract = new ethers.Contract(address, BRLC_ABI, provider)

const main = async () => {

   const coinName = await contract.name()
   const coinDecimals = await contract.decimals()

   console.log(coinName)
   console.log(coinDecimals)

}

main()