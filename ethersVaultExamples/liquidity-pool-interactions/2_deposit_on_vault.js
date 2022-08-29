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

const mainDeposit = async () => {

  //  
  //const ownerShares = await contract.balanceOf(signer)
  //console.log(await contract.allowance(SELF_WALLET_ADDRESS, LPaddress));
  //const balance = await contract.allowance(SELF_WALLET_ADDRESS, LPaddress);
  //console.log(parseInt(balance._hex, 16));
  const approveTransaction = await BRLCcontract.approve(LPaddress, 100000)
  console.log("Contract is approved, the object is: " + approveTransaction);
  const options = { gasLimit: 3e5 };
  const deposit = await LPcontract.deposit(010000, SELF_WALLET_ADDRESS, options)
  const walletBalance = await LPcontract.balanceOf(SELF_WALLET_ADDRESS)
  console.log("You have succesfully deposited, the object is: " + deposit)
  console.log("Your own a total of: " + walletBalance + " of the vault's shares.")
  

   //console.log("The address of the vault asset is: " + asset)
   //console.log("The referenced owner has a total of: " + ownerShares + " shares")
 

}

mainDeposit()


