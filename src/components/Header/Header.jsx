import React from 'react'
import { useEffect ,useState} from 'react'
import './header.css'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {
    const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("rock");
  const [artists, setArtists] = useState([]);
  const [markets,setMarkets] = useState([])
  const dispatch = useDispatch()
  const {c} = useSelector(state => state.custom)
  const {country} = useSelector(state => state.custom)


const client = process.env.REACT_APP_CLIENT_ID
const redirect_url = process.env.REACT_APP_REDIRECT_URI
const auth_redirect = process.env.REACT_APP_AUTH_ENDPOINT

const RESPONSE_TYPE = "token";
  useEffect(()=>{
    marketdata()
  },[])
  const marketdata = async() =>{
    console.log(client,"CLIENT_ID")
    const getmarketdata = await fetch(`https://api.spotify.com/v1/markets`,{
      headers: {
        Authorization: `Bearer ${token}`
    },
    })
    const getmarketjson = await getmarketdata.json()
    
    Object.keys(getmarketjson).map((i)=>getmarketjson[i])
    setMarkets(getmarketjson)
  }
  const addBtn=()=>{
    dispatch({
      type:"increment"
    })
    console.log(c,">>>>>>>>>>>>>>>>???????????")
  }
  const countryFetch=()=>{
    dispatch({
      type:"getcountry"
    })
    console.log(country,"contry got")
  }
    useEffect(() => {
        const hash = window.location.hash;
        let token = window.localStorage.getItem("token");
    
        if (!token && hash) {
          token = hash
            .substring(1)
            .split("&")
            .find((elem) => elem.startsWith("access_token"))
            .split("=")[1];
    
          window.location.hash = "";
          window.localStorage.setItem("token", token);
        }
    
        setToken(token);
        apicall()
      }, []);

      const apicall = async () =>{
        try{
          const data = await fetch(`https://api.spotify.com/v1/search?query=${searchKey}&type=artist&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=200`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                q: searchKey,
                type: "artist"
            }
        })
    
        const resdata = await data.json()
    // console.log(resdata)
        // setArtists(resdata.artists.items)
        }
        catch(e){
    console.log(e,"err")
        }
      }

    
      const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
      };
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
    
    dispatch({
      type:"songs",
      payload : resdata.artists
    })
        setArtists(resdata.artists.items)
        }
        catch(e){
    console.log(e,"err")
        }
    }
  return (
    <div>
        <header className="App-header">
        <h1 className='spot_headline'>Spotify</h1>
        
        {!token ? (
          <div style={{display:"flex"}}>
            <a style={{justifyContent:"center",marginTop:"33px"}}
            href={`${auth_redirect}?client_id=${client}&redirect_uri=${redirect_url}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
          </div>
        ) : (<>
          <div className="dropdown">
  <button className="dropbtn">Filter</button>
  <div className="dropdown-content">
  <li><a onMouseEnter={countryFetch}>Country</a>
  {
    // console.log(markets,"jow")
    // markets.markets.map(market => console.log(market.name))


}
  <ul style={{color:"black"}}>aa</ul>
  </li>  
   <li><a href="#">popularity</a></li> 
  </div>
  </div>
          <form className='searchform' onSubmit={searchArtists}>
    <input type="text" placeholder='Enter artist name' className='inputstyle' onChange={e => setSearchKey(e.target.value)}/>
    <button className='btnstylesearch' type={"submit"}>Search</button>
    
</form>

          <button className='btnstyle' onClick={logout}>Logout</button>
         

          </>
        )}
        
      </header>
    </div>
  )
}

export default Header