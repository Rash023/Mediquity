
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Components/Core/Home';
import Login from './Components/Common/Login';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
