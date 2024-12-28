import {useState} from "react";
import ABI from "./ABI.json";
import './Wallet.css';
import {ethers,BrowserProvider,Contract} from "ethers";
import Web3 from "web3";
const contractAddress = "0xA7c8B0D74b68EF10511F27e97c379FB1651e1eD2";

const Wallet =({saveState})=>{
      const [connected,setConnected]=useState(true);
      const [account,setAccount] = useState(null);
      const [contract,setContract] = useState(null);
      const isAndroid = /android/i.test(navigator.userAgent);
      const connectWallet =async()=>{
      
        try{ 
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({method:'eth_requestAccounts'});
        const contract = new web3.eth.Contract(
            ABI,
            "0xA7c8B0D74b68EF10511F27e97c379FB1651e1eD2"
        );
         setConnected(false);
         saveState({web3:web3,contract:contract});
        
         }catch(error){
        alert("Please Install Metamask");
       }
      /*
       if(window.ethereum){
        try{
          const provider = new BrowserProvider(window.ethereum);
          await provider.send("eth_requestAccounts",[]);
          const signer = await provider.getSigner();

          const accountAddress = await signer.getAddress();

          //create contract instance with signer
          const contractInstance = new Contract(
            contractAddress,
            ABI,
            signer
          );
          console.log("contract instance: ", contractInstance)
          setConnected(false);
          setAccount(accountAddress);
          setContract(contractInstance);
          saveState({web3:web3,contract:contractInstance});
        }catch(error){
          console.error("Error connecting to MetaMask:", error);
        }
       }else{
        alert("MetaMask not detected. Please install Metamask");
       }
        */
      };

      return<>
      <div className="header">
      {isAndroid  && <button className="connectBTN">
         <a href="https://metamask.app.link/dapp/sriche.netlify.app/">Click For Mobile</a>
        </button>  } 
       <button className="connectBTN" onClick={connectWallet} disabled={!connected}> {connected? "Connect Metamask":"Connected"}</button>
      </div>
      </>
}
export default Wallet;