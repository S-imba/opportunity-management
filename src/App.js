import './App.css';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import { useEffect, useState } from 'react';
import ebconfig from './Ebconfig';
import LoginButton from './components/LoginButton';
import LogoutButton from './components/LogoutButton';


function App() {
  return (
    <>
      <LoginButton/>
      <LogoutButton/>
    </>
  );
}

function Notes() {
  const { Frame, sync, configureFrame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "NOTES APP", limit : 10})
    sync();
  }, []);
  

  const noteRootStyle = {
    border: "2px #0af solid",
    borderRadius: 9,
    margin: 20,
    backgroundColor: "#efefef",
    padding: 6
  };

  return (
    <div style={{ width: 400 }}>
      {Frame().map(ele => 
        <div style={noteRootStyle}>
          <h3>{ele.title}</h3>
          <p>{ele.description}</p>
          <small>{ele.createdate}</small>
        </div>
      )}
    </div>
  )
}

function NewNoteBtton(){
  const { Frame, sync } = useEasybase();

  const buttonStyle = {
    position: 'absolute',
    left: 10, top: 10, fontSize: 21
  }

  const handleClick = () => {
    const newTitle = prompt('Please enter a title');
    const newDescription = prompt('Please enter the description');

    Frame().push({
      title: newTitle,
      description: newDescription,
      createdate: new Date().toISOString()
    })
    sync();

  }
  return (
    <button style={buttonStyle} onClick={handleClick}>
      Add New Note
    </button>
  );
}


/*<div className="App" style={{ display: "flex", justifyContent: "center" }}>
      <EasybaseProvider ebconfig={ebconfig}>
        <Notes></Notes>
        <NewNoteBtton></NewNoteBtton>
      </EasybaseProvider>
    </div>*/


export default App;