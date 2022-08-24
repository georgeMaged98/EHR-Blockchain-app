import { ethers } from 'ethers'

// Import ABI Code to interact with smart contract
import App from '../artifacts/contracts/App.sol/App.json'

const cliniAppAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

// Requests access to the user's Meta Mask Account
// https://metamask.io/
async function requestAccount() {
  await window.ethereum.request({ method: 'eth_requestAccounts' })
}

const getContract = async () => {
  try {
    // If MetaMask exists
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount()

      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()

      const contract = new ethers.Contract(cliniAppAddress, App.abi, signer)
      return contract
    }
  } catch (err) {
    console.log(err)
    return null
  }
}

export { getContract }
