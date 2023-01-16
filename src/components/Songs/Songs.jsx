import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "./songs.css";

const Songs = () => {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("rock");
  const [artists, setArtists] = useState([]);
//   const {c} = useSelector(state => state.custom)
// const {seachsong} = useSelector(state => state.songs)
// const [getSong,setGetSong] = useState([])
// setGetSong()
const c = useSelector(state => state.songs)
console.log(c)
  useEffect(() => {
    apicall();
  }, []);

  const apicall = async () => {
    // console.log(c,"pops linkh")
    try {
      const data = await fetch(
        `https://api.spotify.com/v1/search?query=${searchKey}&type=artist&locale=en-US`,
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
      console.log(resdata);
      setArtists(resdata.artists.items);
    } catch (e) {
      console.log(e, "err");
    }
  };

  return (
    <div className="songcontainer">
      {c.map((artist) => (
        <div key={artist.id} className="songcard">
          {artist.images.length ? (
            <div className="cardimg">
              <img
                width={"100%"}
                style={{
                  borderTopLeftRadius: "7px",
                  borderTopRightRadius: "7px",
                }}
                src={artist.images[0].url}
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
            {artist.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Songs;
