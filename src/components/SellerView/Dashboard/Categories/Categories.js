import React from 'react'
import AddCategory from "./AddCategory/AddCategory"
import CategoryLog from './CategoryLog/CategoryLog'
import "./Categories.css"

const Categories = ({categories, setCategories}) => {
  return (
    <div className='category'>
        <div>
            <CategoryLog categories={categories} setCategories={setCategories}/> 
            
        </div>
        
        <div>
            <AddCategory categories={categories} setCategories={setCategories}/>
        </div>
    </div>
  )
}

export default Categories
