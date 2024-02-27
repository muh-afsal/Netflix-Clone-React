import React from "react";
import { useState, useEffect } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { AiOutlineClose } from "react-icons/ai";

function SavedShows() {
  const user = UserAuth();
  const [movies, setMovies] = useState([]);

  // to scroll Row Left and right
  const slideLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };
  const slideRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  // taking data from firebase to the state
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.user?.email}`), (doc) => {
      setMovies(doc.data()?.savedShows);
    });
  }, [user?.user?.email]);

  //  to remove the saved movies
  const movieref = doc(db, "users", `${user?.user?.email}`);
  const deleteShow = async (passedId) => {
    try {
      const result = movies.filter((item) => item.id !== passedId);
      await updateDoc(movieref, {
        savedShows: result,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-white font-bold md:text-xl p-4">My Shows</h1>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className="bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block "
          size={30}
        />
        <div
          id={"slider"}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies && movies.length > 0 ? (
            movies.map((item, id) => (
              <div
                key={id}
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[260px] inline-block relative cursor-pointer p-1"
              >
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item?.title}
                />
                <div className="absolute top-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
                    {item?.title}
                  </p>
                  <p
                    onClick={() => deleteShow(item?.id)}
                    className=" absolute text-gray-300 top-4 right-5 cursor-pointer"
                  >
                    <AiOutlineClose />
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className=" ml-9 text-gray-500">No saved shows found.</p>
          )}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block "
          size={30}
        />
      </div>
    </>
  );
}

export default SavedShows;
