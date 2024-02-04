
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './Components/Core/Home';
import Login from './Components/Common/Login';
import SignUp from './Components/Common/SignUp';
import BrainTumor from './Components/Core/Disease/BrainTumor';
import DiseasePredictor from './Components/Core/Disease/DiseasePredictor';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/detection/brain' element={<BrainTumor/>}/>
        <Route path='/detection/diseasepredictor' element={<DiseasePredictor/>}/>
      </Routes>
    </div>
  );
}

export default App;
