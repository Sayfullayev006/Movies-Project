import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import{ENV_HTTP, ENV_KEY, ENV_TOKEN, ENV_IMG_URL} from '../hook/useRequest'
import axios from 'axios'
import FilmCard from '../components/FilmCard'
import Youtube from 'react-youtube'
// import { data } from 'autoprefixer'
// import { InsertEmoticon } from '@mui/icons-material'

function SingleFilm() {
  const [singleData, setSingleData] =useState({})
  const {id} = useParams()

  useEffect(() => {
axios.get(`${ENV_HTTP}/movie/${id}?api_key=${ENV_KEY}`,{
  headers: {
    'Authorization': `Bearer ${ENV_TOKEN}`  ,
  },
}).then(res =>{
  setSingleData(res.data)
})
  },[])

  const [videos, setVideos] = useState([])
  useEffect(() => {
    axios.get(`${ENV_HTTP}/movie/${id}/videos?language=en-US?api_key=${ENV_KEY}`,{
      headers: {
        'Authorization': `Bearer ${ENV_TOKEN}`  ,
      },
    }).then(res => {
      setVideos(res.data.results)
    })
  },[])

  const [actors, setActors] = useState([])
  useEffect(() => {
    axios.get(`${ENV_HTTP}/movie/${id}/credits?language=en-US?api_key=${ENV_KEY}`,{
      headers: {
        'Authorization': `Bearer ${ENV_TOKEN}`  ,
      },
    }).then(res => {
      console.log(res);
      setActors(res.data.cast)
    })
  },[])
  return (
    <div className='mt-5 ml-5'>
      <FilmCard id={singleData.id}
      image={singleData.poster_path}
      overview={singleData.overview}
      title={singleData.title}/>

      {videos.map(item => (
      // <div className='mt-[25px] flex flex-col space-y-4 '>
      <Youtube className='mt-[25px] flex flex-col space-y-4' key={item.id} videoId={item.key}/>
      // </div>
      ))}
      {actors.map(item => (
        <div key={item.id}>
        
          <img  className='mt-5' src={ENV_IMG_URL + item.profile_path} alt="Actor name" width={100} height={50} />
          <h2>{item.name}</h2>

        

        </div>
      ))}
    </div>
  )
}

export default SingleFilm