import React from 'react';
import Modal from 'react-modal';
import logo from './logo.jpg';
import aptosLogo from './aptos_logo_wordmark_transparent_blk.png';
import Button from '@mui/material/Button';
import './App.css';


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
  const [modal1IsOpen, setIsOpen] = React.useState(false);
  const [modal, setModalNumber] = React.useState(0);

  function openModal(e: any) {
    setModalNumber(e.target.id)
    setIsOpen(true);
  }



  function closeModal(e: any) {
    setModalNumber(0)
    setIsOpen(false);
  }

  return (
    <div className="App">
      <header className="App-header">
          <div>
            <img src={aptosLogo} className="Aptos-logo" alt="Aptos logo"/> 
            <p className="Aptos-text">faucet</p>
          </div>
            <img src={logo} className="App-logo" alt="logo" />
          <div>
            <Button id="1" onClick={openModal}>CREATE ACCOUNT</Button>
            <Button id="2" onClick={openModal}>REQUEST FUNDS</Button>
          </div>
      </header>

      <Modal
        isOpen={modal1IsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {modal == 1 ? 
          <div>
        <h2 >Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form>
        </div>

        :
        
        <div>

        </div>
        }
      </Modal>
    </div>
  );
}

export default App;
