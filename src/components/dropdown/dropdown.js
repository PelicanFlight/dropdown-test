import { getByDisplayValue } from '@testing-library/react'
import React, {useRef, useState, useEffect } from 'react'
import "./style.css"



const Dropdown = ({options, prompt, value, onChange, id, label}) => {
  
const [open, setOpen] = useState(false)
const [query, setQuery] = useState("")
const [isVisible, setVisible] = useState(false)
const [cursor, setCursor] = useState(0)
const [queryVal, setQueryVal] = useState("")


const ref = useRef(null)


useEffect(() => {
["click", "touchend"].forEach(e => {document.addEventListener(e,toggle ) })

return ()=> ["click", "touchend"].forEach(e => {document.removeEventListener("click",toggle)})

}, [])


const toggle =(e) => {
setOpen( e && e.target === ref.current)
}


// Search

const filter =(options) => {
    return options.filter((option) => 
    option[label].toLowerCase().indexOf(query.toLocaleLowerCase()) > -1)
}


const displayValue =() => {
    if(query.length > 0) return query
    if(value) return value[label];
    return ""; 
}

// Navigate keyboard

const showOptions = () => setOpen(true)
const hideOptions = () => setOpen(false)

const keyboardNavigation = (e) => {
    if(e.key === "ArrowDown") {
        open ? 
        setCursor (c => (c < options.length - 1 ? c + 1 : c)) : showOptions()
    }
    if(e.key === "ArrowUp") {
        setCursor (c => (c > 0 ? c - 1 : 0));
    }
    if(e.key === "Escape") {
hideOptions()
    }
    if(e.key === "Enter" && cursor > 0) {
        setQuery(options[cursor].name)  
hideOptions()
    }
}



  return (

    <div className='dropdown'>
        <div className='control' >

<div className='selected-value' >
<input 
type='text' 
ref={ref} 
placeholder={value ? value[label] : prompt}
value={displayValue()}
onChange={e => {
    setQuery(e.target.value)
    onChange(null)
}}
onClick={toggle}
onKeyDown={e=> keyboardNavigation(e)}
/>

</div>

<div className={`arrow ${open ? 'open' : null}`} /></div>
<div className= {`options ${open ? 'open' : null}`}>



{/* items */}

{filter(options).map((option, idx) => 
    (
<div 
key={option.name}
className={`option ${value === option || cursor === idx ? 'selected' : null}`}
onClick={()=> {
    setQuery("")
     setOpen(false);
    onChange(option);
 
}}>{option[label]}</div>
))}
          
         </div>
    </div>
  )
}

export default Dropdown