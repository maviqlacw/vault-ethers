const { ethers, providers } = require("ethers");
const ABI = require("./BRLC_ABI.json");

const provider = new ethers.providers.JsonRpcProvider(
  "https://rpc.mainnet.cloudwalk.io/"
);

const brlcContractaddress = "0xA9a55a81a4C085EC0C31585Aed4cFB09D78dfD53"; // Liquidity pool contract address

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
