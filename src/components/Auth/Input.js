import React from 'react'


const Input = ({name, label, autoFocus, type, handleShowPassword, onChange,}) => {
    return(
        <div>
            <input type={type} 
            name={name} 
            label={label} 
            onChange={onChange} 
            autoFocus = {autoFocus}
            required 
            inputProps = {name === 'password' ? {
                endAdornment : (
                    <div>
                        <button tpye="button" onClick={handleShowPassword}>
                            {type === "password" ? <div>Hide</div> : <div>Show</div>}
                        </button>
                    </div>
                ) ,
            }: null}/>
                        
        </div>
    )
}

export default Input