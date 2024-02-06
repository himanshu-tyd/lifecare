import doctorImg01 from "../images/doctor-img01.png";
import doctorImg02 from "../images/doctor-img02.png";
import doctorImg03 from "../images/doctor-img03.png";

export const doctors = [
  {
    id: "01",
    name: "Dr. Aarav Sharma",
    specilization: "Surgeon",
    avgRating: getRandomRating(),
    totalRating: getRandomTotalRating(),
    photo: doctorImg01,
    totalPatients: getRandomTotalPatients(),
    hospital: "Delhi City Hospital",
  },
  {
    id: "02",
    name: "Dr. Sahana Mehra",
    specilization: "Neurologist",
    avgRating: getRandomRating(),
    totalRating: getRandomTotalRating(),
    photo: doctorImg02,
    totalPatients: getRandomTotalPatients(),
    hospital: "Delhi City Hospital",
  },
  {
    id: "03",
    name: "Dr. Jay Panday",
    specilization: "Dermatologist",
    avgRating: getRandomRating(),
    totalRating: getRandomTotalRating(),
    photo: doctorImg03,
    totalPatients: getRandomTotalPatients(),
    hospital: "Delhi City Hospital",
  },
];

function getRandomRating() {
  return (Math.random() * (5 - 4) + 4).toFixed(1);
}

function getRandomTotalRating() {
  return Math.floor(Math.random() * 500) + 100; // Random value between 100 and 599
}

function getRandomTotalPatients() {
  return Math.floor(Math.random() * 2000) + 1000; // Random value between 1000 and 2999
}
