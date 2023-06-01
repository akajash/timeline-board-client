import React from 'react'
import { useState } from 'react'

import RenderCheck from './renderCheck'
import InputDrop from './InputDrop.js'


const SearchQuery = ({list,setData, label,name,value,setValue}) => {
    
    const [toggle,setToggle] = useState(true)
    

    return(
        <>
        <div>
        <InputDrop
            onChange = {(inputValue) => {setValue(inputValue) ; setToggle(true)}}
            value = {value}
            label = {label}
            
        />
            <RenderCheck
                value = {value}
                list = {list}
                setValue = {setValue}
                toggle = {toggle}
                setToggle = {setToggle}
                setData = {setData}
                name = {name}
            />
        </div>
        </>
    )
}

export default SearchQuery
