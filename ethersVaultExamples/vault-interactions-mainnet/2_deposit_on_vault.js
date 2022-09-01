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

const mainDeposit = async () => {

  //  Approves the transaction by allowing the BRLC contract to transfer a maximum number of tokens from your wallet to the vault, making you a shareholder of the vault. Altough we dont have a gas limit, the deposit function needs it as a param, or it wont work. After the deposit has been made, it returns the amount of shares the owner now have. The balanceOf and every method that returns the information can be broken into smaller functions so we can show the information to the user, the wallet information can be brought locally on every pc through the Metamask API.

  const approveTransaction = await BRLCcontract.approve(LPaddress, 100000);
  console.log("Contract is approved, the object is: " + approveTransaction);
  const options = { gasLimit: 3e5 };
  const deposit = await LPcontract.deposit(010000, MY_WALLET, options);
  const walletBalance = await LPcontract.balanceOf(MY_WALLET);
  console.log("You have succesfully deposited, the object is: " + deposit);
  console.log("Your own a total of: " + walletBalance + " of the vault's shares.");

}

mainDeposit()


