require('dotenv').config();
const { ethers } = require("ethers");
const  VAULT_ABI  = require("./VAULT_ABI.json");
const BRLC_ABI = require("./BRLC_ABI.json")
const { PRIVATE_KEY, MY_WALLET } = process.env;


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

const mainReadingVault = async () => {

  // Shos us 
  const vaultAsset = await LPcontract.asset()
  const totalAssets = await LPcontract.totalAssets()
  const totalSupply =  await LPcontract.totalSupply()


  console.log("The vault is based on testnet BRLC, the current address is: " + vaultAsset)
  console.log("There is a total of: " + parseInt(totalAssets._hex, 16) + " underlying assets stored in the vault.")
  console.log("There is a total of: " + parseInt(totalSupply._hex, 16) + " unredeemed vault shares in circulation.")
 

}

mainReadingVault()


