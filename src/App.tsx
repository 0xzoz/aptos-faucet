import React from 'react';
import Modal from 'react-modal';
import logo from './logo.jpg';
import aptosLogo from './aptos_logo_wordmark_transparent_blk.png';
import Button from '@mui/material/Button';
import {TxnRequest, Account, RestClient, FaucetClient} from './ts/accounts'
import './App.css';

export const TESTNET_URL = "https://fullnode.devnet.aptoslabs.com";
export const FAUCET_URL = "https://faucet.devnet.aptoslabs.com";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modal, setModalNumber] = React.useState(0);
  const [pubKey, setPubKey] = React.useState('');
  const [privKey, setPrivKey] = React.useState('');
  const [authKey, setAuthKey] = React.useState('');

  function openModal(e: any) {
    setModalNumber(e.target.id)
    if(e.target.id == 1){
      createAccount();
    }
    setIsOpen(true);
  }

  function closeModal(e: any) {
    setModalNumber(0)
    setPrivKey('');
    setIsOpen(false);
  }

  function createAccount(){
    let acc = new Account();
    setPubKey(acc.pubKey());
    setPrivKey(acc.privKey());
    setAuthKey(acc.authKey());
  }

  function requestFunds(){


  }







  return (
    <div className="App">
      <header className="App-header">
          <div className='Title'>
            <img src={aptosLogo} className="Aptos-logo" alt="Aptos logo"/> 
            <p className="Aptos-text">faucet</p>
          </div>
            <img src={logo} className="App-logo" alt="logo" />
          <div >
            <Button id="1" onClick={openModal}>CREATE ACCOUNT</Button>
            <Button id="2" onClick={openModal}>REQUEST FUNDS</Button>
          </div>
      </header>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {modal == 1 ? 
          <div className="New-account-modal">
            <h2 > New Account Created</h2>
            <p>Please store the private key in a safe place. You will not be able to retrieve it if it is lost</p>
            <h4>Public Key</h4>
            <h4>{pubKey}</h4>
            <h4>Auth Key</h4>
            <h4>{authKey}</h4>
            <h4>Private Key</h4>
            <h4>{privKey}</h4>
          </div>

        :
        
        <div>
            <h2 >Get Funds</h2>
            <h4>Address</h4>
            <h4>{pubKey}</h4>
            <h4>Amount</h4>
            <h4>{privKey}</h4>
        </div>
        }
      </Modal>
    </div>
  );
}

export default App;
