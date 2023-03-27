import { useState, useEffect } from "react"
import Select from "react-select"
import Circuits1 from "./Circuits"
import FastestLap from "./Fastest"
import Chart from 'chart.js/auto'

const NewPage = () => {

(async function() {
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];

  new Chart(
    document.getElementById('acquisitions'),
    {
      type: 'line',
      data: {
        labels: data.map(row => row.year),
        datasets: [
          {
            label: 'Acquisitions by year',
            data: data.map(row => row.count)
          }
        ]
      }
    }
  );
})();


  return ( 
  
    <>
  
    <div><canvas id="acquisitions"></canvas></div>

    <script type="module" src="acquisitions.js"></script>
    </>
  )
}

export default NewPage