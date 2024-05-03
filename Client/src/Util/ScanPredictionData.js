import Diabetes from "../Asset/Prediction/Diabetes.jpg"
import Tuberculosis from "../Asset/Prediction/Tuberculosis.jpg"
import Kidney from "../Asset/Prediction/Kidney-Stone.jpg"
import Osteoporosis from "../Asset/Prediction/Osteoporosis.jpeg"
import Pneumonia from "../Asset/Prediction/Pneumonia.jpg"
import Brain from "../Asset/Prediction/Brain-Tumor.jpg"
export const ScanPredictionData = [
  {
    label: "Pnuemonia Detection",
    src: Pneumonia,
    route: "/detection/pneumonia",
  },
  {
    label: "Diabetes Prediction",
    src: Diabetes,
    route: "/detection/diabetes-prediction",
  },
  {
    label: "Brain Tumor Detection",
    src: Brain,
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
