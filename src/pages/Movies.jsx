import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Movies.css'
import { Navigate, useNavigate ,Link, useParams} from 'react-router-dom'
import ViewMore from './ViewMore'

const Movies = () => {
  const[movies,setMovies]=useState("")
  const[isLoading,setIsLoading]=useState(false)
  const[error,setError]=useState(true)
  const navigate = useNavigate()
  const [currentPage,setCurrentPage]=useState(1);
  const [genre,setGenre]=useState();
  // const {id} = useParams()

  useEffect(()=>{
    setIsLoading(true)
    axios.get(`http://localhost:3000/movies`,{
        params:{
          genre,
        }    
      }
  )
    .then((res)=>setMovies(res.data))
    // console.log(res.data)
    .catch((err)=>err.response?err.response.data:err.response)
    .finally(()=>setIsLoading(false))
  },[])
  let itemsPerPage =4;
  let totalPage = Math.ceil(movies.length/itemsPerPage);
  let startIndex = (currentPage-1)*itemsPerPage;
  let lastIndex = (currentPage * itemsPerPage)
  let finalres = movies.slice(startIndex,lastIndex)

  const handleViewMore=(id)=>{
    navigate(`/movies/${id}`)
  }
  console.log(genre)
  return (
    <>
    
      {isLoading && <p style={{color:"red",fontSize:"1.2rem",textAlign:"center"}}>Loading...</p>}
      {error && <p>{error}</p>}
      {/* <div>
        <button onClick={()=>navigate("/addnew")}>Add New Movie</button>
      </div> */}
      <div className='filter-section'>
          <select name='genre' value={genre} onChange={(e)=>setGenre(e.target.value)}>
              <option value="">All</option>
              <option value="crime">Crime</option>
              <option value="action">Action</option>
              <option value="drama">Drama</option>
              <option value="sci-fi">Sci-Fi</option>
          </select>
      </div>
      
      <div className='movies-container'>
          {finalres &&  finalres.map((movie)=>{
                  return(
                    <div key={movie.id} className='movies-list'>
                      <img src={movie.poster} alt={movie.name}/>
                      <h3>{movie.title}</h3>
                      <h4>Genre: {movie.genre}</h4>
                      <p>ReleaseDate : {movie.releaseDate}</p>
                      <div>
                        <button>Edit</button>
                        <button>Delete</button>
                        <button onClick={()=>handleViewMore(movie.id)}>View More</button>
                        
                      </div>
                    </div>
                  )
                })}
                <div className='pagination-section'>
                <button onClick={()=>setCurrentPage((prev)=>Math.max(prev-1,1))} disabled={currentPage === 1}>Prev</button>
                <button onClick={()=>setCurrentPage((prev)=>prev+1)}>1</button>
                <button onClick={()=>setCurrentPage((prev)=>prev+1)}>2</button>
                <button onClick={()=>setCurrentPage((prev)=>prev+1)}>3</button>
                <button onClick={()=>setCurrentPage((prev)=>prev+1)}>4</button>
                <button onClick={()=>setCurrentPage((prev)=>prev+1)}>5</button>
                <button onClick={()=>setCurrentPage((prev)=>Math.min(prev+1,totalPage))}disabled={currentPage===totalPage}>Next</button>
                </div>

  
      </div>
      
    </>
  )
}

export default Movies
