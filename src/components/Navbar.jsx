import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {ENV_HTTP, ENV_IMG_URL, ENV_KEY, ENV_TOKEN} from '../hook/useRequest'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { navigate } from 'react-router-dom';
export default function Navbar() {
const navigate = useNavigate()
const [searchData, setSearchData] = useState([{label:"", yaer:""}])
 const searchMovie = (e) => {
  axios.get(`${ENV_HTTP}/search/movie?query=${e.target.value}&include_adult=false&api_key=${ENV_KEY}`,{
    headers: {
      'Authorization': `Bearer${ENV_TOKEN}`  ,
    },
  }).then(res => {
    setSearchData(res.data.results.map(item => {
      return {label:item.title, year:item.id}
    }));
  })
 }
 const handleSearchChange = (e, value) => {
  navigate(`/film/${value.year}`)
 }
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
           Films
          </Typography>
          <Autocomplete
          onChange={handleSearchChange}
          onKeyUp={searchMovie}
           disablePortal
          id="combo-box-demo"
          options={searchData}
           sx={{ width: 300, backgroundColor: "white", borderRadius: "5px", position:"absolute", ml:"800px"}}
           size='small'
          renderInput={(params) => <TextField {...params} label="Movie" />}
          />
          <ul className='flex items-center space-x-10 ml-14'>
            <li>
                <NavLink to={ '/'}>Now Playing</NavLink>
            </li>
            <li>
                <NavLink to={ '/popular'}>Popular</NavLink>
            </li>
            <li>
                <NavLink to={ '/top-rated'}>Top Rated</NavLink>
            </li>
            <li>
                <NavLink to={ '/up-coming'}>Up coming</NavLink>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
