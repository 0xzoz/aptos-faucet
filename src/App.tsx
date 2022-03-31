import React from 'react';
import Modal from 'react-modal';
import logo from './logo.jpg';
import aptosLogo from './aptos_logo_wordmark_transparent_blk.png';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
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
    minWidth: '50%',
    transform: 'translate(-50%, -50%)',
  },
};


function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modal, setModalNumber] = React.useState(0);
  const [warning, setWarning] = React.useState(false);
  const [warningType, setWarningType] = React.useState(true);
  const [warningMessage, setWarningMessage] = React.useState('Funds added to Account');
  const [address, setAddress] = React.useState('');
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
    setAddress(acc.address());
    setPubKey(acc.pubKey());
    setPrivKey(acc.privKey());
    setAuthKey(acc.authKey());
  }

  async function requestFunds(inputs: any){
    console.log(inputs)
    try{
    const restClient = new RestClient(TESTNET_URL);
    const faucetClient = new FaucetClient(FAUCET_URL, restClient);
    await faucetClient.fundAccount(pubKey, 993_000_000);
    let balance = await accountBalance(restClient);
    closeModal(null)
    setWarningType(true);
    setWarningMessage('Account ' + address + ' funded. Balance is now ' + balance )
    showWarning()

    }catch(e){
      closeModal(null)
      setWarningType(false);
      setWarningMessage('Error occured: ' + e )
      showWarning()
      console.log(e)
    }
  }

  async function accountBalance(client: any){

  let balance = await client.accountBalance(address);
  
  console.log(balance);
  return balance;
  }

  function showWarning(){
    setWarning(true);
    clearWarning();
  }

  function clearWarning(){
    setTimeout(() => {
      setWarning(false);
    }, 3000)


  }







  return (
    <div className="App">
      {warning ? <div><Alert className="Alert" severity={warningType ? 'success' : 'warning'}>{warningMessage}</Alert></div>:<div></div>}

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
      <p className='Made-with'> Made with ❤️ by <a href='https://twitter.com/0xZOZ'>0xZOZ</a> </p>
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
            <h4>Address</h4>
            <h4>{address}</h4>
            <h4>Public Key</h4>
            <h4>{pubKey}</h4>
            <h4>Auth Key</h4>
            <h4>{authKey}</h4>
            <h4>Private Key</h4>
            <h4>{privKey}</h4>
          </div>

        :
        
        <div className='Request-funds-modal'>
            <h2 >Request Funds</h2>
            <Grid container spacing={2}>
              <Grid item xs={12} >  
                <TextField id="standard-basic" fullWidth helperText="If this is a newly generated Account you will need to input the Auth Key" label="Address" variant="standard" defaultValue={pubKey}/>
              </Grid>
              <Grid item xs={12} >  
                <TextField id="standard-basic" fullWidth label="Amount" variant="standard" defaultValue="0"/>
              </Grid>
              <Grid item xs={12} >  
                <Button id="1" onClick={requestFunds}>Get Funds</Button>
              </Grid>
            </Grid>
        </div>
        }
      </Modal>
    </div>
  );
}

export default App;
