import axios from 'axios'
import React, { useEffect, useState } from 'react'
import{ENV_HTTP, ENV_KEY, ENV_IMG_URL, ENV_TOKEN} from '../hook/useRequest'
import { useDispatch, useSelector,  } from 'react-redux'
import {getNowPlayingFilm} from '../store/GetFilmSlice'
import FilmCard from '../components/FilmCard'
import Pagination from '@mui/material/Pagination';



function UpComing() {
const dispatch = useDispatch()
const [nowPlaying, setNowPlaying] = useState(0)
const [count, setCount] = useState(1)
const upComingFilms = useSelector(state => state.films.films)
  useEffect(() => {
axios.get(`${ENV_HTTP}/movie/upcoming?api_key=${ENV_KEY}&page=${count}`,{
  headers: {
    Authorization: "Bearer" + ENV_TOKEN,
  },
}).then(res => {
  setNowPlaying(res.data.total_pages)
  dispatch(getNowPlayingFilm(res.data.results))
})
  }, [count])
  const handleChangePagination = (e, path) => {
    setCount(path)
  }

  return (
    <>
    <div className="flex justify-between flex-wrap gap-10 p-5">
     {upComingFilms?.length > 0
        ?upComingFilms.map((item) => (
          <FilmCard
          id={item.id}
          title={item.title}
              key={item.id}
                image={`${ENV_IMG_URL}${item.poster_path}`}
                overview={item.overview}
              />
        ) )
        : "Loading"}
         <div className="flex items-center justify-center">
        <Pagination onChange={handleChangePagination} count={nowPlaying} color="secondary" />
        </div>
    </div>
    </>
  )
}

export default UpComing