import React from 'react'
import { useEffect ,useState} from 'react'
import './header.css'
import { useDispatch, useSelector } from 'react-redux'
import ColumnGroup from 'antd/lib/table/ColumnGroup'
import { Button } from '../storybook/src/stories/Button'
const Header = () => {
    const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("rock");
  const [artists, setArtists] = useState([]);
  const [markets,setMarkets] = useState([])
  const dispatch = useDispatch()
  const {c} = useSelector(state => state.custom)
  const country = useSelector(state => state.custom.country)


const client = process.env.REACT_APP_CLIENT_ID
const redirect_url = process.env.REACT_APP_REDIRECT_URI
const auth_redirect = process.env.REACT_APP_AUTH_ENDPOINT

const RESPONSE_TYPE = "token";
  useEffect(()=>{
    marketdata()
  })

  useEffect(()=>{
    
    apicall()
  },[country])
  const marketdata = async() =>{
    let token = window.localStorage.getItem("token");
    
    const getmarketdata = await fetch(`https://api.spotify.com/v1/markets`,{
      headers: {
        Authorization: `Bearer ${token}`
    },
    })
    const getmarketjson = await getmarketdata.json()
    
    
    
    setMarkets(getmarketjson.markets)
  }
  const addBtn=()=>{
    dispatch({
      type:"increment"
    })
 
  }
  const countryFetch=(selectednation)=>{
    
    console.log(selectednation,"selectednation")
    dispatch({
      type:"getcountry",
      payload:selectednation
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
        let token = window.localStorage.getItem("token");
        try{
          const data = await fetch(`https://api.spotify.com/v1/search?query=${searchKey}&type=artist&locale=${country}%2Cen%3Bq%3D0.9&offset=0&limit=200`, {
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
            <a style={{justifyContent:"center",marginTop:"10px"}}
            href={`${auth_redirect}?client_id=${client}&redirect_uri=${redirect_url}&response_type=${RESPONSE_TYPE}`}
          >
            Login to Spotify
          </a>
          </div>
        ) : (<>
          <div className="dropdown">
  {/* <button className="dropbtn">Country</button> */}
  <Button
          label="Country"
          backgroundColor="#729394"
          size="small"
        
          // style={{width:"150px"}}
          />
  <div className="dropdown-content">
  
  {

markets !== undefined  ?  markets.map((market,index)=>{
    // console.log(markets[index])
    return (
      
      <li key={index} 
     
      onClick={()=>countryFetch(markets[index])}><a >{markets[index]}</a>
  
  </li> 
    )
  }) : null 
  } 
  </div>
  </div>


  <div className="dropdown">
  {/* <button className="dropbtn">Popularity</button> */}
  <Button
          label="Popular"
          backgroundColor="#729394"
          size="small"
        
          // style={{width:"150px"}}
          />
  <div className="dropdown-content">
  <li>
  <a >Low to high</a>
 
  </li>  
   <li>
   <a >high to low</a>
    </li> 
  </div>
  </div>
  
          <form className='searchform' onSubmit={searchArtists}>
    <input type="text" placeholder='Enter artist name' className='inputstyle' onChange={e => setSearchKey(e.target.value)}/>
    {/* <button className='btnstylesearch' type={"submit"}>Search</button> */}
   <div style={{marginLeft:"-2rem"}}>
   <Button
          label="Search"
          backgroundColor="#729394"
          size="small"
          type={"submit"}
          // style={{width:"150px"}}
          />
   </div>
  
</form>

          {/* <button className='btnstyle' onClick={logout}>Logout</button> */}
         <Button
          label="Logout"
          backgroundColor="#729394"
          size="small"
          onClick={()=>{logout()}}
          // style={{width:"150px"}}
          />
          
          </>
        )}
        
      </header>
    </div>
  )
}

export default Header