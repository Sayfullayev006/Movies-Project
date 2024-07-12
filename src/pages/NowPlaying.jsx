import React, { useEffect, useState } from "react";
// import FilmCard from '../components/FilmCard'
import axios from "axios";
import { ENV_KEY, ENV_HTTP, ENV_TOKEN } from "../hook/useRequest";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingFilm } from "../store/GetFilmSlice";
import FilmCard from "../components/FilmCard"
import Pagination from '@mui/material/Pagination';


function NowPlaying() {
  const nowPlayingList = useSelector((state) => state.films.films);
  const dispatch = useDispatch();
  const [nowPlaying, setNowPlaying] = useState(0)
 const [count, setCount] = useState(1)
  // console.log(import.meta.env.VITE_API_KEY)
  useEffect(() => {
    axios
      .get(`${ENV_HTTP}/movie/now_playing?api_key=${ENV_KEY}&page=${count}`, {
        headers: {
          Authorization: "Bearer" + ENV_TOKEN,
        },
      })
      .then((res) => {
        setNowPlaying(res.data.total_pages)
        dispatch(getNowPlayingFilm(res.data.results));
      });
  }, [count]);
  
  const handleChangePagination = (e, path) => {
    setCount(path)
  }
  return (
    <>
    <div className="flex justify-between flex-wrap gap-10 p-5">
      {nowPlayingList?.length > 0
        ?nowPlayingList.map((item) => (
          <FilmCard id={item.id}
          title={item.title}
              key={item.id}
                image={`${item.poster_path}`}
                overview={item.overview}
              />
        ) )
        : "Loading"}
    </div>
    <div className="flex items-center justify-center">
        <Pagination onChange={handleChangePagination} count={nowPlaying} color="secondary" />
        </div>
    </>
  );
}

export default NowPlaying;
