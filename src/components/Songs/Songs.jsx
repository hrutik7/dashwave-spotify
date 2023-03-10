import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./songs.css";

const Songs = () => {
  // const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("rock");
  const [artists, setArtists] = useState([]);
  
  
//   const {c} = useSelector(state => state.custom)
// const {seachsong} = useSelector(state => state.songs)
// const [getSong,setGetSong] = useState([])
// setGetSong()
const {country} = useSelector(state => state?.custom?.country)

  useEffect(() => {
    apicall();
  }, []);
  const dispatch = useDispatch()
  const apicall = async () => {
    // console.log(c,"pops linkh")
   
    try {
      const token = window.localStorage.getItem("token");
      console.log(token,typeof(token),"token in songs")
      const data = await fetch(
        `https://api.spotify.com/v1/search?query=linkin&type=artist`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            q: searchKey,
            type: "artist",
          },
        }
      );

      const resdata = await data.json();
      console.log(resdata,typeof(tokenstring),"resd");
      const {artists} = resdata.artists.items
      console.log(resdata.artists.items,"master")
      setArtists(resdata.artists.items);
      dispatch({
        type:"songs",
        payload : resdata.artists
      })
    } catch (e) {
      console.log(e, "err");
    }
  };
  const songs = useSelector(state => {

    // console.log(state.custom.songs.artists.items,"state")
    // state.custom.songs.length > 0 ? return state?.custom?.songs?.artists?.items : 
    if(state?.custom?.songs?.items?.length > 0){
      return state?.custom?.songs?.items
    }else{
      console.log("else")
      return []
    }
    })
    console.log(songs,typeof(songs),"ban")
  return (
    <div className="songcontainer">
      {
        songs.map((song,index)=>{console.log(songs[index].name,"index")
        console.log("above map")
        return(
<div key={index} className="songcard">
          {songs[index].images.length ? (
            <div className="cardimg">
              <img
                width={"100%"}
                style={{
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                }}
                src={songs[index].images[0].url}
                alt=""
              />
            </div>
          ) : (
            <div>No Image</div>
          )}
          <p
            style={{
              fontSize: "10px",
              textAlign: "center",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            {songs[index].name}
          </p>
        </div>
        )
})
      }
      
    </div>
  );
};

export default Songs;
