import React, {useRef, useState, useEffect} from 'react'

import { Input } from 'reactstrap'
const CDropdown = ({options,placeholder, onChange, value, label, id, heading}) => {

    const [open,setOpen] = useState(false)
    const [query,setQuery] = useState("")
    //const ref = useRef(null)

    // useEffect(() => {
    //     document.addEventListener("click", close)
    //     return () => document.removeEventListener("click", close)
    // }, [])

    // function close (e){

    //     console.dir([e.target, ref.current])
    //     setOpen(e && e.target === ref.current)
    // }

    const filter = (options) => {
        return options.filter((option) => 
            option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
            
        )
    }

    function displayValue() {
        if (query.length > 0) return query 
        if(value) return value[label]
        return ""
    }

    return(
        <div className='dropdown cdropdown'>
            <label
                className="form-control-label"
                htmlFor=""
                >
                {heading}
                </label>
            <div 
             className='control'
             onClick={() => setOpen(prev => !prev)}>
                 
                <div className='selected-value form-control-alternative'  >
                
                    <Input 
                        type="text" 
                        
                        placeholder = {value ? value[label] : placeholder}
                        value = {displayValue()}
                        onChange = {e => {
                            setQuery(e.target.value)
                            onChange(null)
                        }}
                        onClick = {() => setOpen(prev => !prev)}
                        onFocus = {() => setOpen(true)}
                        
                        
                    />
                </div>
                <div className={`arrow ${open ? "open" : null}`}/>
            </div>
            <div className={`options ${open ? "open" : null}`}>
                {filter(options).map((item) => (
                    <div 
                    key = {item[id]}
                    className={`option ${value === item ? "selected" : null}`} 
                    onClick={() => {
                        setQuery("")
                        onChange(item)
                        setOpen(false)
                    }
                    
                    }>{item[label]}</div>
                ))}
            </div>
        </div>
    )
}

export default CDropdown