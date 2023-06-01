import React, { useState,useEffect,useRef } from 'react';
import { FormGroup } from 'reactstrap';

const CustomSelect = ({options, prompt, value, onChange, id ,label,heading}) => {
    
    const [open, setOpen] = useState(false)
    const ref = useRef()

    // useEffect(() =>{
    //     let handler = (event) => {
    //     if(!ref.current.contains(event.target)) {
    //         setOpen(false)
    //     }
    //     }
    //     document.addEventListener("mousedown",handler)

    //     return () => {
    //         document.removeEventListener("mousedown",handler)
    //     }
    // })

    const [query,setQuery] = useState("")

    useEffect(() => {
        ["click","touchend"].forEach(e => {
            document.addEventListener(e, toggle)
        })
        
        return () => ["click","touchend"].forEach(e => {
            document.removeEventListener(e,toggle);
        })
        
    },[])

 const toggle = (e) => {
    
    setOpen(e && e.target === ref.current)
 }

//  const filter = (options) => {
     
//      return options.filter((option) => 
        
//         option.label.toLowerCase().indexOf(query.toLowerCase()) > -1 
        
//     )
//  }

const displayValue = () => {
    
    if(value) {
        
        // return options[value-1]?.label;
        return value
    }
    
    return ""
}

const selectOption = (option) => {
    setQuery("");
    onChange(option);
    setOpen(false);
}

    
    return(
        <FormGroup>
        <label
            className="form-control-label"
            htmlFor="input-designation"
            >
            {heading}
            </label>
        <div className="dropdown form-control form-control-alternative" id="input-designation">
            <div className="control" >
                <div className="selected-value">
                    <input type="text"
                    ref={ref}
                    placeholder={value ? value.label : prompt}
                    value= {displayValue()}
                    onChange = {e => {
                        
                        onChange(null)
                    }}
                    onClick = {toggle}
                    onTouchEnd={toggle}
                    
                    />
                </div>
                <div className={`arrow ${open ? "open" : null}`} onClick={toggle} />
            </div>
            <div className={`options ${open ? "open" : null}`}>
                {options.map(option => (
                <div key={option.label}
                    className={`option ${value === option ? "selected" : null}`}
                    onClick={() => selectOption(option.label)}
                    onTouchEnd={() => selectOption(option.label)}

    

                >{option.label}</div>
                
                ))}
            </div>
        </div>
        </FormGroup>
            
        
    )
}

export default CustomSelect