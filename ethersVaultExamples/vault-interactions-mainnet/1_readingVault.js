require('dotenv').config();
const { ethers } = require("ethers");
const VAULT_ABI = require("./VAULT_ABI.json");
const BRLC_ABI = require("./BRLC_ABI.json")
const { PRIVATE_KEY, MY_WALLET } = process.env;


const provider = new ethers.providers.JsonRpcProvider('https://rpc.mainnet.cloudwalk.io/') //Testnet RPC
const brlcMainAddress = '0xA9a55a81a4C085EC0C31585Aed4cFB09D78dfD53' //BRLC mainnet
const brlcTestAddress = '0xC6d1eFd908ef6B69dA0749600F553923C465c812' //BRLC Testnet
const LPaddress = '0x1F9E41691fa8aC1EE8DA7398749d94CF871980e0' //VAULT Address

const signer = new ethers.Wallet(
  PRIVATE_KEY,
  provider
);

const LPcontract = new ethers.Contract(LPaddress, VAULT_ABI, signer)
const BRLCcontract = new ethers.Contract(brlcTestAddress, BRLC_ABI, signer)

const mainReadingVault = async () => {

  // Shows us the  information regarding the whole vault. The vaultAsset returns the token address by which the vault is based, the token can be set via the initialization method on the ERC4626. Total Assets returns the total of underlying assets on the vault, and Total Supply shows the total of shares stored in the vault. This function is can be useful to show the information to the user, but its not a current priority.
  const vaultAsset = await LPcontract.asset()
  const totalAssets = await LPcontract.totalAssets()
  const totalSupply = await LPcontract.totalSupply()

  console.log("The vault is based on testnet BRLC, the current address is: " + vaultAsset)
  console.log("There is a total of: " + parseInt(totalAssets._hex, 16) + " underlying assets stored in the vault.")
  console.log("There is a total of: " + parseInt(totalSupply._hex, 16) + " unredeemed vault shares in circulation.")

}

mainReadingVault()


