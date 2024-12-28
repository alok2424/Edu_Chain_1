import React, { useEffect, useState} from 'react'
import { FaDonate } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, Row, Button } from "reactstrap"
import "./Projects.css"
import { ethers } from 'ethers';
import Web3 from 'web3';

const Projects = ({state}) => {
    const [modal, setModal] = useState(false);
    const [projects,setProjects]=useState("");
    useEffect(()=>{
        const {contract}=state;
        const projectDetails =async()=>{
            const projects = await contract.methods.allProjects().call();
            setProjects(projects)
        }
        contract && projectDetails();
    },[state])
/*
    async function getAccounts() {
      // Get the signer (usually from a wallet library like ethers-wallet)
      const signer = await ethers.getSigner();
    
      // Get the address of the signer
      const address = await signer.getAddress();
    
      // Return just the address (equivalent to web3.eth.getAccounts()[0])
      return address;
    }
*/
    const donateEth=async(event)=>{
        event.preventDefault();
        try{
          const {contract,web3}=state;
         //   const {contract,ethers}=state;
            const eth = document.querySelector("#eth").value;
          const weiValue=web3.utils.toWei(eth,"ether");
        //    const weiValue=ethers.utils.formatEther(eth,"ether");
          const accounts = await web3.eth.getAccounts();
        //    const accounts = await getAccounts();
            await contract.methods.donate().send({from:accounts[0],value:weiValue,gas:480000});
            alert("Transaction Succesful");
        }
    catch(error){
       alert("Transaction Not Succesful");
    }
}
    return (
        <section className="project-section">
            <h1 className="title">Projects </h1>
            <div className="card-wrapper">
                 {projects!=="" && projects.map((project)=>{
                    const githubLink=`https://github.com/alok2424/${project.githubLink}`
                    return ( <a href= {githubLink} className="project-card" target='_blank' rel="noopener noreferrer" >
                    <div className="card-img">
                        <img src={`https://gateway.pinata.cloud/ipfs/${project.image}`} alt="" /></div>
                    <div className="card-text">
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                    </div>
                </a>)
                })} 
           
            </div>
 {/*  =========popup bootstrap==========  */}

 <Modal size='md' isOpen={modal} toggle={() => setModal(!modal)}>
                        <ModalHeader toggle={() => setModal(!modal)}>
                            Enter the ETH you want to donate!
                        </ModalHeader>
                        <ModalBody>
                            <form onSubmit={donateEth}>
                                <Row>
                                    <input id="eth" type="text" />
                                        <Button className='mt-4' >
                                            Send
                                        </Button>
                                </Row>
                            </form>
                        </ModalBody>
                    </Modal>
                    {/*  =========popup bootstrap end==========  */}
                    <p className='donate' onClick={() => setModal(true)}>Liked the project's ? Consider donating Eth's <FaDonate className='icon' /></p>
        </section>
    )
}

export default Projects
