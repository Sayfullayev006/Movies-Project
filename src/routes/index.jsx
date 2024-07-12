import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { NowPlaying, Popular, TopRated, UpComing,SingleFilm } from '../pages'

function index() {
    return(
        <Routes>
        <Route path='/' element={<NowPlaying/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/top-rated' element={<TopRated/>}/>
        <Route path='/up-coming' element={<UpComing/>}/>
        <Route path='/film/:id' element={<SingleFilm/>}/>

    </Routes>
    )
    
}
export default index