import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        // console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to UpperCase", "success");
 
    }

    const handleLowClick = ()=>{
        let convertedText = text.toLowerCase();
        setText(convertedText)
        props.showAlert("Converted to LowerCase", "success");

    }
    const handleOnChange = (event)=>{
        // console.log("On Changed");
        setText(event.target.value);
    }
    const handleClear = ()=>{
        let clearText = "";
        setText(clearText);
        props.showAlert("Text Cleared", "success");

    }
    const handleCopy=() => {
        var text = document.getElementById("myBox");
        text.select()
        navigator.clipboard.writeText(text.value);
        props.showAlert("Text Copied to clipboard", "success");

    }

    const [text, setText] = useState('');
    return (
        <>
    <div className='container' style={{color: props.mode==='dark'?'white':'black'}}>
       <h1>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor: props.mode==='dark'?'black':'white', color:props.mode==='dark'?'white':'black'}} id="myBox" rows="10"></textarea>
        </div>
         <button className="btn btn-primary mx-1" onClick={handleUpClick}>Convert to Uppercase</button>
         <button className="btn btn-primary mx-1" onClick={handleLowClick}>Convert to Lowercase</button>
         <button className="btn btn-primary mx-1" onClick={handleClear}>Clear Text</button>
         <button className="btn btn-primary mx-1" onClick={handleCopy}>Copy Text</button>

        </div>
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'black'}}>
            <h2>Your text summary</h2>
            <p>{text.split(" ").length} words and {text.length} characters</p>
            <p>{0.008 *  text.split(" ").length} Minutes Read</p>

            <h3>Preview</h3>
            <p>{text.length>0?text:"Enter something in the text above to preview it here"}</p>
        </div>
    </>
  )
}
