import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        // console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText) 
    }

    const handleLowClick = ()=>{
        let convertedText = text.toLowerCase();
        setText(convertedText)
    }
    const handleOnChange = (event)=>{
        // console.log("On Changed");
        setText(event.target.value);
    }
    const handleClear = ()=>{
        let clearText = "";
        setText(clearText);
    }

    const [text, setText] = useState('');
    return (
        <>
    <div className='container'>
       <h1>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="10"></textarea>
        </div>
         <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
         <button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to Lowercase</button>
         <button className="btn btn-primary mx-1" onClick={handleClear}>Clear Text</button>

        </div>
        <div className="container my-3">
            <h2>Your text summary</h2>
            <p>{text.split(" ").length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(" ").length} Minutes Read</p>

            <h3>Preview</h3>
            <p>{text}</p>
        </div>
    </>
  )
}
