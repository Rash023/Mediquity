
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Components/Core/Home';
import Login from './Components/Common/Login';
import SignUp from './Components/Common/SignUp';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
