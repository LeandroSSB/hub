import Routes from './routes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';

function App() {
  return (
    <>
      <Header/>
      <Routes/> 
      <ToastContainer />
    </>
  );
}

export default App;
