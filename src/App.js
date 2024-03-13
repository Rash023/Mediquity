import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Common/Login";
import SignUp from "./Components/Common/SignUp";
import BrainTumor from "./Components/Core/Disease/BrainTumor";
import Contributor from "./Components/Core/Contributor";
import { Home } from "./Components/Core/Home";
import { Dashboard } from "./Components/Common/Dashboard";
import PersonalTherapist from "./Components/Bot/PersonalTherapist";
import PhysioAssistant from "./Components/Bot/PhysioAssistant";
import MedicineAssistant from "./Components/Bot/MedicineAssistant";
import LawAssistant from "./Components/Bot/LawAssistant";
import { News } from "./Components/Common/News";
import DiseaseAnalysis from "./Components/Bot/DiseaseAnalysis";
import Diabetes from "./Components/Predictions/Diabetes";
import { DiabetesInputs } from "./Components/Predictions/Diabetes1.tsx";
import Blogspage from "./Components/Common/Blogspage.jsx";
import PageContent from "./Components/Common/PageContent.jsx";

import Pneumonia from "./Components/Core/Disease/Pneumonia";
import DiabetesPrediction from "./Components/Predictions/DiabetesPrediction.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/mental-therapist" element={<PersonalTherapist />} />
        <Route path="/law-assistant" element={<LawAssistant />} />
        <Route path="/medicine-assistant" element={<MedicineAssistant />} />
        <Route path="/physiotherapy-assistant" element={<PhysioAssistant />} />
        <Route path="/disease-analysis" element={<DiseaseAnalysis />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detection/brain" element={<BrainTumor />} />
        <Route path="/detection/pneumonia" element={<Pneumonia />} />
        <Route path="/contributor" element={<Contributor />} />
        <Route path="/news" element={<News />} />
        <Route path="/diabetes-prediction" element={<DiabetesPrediction />} />
        <Route path="/diabetes1" element={<DiabetesInputs />} />
        <Route path="/bolgspage/:index" element={<Blogspage />} />
        <Route path="/pagecontent" element={<PageContent />} />
      </Routes>
    </div>
  );
}

export default App;
