import './App.css';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect, useState } from 'react';
import ebconfig from './Ebconfig';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';


function App() {
  return (
    <>
    <div>
      <LoginButton></LoginButton>
      <LogoutButton/>
    </div>
    <div className="App" style={{ display: "flex", justifyContent: "center" }}>
        <EasybaseProvider ebconfig={ebconfig}>
          <Notes></Notes>
          <NewAccountBtton></NewAccountBtton>
        </EasybaseProvider>
    </div>
    </>
  );
}

function Notes() {
  const { Frame, sync, configureFrame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "ACCOUNTS", limit : 10})
    sync();
  }, []);
  

  const accountRootStyle = {
    border: "2px #0af solid",
    borderRadius: 9,
    margin: 20,
    backgroundColor: "#efefef",
    padding: 6
  };

  return (
    <div style={{ width: 400 }}>
      {Frame().map(ele => 
        <div style={accountRootStyle}>
          <h3>{ele.title}</h3>
          <p>{ele.address}</p>
          <small>{ele.email}</small>
        </div>
      )}
    </div>
  )
}

function NewAccountBtton(){
  const { Frame, sync } = useEasybase();

  const buttonStyle = {
    position: 'absolute',
    right: 10, top: 10, fontSize: 21
  }

  const handleClick = () => {
    const newTitle = prompt('Please enter a account name');
    const newAddress = prompt('Please enter the address');
    const newEmail = prompt('Please enter the email address');

    Frame().push({
      title: newTitle,
      address: newAddress,
      email: newEmail
    })
    sync();

  }
  return (
    <button style={buttonStyle} onClick={handleClick}>
      Add Account
    </button>
  );
}


/**/


export default App;