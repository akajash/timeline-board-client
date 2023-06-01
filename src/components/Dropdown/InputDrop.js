import React from 'react'
import {FormGroup, Input} from 'reactstrap'

// const StyledInput = styled.input`
//     height: 2rem;
//     width: 12rem;
//     border-radius: 3px;
//     border: 0;
//     outline: none;
//     position: relative;
//     margin: 0.5rem;
//     padding-left: 0.25rem;
//     font-size: 16px;
//     font-weight: 500;

//     &:focus{
//         outline: none;
//     }
// `

const InputDrop = ({onChange, value, label,loadedValue}) => {
    return(
        <FormGroup>
            <label
                className="form-control-label"
                htmlFor=""
                >
                {label}
                </label>
        <Input onChange={(e) => onChange(e.target.value)} value = {value} className="form-control-alternative"/>

        </FormGroup>
    )
}

export default InputDrop