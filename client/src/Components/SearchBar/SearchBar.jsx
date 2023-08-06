import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { getRecipesName } from '../../Redux/actions'
import style from "./SearchBar.module.css"

export default function SearchBar() {
    const dispatch = useDispatch()
    const [title, setTitle] = useState("")
    const [error, setError] = useState("")

    const handleTitle = (event) =>{
        setTitle(event.target.value)
    }
    const handleSearch = (event) =>{
        if(title === ""){
            setError("Enter a search term")
        }
        dispatch(getRecipesName(title));
        setError("")
    }
  return (
    <div className={style.SearchBar}>
        <input
        type='search'
        value={title}
        onChange={handleTitle}
        placeholder='Search...'>
        </input>
        <button onClick={handleSearch}>SEARCH</button>
        {error && <p>{error}</p>}
    </div>
  )
}
