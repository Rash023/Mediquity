import Pnuemonia from "../Asset/Pneumonia-icon.jpg";
import Brain from "../Asset/Brain-icon.png"
import Diabetes from "../Asset/diabetes.jpg"
import Tuberculosis from "../Asset/Tuberculosis.jpg"
import Kidney from "../Asset/Kidney-Stone.jpg"


import Osteoporosis from "../Asset/Osteoporosis.jpeg"
export const ScanPredictionData = [
  {
    label: "Pnuemonia Detection",
    src: "https://fit-buddy-app.vercel.app/assets/images/Lung-image.jpg",
    route: "/detection/pneumonia",
  },
  {
    label: "Diabetes Prediction",
    src: Diabetes,
    route: "/detection/diabetes-prediction",
  },
  {
    label: "Brain Tumor Detection",
    src: "https://fit-buddy-app.vercel.app/assets/images/brain.png",
    route: "/detection/brain",
  },
  {
    label: "Tuberculosis Detection",
    src: Tuberculosis,
    route: "/detection/tuberculosis",
  },
  {
    label: "Kidney Stone Detection",
    src: Kidney,
    route: "/detection/kidney-stone",
  },
  {
    label: "Osteoporosis Detection",
    src: Osteoporosis,
    route: "/detection/osteoporosis-prediction",
  },
];
