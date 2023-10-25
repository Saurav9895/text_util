// props is a properties... aap ne koi component banaya aaur aap us coponent k andar kuch pass karna cahate ho aaur wo component k andar koi variable hai jo ki mai bataunga ky ahi eo props hai 
// propstype tells that what is the type of thet particilar props 
// if we do not pass any value then kon si value use kare wo hota hai 

import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
function App() {
  return (
    <>
      <Navbar title="TextUtils"/>
      {/* <Navbar title="TextUtils" About="About Text"/> */}
      
      <div className="container my-3">
      <TextForm heading="Enter the text to Change below"/>
      </div>
     
    </>
  );
}

export default App;
