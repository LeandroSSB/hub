import './App.css';
import Routes from './Pages/Routes'
import { ToastContainer } from 'react-toastify'
import {makeStyles} from '@material-ui/core/styles'
import 'react-toastify/dist/ReactToastify.css'

const useStyles = makeStyles({
  toast: {
    background: "red",
    textAlign: "center",
  }
});



function App() {
  const classes = useStyles()
  return (
    <div className="App">
  <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
  />
{/* Same as */}
<ToastContainer />
      <Routes/>
    </div>
  
  );
}

export default App;
