import './App.css';
import Routes from './Pages/Routes'
import {useState , useEffect} from 'react'

function App() {
  const [auth, setAuth] = useState(false)

        useEffect(() => {
            const token = JSON.parse(localStorage.getItem("@KenzieHub:token"))
            
            if(token) {
            setAuth(true)
            }

        },[auth])
  return (
    
   
    <div className="App">
      <Routes auth = {auth} setAuth = {setAuth}/>
    </div>
  
  );
}

export default App;
