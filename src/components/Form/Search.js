import React,{useState} from 'react'
import { FormGroup, Input } from 'reactstrap'

const SearchBar = ({placeholder, data,label,idName, onChange, name, value, required}) => {

    const [filteredData, setFilteredData] = useState([])
    const [modal,setModal] = useState(false)

    const handleFilter = (e) => {
        const searchQuery = e.target.value
        const newFilter = data.filter((value) => {
            return value.label.toLowerCase().includes(searchQuery.toLowerCase())
        })
        if(searchQuery === ""){
            setFilteredData([])
        }
        else{
            setModal(true)
            setFilteredData(newFilter)
        }

        [e.target.name] = e.target.value
        
    }

    return (
        <FormGroup>
                <label
                className="form-control-label"
                htmlFor={idName}
                >
                {label}
                </label>
                <Input
                className="form-control-alternative"
                id={idName}
                placeholder={placeholder}
                type= "text"
                onChange= {handleFilter}
                name={name}
                value={value}
                required={required}
                />
                {modal && (
                    <div className='search-data'>
                        {filteredData?.map((value,key) => {
                            return (
                            <a className = "search-data-item"><p key={key}>{value.label}</p></a>
                            )
                        })}
                    </div>
                )}
                
        </FormGroup>
    )
}

export default SearchBar