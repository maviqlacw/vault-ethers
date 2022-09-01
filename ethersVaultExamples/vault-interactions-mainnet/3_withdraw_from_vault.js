require('dotenv').config();
const { ethers } = require("ethers");
const VAULT_ABI = require("./VAULT_ABI.json");
const BRLC_ABI = require("./BRLC_ABI.json")
const { PRIVATE_KEY, MY_WALLET } = process.env;

const provider = new ethers.providers.JsonRpcProvider('https://rpc.mainnet.cloudwalk.io/') //Testnet RPC
const brlcMainAddress = '0xA9a55a81a4C085EC0C31585Aed4cFB09D78dfD53' //BRLC mainnet
const brlcTestAddress = '0xC6d1eFd908ef6B69dA0749600F553923C465c812' //BRLC Testnet
const LPaddress = '0x37295fcbb3867fd98C292Df1634736B2FEEEDe3D' //VAULT Address

const signer = new ethers.Wallet(
  PRIVATE_KEY,
  provider
);

const LPcontract = new ethers.Contract(LPaddress, VAULT_ABI, signer)
const BRLCcontract = new ethers.Contract(brlcMainAddress, BRLC_ABI, signer)

const mainWithdraw = async () => {

  //Shows how much of the vault's shares you can withdraw based on previously deposited assets. This function can be broken into smaller ones, so that we can show the information to the user.
  const maxWithdrawPreview = await LPcontract.getMyBalance(MY_WALLET)
  console.log("You can currently withdraw a total of " + parseInt(maxWithdrawPreview._hex, 16))

  // Withdraw the amount of shares equal to the first param and turn into assets. 
  const withdraw = await LPcontract.withdraw(010000, MY_WALLET, MY_WALLET)

}

mainWithdraw()


