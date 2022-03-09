import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./AddCategory.css"
import { grey } from '@mui/material/colors';
import { useState } from 'react';
import { Typography } from '@mui/material';

export default function AddCategory({categories, setCategories}) {

  const [title, setTitle]=useState("");
  const [description, setDescription]=useState("");
  const [img, setImg]=useState("");
  const [errorTitle, setErrorTitle]=useState(false);
  const [errorDescription, setErrorDescription]=useState(false);
  const [errorImg, setErrorImg]=useState(false);

  const fieldValidation=(title, description, img)=>{
    if(title==="" || description==="" || img===""){
      if(title==="") setErrorTitle(true);
      else  setErrorTitle(false)

      if(description==="") setErrorDescription(true);
      else  setErrorDescription(false)

      if(img==="") setErrorImg(true);
      else  setErrorImg(false)
      
      return false;
    }
    setErrorTitle(false)
    setErrorDescription(false)
    setErrorImg(false)
    return true;
  }

  const handleSubmit=()=>{
    if(!fieldValidation(title, description, img));
    else{
      const category={
        title:title,
        description:description,
        img:img,
        status:true,
      }
      setCategories([...categories, category]);
      setTitle("")
      setDescription("")
      setImg("")
    }
  }

  return (
    <div className='addCategory'>
      <Card sx={{ width: 350, backgroundColor:grey[100], borderRadius:5 }}>
        <CardContent>
          <form>
              <div className='addCategoryForm'>
              <div className='form-component form-title'></div>
                <Typography><h1>Add a category</h1></Typography>
              <div className='form-component title-field'>
                <TextField required id="outlined-required" label="Title" sx={{width:300}} value={title} 
                onChange={(e)=>setTitle(e.target.value)} error={errorTitle} helperText={errorTitle===true?"Missing entry":""}/>
              </div>
              <div className='form-component desc-field'>
                <TextField required id="outlined-required" label="Description" sx={{width:300}} value={description} 
                onChange={(e)=>setDescription(e.target.value)} error={errorDescription} helperText={errorDescription===true?"Missing entry":""}/>
              </div>
              <div className='form-component img-field'>
                <TextField required id="outlined-required" label="Image Link" sx={{width:300}} value={img} 
                onChange={(e)=>setImg(e.target.value)} error={errorImg} helperText={errorImg===true?"Missing entry":""}/>
              </div>
              <div className='form-component submit-btn'>
                <Button variant="contained" size="large" sx={{width:"200px"}} onClick={handleSubmit}>Submit</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}