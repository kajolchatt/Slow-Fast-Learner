import './App.css';
import Login from './Login';
import Signup from './Signup';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path='/signup'element={<Signup/>}></Route>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
