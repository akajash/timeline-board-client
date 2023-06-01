import React from 'react'

import {
    FormGroup,
    Input,
   
    Col,
    
  } from "reactstrap";

const CustomInput = ({idName, label, name, onChange, type, placeholder,col,value,required,ref}) => {
    return(
        <Col lg={col}>
            <FormGroup>
                <label
                className="form-control-label"
                htmlFor={idName}
                >
                {label}
                </label>
                <Input
                className="form-control-alternative"
                // defaultValue="lucky.jesse"
                id={idName}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                name={name}
                value={value}
                required={required}
                ref={ref}
                />
            </FormGroup>
        </Col>
    )
}

export default CustomInput;