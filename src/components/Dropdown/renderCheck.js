import React from 'react'

const RenderCheck = ({value, list, setValue, toggle, setToggle, setData, name}) => {
    if(value){
        const filteredList = list.filter(item => item.name.toString().toLowerCase().startsWith(value.toLowerCase()))

    

        if (filteredList.length){
            return (
                toggle && (
                    <div className='dropdown-list'>
                        {filteredList.map((item) => <div className='dropdown-option' onClick={() => { setToggle(false); setValue(item.name); setData({allocated_to: {id: item._id, name: item.name}})}}>{item.name}</div>)}
                    </div>
                )
            )
        }
        return (
            <div>
                Not found
            </div>
        )
    }
    return null
    
}

export default RenderCheck