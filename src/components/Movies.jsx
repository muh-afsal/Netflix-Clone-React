import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase.js";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import axios from 'axios';
import TrailerModal from './TrailerModal.jsx';

// eslint-disable-next-line react/prop-types
function Movies({movie,item, id }) {
  // eslint-disable-next-line no-unused-vars
  const [like, setLike] = useState(false);
  const { user } = UserAuth();
  const [saved,setSaved]=useState(false)
  const [trailer, setTrailer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const MovieID=doc(db,'users',`${user?.email}`)

  const saveShow=async()=>{
    if(user?.email){
      setLike(!like)
      setSaved(true)
      await updateDoc(MovieID,{
        savedShows:arrayUnion({
          id:item.id,
          title:item.title,
          img:item.backdrop_path
        })
      })
    }else{

      alert("please login to save a Movie")
    }

  }


  const handleMovie = async (id) => {
    try {
      const trailerResponse = await axios.get(
        `http://api.themoviedb.org/3/movie/${id}/videos?api_key=de6aa365c3a8b8a53dc8204c32c1d18b&language=en-US`
      );
      setTrailer(trailerResponse.data.results[0]);
      console.log(trailerResponse.data.results[0]);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert(error.message)
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
 

  return (
    <>
    <div
      key={id}
      className=" w-[160px]  sm:w-[200px] md:w-[240px] lg:w-[260px] inline-block relative cursor-pointer p-1"
      onClick={() => handleMovie(item.id)}
    >
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title}
      />
      <div className="absolute top-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          {item?.title}
        </p>
        <p onClick={(e)=>{
              e.stopPropagation()
              saveShow()
          }}>
          {like ? (
            <FaHeart className="absolute top-4 left-4 text-gray-300" />
          ) : (
            <FaRegHeart className="absolute top-4 left-4 " />
          )}
        </p>
      </div>
    </div>
      <TrailerModal visible={isModalOpen} trailer={trailer} onClose={closeModal}/>
    </>
  );
}

export default Movies;
