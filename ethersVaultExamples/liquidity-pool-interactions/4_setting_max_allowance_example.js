const { ethers, providers } = require("ethers");
const ABI = require("./BRLC_ABI.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.testnet.cloudwalk.io"
);

const brlcContractaddress = "0xC6d1eFd908ef6B69dA0749600F553923C465c812"; // Liquidity pool contract address

const signer = new ethers.Wallet(
  "a32bf07df68bfc5267252a4f891ec23c23430b1393c4176794f0ebc42a72627c",
  provider
);

const contract = new ethers.Contract(brlcContractaddress, ABI, signer); 

const main = async () => {
  const options = { gasLimit: 3e5 }; // se usar esse gasLimit aí nao dá erro
  const myWallet = "0x0D50AB2b552A2D2e6cdaFd367e6e78f392A2f06F";
  const lpAddress = "0x37295fcbb3867fd98C292Df1634736B2FEEEDe3D";
  console.log(await contract.approve(lpAddress, 100000));
  const balance = await contract.allowance(myWallet, lpAddress);
  console.log(parseInt(balance._hex, 16));
};

main();



// const { ethers, providers } = require("ethers");
// const ABI = require("./BRLC_ABI.json");


// const provider = new ethers.providers.JsonRpcProvider(
//   "https://rpc.testnet.cloudwalk.io"
// );

// const brlcContractaddress = "0xd898e193a8a2138b4be66e5bd8772bb352c8fd23"; // Liquidity pool contract address

// const signer = new ethers.Wallet(
//   "83c2458f04be0b2f206df35d9b27a9cc0d063d9eb87cf8388506b0ed0a844327",
//   provider
// );

// const contract = new ethers.Contract(brlcContractaddress, ABI, signer);

// const main = async () => {
//   const options = { gasLimit: 3e5 }; // se usar esse gasLimit aí nao dá erro
//   const myWallet = "0x440B5d69C45775a6905a9f8E1e157cbF74f7A56b";
//   const lpAddress = "0x37295fcbb3867fd98C292Df1634736B2FEEEDe3D";
//   console.log(await contract.approve(lpAddress, 100000));
//   const balance = await contract.allowance(myWallet, lpAddress);
//   console.log(parseInt(balance._hex, 16));
// };

// main();