import { useState, useEffect } from "react"
import Select from "react-select"
import Circuits1 from "./Circuits"
import FastestLap from "./Fastest"

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

  if (selectedTrack !== null ) {
    fastestLapURL = '/f1/fastest/1/circuits/' + (selectedTrack.replace(/["]+/g, '')) + '/results.json?' 
    //console.log(selectedTrack)
    
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
    
    {fastestData  && <div style = {{display: "grid"}}>
      <table>
        <tr>
          <th>Date</th>
          <th>Time</th>
        </tr>
        {fastestData.map((Races) => {
          return (
            <tr key={Races}>
              <td>{JSON.stringify(Races.season)}</td>
              <td>{JSON.stringify(Races.Results[0].FastestLap.Time.time)}</td>
            </tr>
          )
        })}
      </table>
    </div>}

    </div>
    
  )
}

export default NewPage