require('dotenv').config();
const { ethers } = require("ethers");
const  VAULT_ABI  = require("./VAULT_ABI.json");
const BRLC_ABI = require("./BRLC_ABI.json")
const { PRIVATE_KEY, SELF_WALLET_ADDRESS } = process.env;


const provider = new ethers.providers.JsonRpcProvider('https://rpc.testnet.cloudwalk.io/') //Testnet RPC

const brlcMainAddress = '0xd898e193a8a2138b4be66e5bd8772bb352c8fd23' //BRLC mainnet
const brlcTestAddress = '0xC6d1eFd908ef6B69dA0749600F553923C465c812' //BRLC Testnet
const LPaddress = '0x37295fcbb3867fd98C292Df1634736B2FEEEDe3D' //VAULT Address

const signer = new ethers.Wallet(
    PRIVATE_KEY,
    provider
  );

const LPcontract = new ethers.Contract(LPaddress, VAULT_ABI, signer)
const BRLCcontract = new ethers.Contract(brlcTestAddress, BRLC_ABI, signer)

const mainWithdraw = async () => {

 
  const maxWithdrawPreview = await LPcontract.maxWithdraw(SELF_WALLET_ADDRESS)
 
  console.log("You can currently withdraw a total of " + parseInt(maxWithdrawPreview._hex, 16))

  //const withdraw = await LPcontract.withdraw(010000, SELF_WALLET_ADDRESS, SELF_WALLET_ADDRESS)

  console.log("You can withdraw a total of " + parseInt(maxWithdrawPreview._hex, 16) + " after the last withdraw.")
  
 

}

mainWithdraw()


