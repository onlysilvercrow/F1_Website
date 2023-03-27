import { useState, useEffect } from "react"
import Select from "react-select"
import Circuits1 from "./Circuits"
import FastestLap from "./Fastest"
import Chart from 'chart.js/auto'
import 'chartjs-adapter-moment';

const NewPage = () => {
  
  const graphOptions = [
    {value: 'fastestLap', label: 'Fastest Lap'},
    {value: 'raceLaptimes', label: 'Race Laptimes'}
  ]
  

  
  const trackOptions = []

  let options = null;
  let fastestLapURL = '';

  
  // let fastestData = null

  const [selectedGraph, setSelectedGraph] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(()=> {
    
  },[selectedTrack])

  if (selectedTrack !== null ) {
    fastestLapURL = '/f1/fastest/1/circuits/' + (selectedTrack.replace(/["]+/g, '')) + '/results.json?' 
    //console.log(selectedTrack)
      // let FastestTimes = []
  // fastestData.map((Races) => {
  //   FastestTimes.push({value: JSON.stringify(Races.Results[0].FastestLap.Time.time)})
    
  // })

    
  }

  const fastestData = FastestLap(fastestLapURL)
  // console.log(fastestData)
  const data = Circuits1()
  
  
  if (!data){
    return (<pre>Loading...</pre>)
  }

  data.map((circuits) => {
    trackOptions.push({value: JSON.stringify(circuits.circuitId), label: circuits.circuitName});
    
  })

  // data.map((Races) => {
  //   // JSON.stringify(Races.date)
  //   // JSON.stringify(Races.Results[0].FastestLap.Time.time)
  //   let test = null
  //   test.push({value: JSON.stringify(Races.date), label: JSON.stringify(Races.Results[0].FastestLap.Time.time)});
  //   })



  
  // if (!fastestData && selectedTrack){
  //   return (<pre>Loading...</pre>)
  // }

    
  
  const changeSelectGraphOptionHandler = (e) => {
    setSelectedGraph(e.value);
  };

  // console.log(selectedGraph)

  if (selectedGraph === "fastestLap") {
    options = trackOptions;
  }else{
    options = [];
  }



  // if (selectedTrack !== null ) {
  //   fastestLapURL = '/f1/fastest/1/circuits/' + (selectedTrack.replace(/["]+/g, '')) + '/results.json?' 
  //   //console.log(selectedTrack)
  // }


  // console.log(FastestTimes) 
  let millisecondsArray = []
  if (!fastestData){
  } else{
  const test = []
  fastestData.map((Races) =>
    test.push(Races.Results[0].FastestLap.Time.time)
  )  
  millisecondsArray = test.map((timeString) => {
  const timeArray = timeString.split(":"); // Split the string into ["1", "30.252"]
  const minutes = parseInt(timeArray[0]);
  const seconds = parseInt(timeArray[1].split(".")[0]); // Extract seconds from "30.252" and parse it as integer
  const milliseconds = parseInt(timeArray[1].split(".")[1]); // Extract milliseconds from "30.252" and parse it as integer
  const totalMilliseconds = (minutes * 60 + seconds) * 1000 + milliseconds;
  return totalMilliseconds;
  });
  
  }
  (async function() {
    new Chart(
      document.getElementById('fastest'),
      {
        type: 'line',
        data: {
          labels: fastestData.map((Races) => Races.season),
          datasets: [
            {
              label: 'Laptimes',
              data: millisecondsArray.map((time) => time)
            }
          ]
        },
      //   options: {
      //     scales: {
      //         y: {
      //           // min: '00:00.000',
      //           max: '03:00.000',
      //           type: 'time',
      //            time: {
      //               max: '03:00.000',
      //               parser: 'mm:ss.SSS',
      //               unit: 'minutes',
      //                unitStepSize: '00:10',
      //                 displayFormats: {
      //                   'minutes': 'mm:ss.SSS'
      //               }
      //            },
      //         }
      //     }
      // }
      }
    );
  })();



  return (
    <div style = {{ display: "block"}}>
    <form style = {{display: "flex"}}>
      <div style = {{margin: 10, width: 200, height: 250}}>
        <Select
          defaultValue={selectedGraph}
          onChange= {changeSelectGraphOptionHandler}
          options={graphOptions}
          placeholder= "Select Graph"
          isSearchable
          noOptionsMessage={() => "Graph not found"}
        />
      </div>
      {selectedGraph === "fastestLap" && <div style = {{margin: 10, width: 200, height: 250}}>
        <Select
          defaultValue={selectedTrack}
          onChange={(e) => {
            setSelectedTrack(e.value)}}
          options={options}
          placeholder= "Select Track"
          isSearchable
          noOptionsMessage={() => "Track not found"}
        />
      </div>}
      
    </form>
    
    <>
        <div><canvas id="fastest"></canvas></div>

        <script type="module" src="fastest.js"></script>
    </>

    </div>
    
  )
}

export default NewPage