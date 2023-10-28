// props is a properties... aap ne koi component banaya aaur aap us coponent k andar kuch pass karna cahate ho aaur wo component k andar koi variable hai jo ki mai bataunga ky ahi eo props hai 
// propstype tells that what is the type of thet particilar props 
// if we do not pass any value then kon si value use kare wo hota hai 

import React, { useState } from 'react';
import './App.css';
import About from './components/About';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";


function App() {


  //whether dark mode is enabled or not
  const [mode, setMode] = useState('light');

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(()=>{
setAlert(null);
    }, 1500);
  }


  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('dark');
      document.body.style.backgroundColor = 'black';
      showAlert("Dark Mode has been Enabled", "success")
      document.title='TextUtils - Dark Mode';
      // setInterval(() => {
      //   document.title='TextUtils is Amazing';

      // }, 2000);

      // setInterval(() => {
      //   document.title='Install TextUtils now';

      // }, 1500);


    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
      showAlert("Ligth Mode has been Enabled", "success")
      document.title='TextUtils - Light Mode';

    }
  }
  return (
    <>

    <Router>
      <Navbar title="TextUtils" mode={mode} toggleMode={toggleMode}/>
      {/* <Navbar title="TextUtils" About="About Text"/> */}
      
      <Alert alert={alert}/>
      <div className="container my-3">
      <Switch>
    
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/">
            <TextForm showAlert={showAlert} heading="Enter the text to analyze below" mode={mode}/>
          </Route>
    </Switch>
    </div>
    </Router>
    </>
  );
}

export default App;
