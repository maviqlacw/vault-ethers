require('dotenv').config();
const { ethers } = require("ethers");
const BRLC_ABI = require("./BRLC_ABI.json");
const { PRIVATE_KEY } = process.env;

const provider = new ethers.providers.JsonRpcProvider('https://rpc.mainnet.cloudwalk.io/')

const address = '0xA9a55a81a4C085EC0C31585Aed4cFB09D78dfD53' //BRLC Address

//const wallet = new ethers.Wallet(PRIVATE_KEY, provider)

const contract = new ethers.Contract(address, BRLC_ABI, provider)

const main = async () => {

   const coinName = await contract.name()
   const coinDecimals = await contract.decimals()

   console.log(coinName)
   console.log(coinDecimals)

}

main()