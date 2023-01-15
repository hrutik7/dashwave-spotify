import { useState, useEffect } from "react";

import Header from "./components/Header/Header";
import Songs from "./components/Songs/Songs";

function App() {
  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("rock");
  const [artists, setArtists] = useState([]);




  



 

  const searchArtists = async (e) => {
    console.log(searchKey,"searchKey=>>>>>>>>>>>>")
    e.preventDefault()
    try{
      const data = await fetch(`https://api.spotify.com/v1/search?query=${searchKey}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=20`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            q: searchKey,
            type: "artist"
        }
    })

    const resdata = await data.json()
console.log(resdata)
    setArtists(resdata.artists.items)
    }
    catch(e){
console.log(e,"err")
    }
}


  return (
    <div className="App">
     <Header />
    <Songs />
    
    </div>
  );
}

export default App;
