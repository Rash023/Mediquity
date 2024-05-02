import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Common/Login";
import SignUp from "./Components/Common/SignUp";
import BrainTumor from "./Components/Core/Disease/BrainTumor";
import { Home } from "./Components/Core/Home";
import PersonalTherapist from "./Components/Bot/PersonalTherapist";
import PhysioAssistant from "./Components/Bot/PhysioAssistant";
import MedicineAssistant from "./Components/Bot/MedicineAssistant";
import LawAssistant from "./Components/Bot/LawAssistant";
import { News } from "./Components/Common/News";
import DiseaseAnalysis from "./Components/Bot/DiseaseAnalysis";
import Blogspage from "./Components/Common/BlogPage.jsx";
import PageContent from "./Components/Common/PageContent.jsx";

import Pneumonia from "./Components/Core/Disease/Pneumonia";
import DiabetesPrediction from "./Components/Core/Disease/Diabetes.jsx";
import MedicationForm from "./Components/Core/Medication.jsx";
import { Contact } from "./Components/Core/Contact.jsx";
import VideoConference from "./Components/Common/VideoConference.jsx";
import BookDoctor from "./Components/Common/BookDoctor.jsx";
import FileUpload from "./Components/Common/FileUpload.jsx";
import ViewDocument from "./Components/Common/ViewDocument.jsx";
import OsteoporosisDetection from "./Components/Core/Disease/Osteoporosis.jsx";
import TuberculosisDetection from "./Components/Core/Disease/Tuberculosis.jsx";
import KidneyStoneDetection from "./Components/Core/Disease/KidneyStone.jsx";
import GetDoctorBySpecialist from "./Components/Common/GetDoctorBySpecialist.jsx";
import ViewSlots from "./Components/Common/ViewSlots.jsx";
import Profile from "./Components/Common/Profile.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mental-therapist" element={<PersonalTherapist />} />
        <Route path="/law-assistant" element={<LawAssistant />} />
        <Route path="/medicine-assistant" element={<MedicineAssistant />} />
        <Route path="/physiotherapy-assistant" element={<PhysioAssistant />} />
        <Route path="/disease-analysis" element={<DiseaseAnalysis />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ping" element={<MedicationForm />} />
        <Route path="/news" element={<News />} />
        {/* DETECTION */}
        <Route path="/detection/brain" element={<BrainTumor />} />
        <Route path="/detection/pneumonia" element={<Pneumonia />} />
        <Route
          path="/detection/diabetes-prediction"
          element={<DiabetesPrediction />}
        />
        <Route
          path="/detection/osteoporosis-prediction"
          element={<OsteoporosisDetection />}
        />
        <Route
          path="/detection/tuberculosis"
          element={<TuberculosisDetection />}
        />
        <Route
          path="/detection/kidney-stone"
          element={<KidneyStoneDetection />}
        />
        {/* DETECTION */}
        <Route path="/blogspage/:index" element={<Blogspage />} />
        <Route path="/pagecontent" element={<PageContent />} />
        <Route path="/contactUs" element={<Contact />} />
        <Route path="/video-call" element={<VideoConference />} />
        <Route path="/book-doctor" element={<BookDoctor />} />
        <Route path="/file-upload" element={<FileUpload />} />
        <Route path="/view-document" element={<ViewDocument />} />
        <Route path="/get-doctor/:specialist" element={<GetDoctorBySpecialist />} />
        <Route path="/view-slots/:doctorId" element={<ViewSlots />} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
    </div>
  );
}

export default App;
