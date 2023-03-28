import { useState, useEffect } from "react"
import Select from "react-select"
import Chart from 'chart.js/auto'
import { axiosPublic } from "../api/axios"
Chart.defaults.font.size = 17;
Chart.defaults.color = "black";

const graphOptions = [
  {value: 'fastestLap', label: 'Fastest Lap'},
  {value: 'raceLaptimes', label: 'Race Laptimes'}
]

const timeConversion = (timeStrArray) => {
  const millisecondsArray = timeStrArray.map((timeString) => {
    const timeArray = timeString.split(":"); 
    const minutes = parseInt(timeArray[0]);
    const seconds = parseInt(timeArray[1].split(".")[0]); 
    const milliseconds = parseInt(timeArray[1].split(".")[1]);
    const totalMilliseconds = (minutes * 60 + seconds) * 1000 + milliseconds;
    return totalMilliseconds;
  });
  return millisecondsArray
}

const NewPage = () => {

  const [selectedGraph, setSelectedGraph] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [circuitList, setCircuitList] = useState([]) 

  var fastestChart
  useEffect(()=> {
    fastestChart = new Chart(
      document.getElementById('fastest'),
      {
        type: 'line',
        
        data: {
          labels: [],
          datasets: [
            

            {
              data: [],
              backgroundColor: "#e10600",
              borderColor:"#e10600",
              borderWidth:0.9,
              pointStyle: "crossRot",
              pointRadius: 5,
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false
            }
          },
          scales: {
            y: {
              title: {
                display: true,
                text: 'Time(seconds)',
                font:{
                  weight: "bold"
                }
                
              }
            },
            x: {
              title: {
                display: true,
                text: 'Year',
                font:{
                  weight: "bold"
                }
              }
            }
          }    
        }
      }  
    )
  },[])

  const updateChart = (chart, xData, yData, addInfo) => {
    chart.data.labels = xData
    chart.data.datasets[0].data = yData
    chart.options.plugins.tooltip.callbacks.footer = function(context) {
      return `Driver: ${addInfo[context[0].dataIndex]}`
    }
    chart.update()
    
  }

  const changeSelectGraphOptionHandler = async (e) => {
    setSelectedGraph(e.value);
      try{
        await axiosPublic.get('f1/circuits.json?limit=100').then((response) => {
          const rawCircuitData = response.data.MRData.CircuitTable.Circuits
          const circuitData = rawCircuitData.map((circuits) => {
            return {value: circuits.circuitId, label: circuits.circuitName};  
          })
          const sortedCircuitData = (circuitData.sort((value, label) => value.label.localeCompare(label.label)))
          setCircuitList(sortedCircuitData)
          
        })   
      } catch (err){
        console.error(err)
      }
  };
  
  const changeSelectTrackHandler = async(e) => {
    setSelectedTrack(e.value);
    const fastestLapURL = '/f1/fastest/1/circuits/' + e.value.replace(/["]+/g, '') + '/results.json?' 
    try{
      await axiosPublic.get(`${fastestLapURL}`).then((response) => {
        const rawFastestData = response.data.MRData.RaceTable.Races
        const fastestTime = rawFastestData.map((Races) => {
          return Races.Results[0].FastestLap.Time.time
        })
        const year = rawFastestData.map((Races) => {
          return Races.season
        }) 
        const drivers = rawFastestData.map((Races) => {
          return `${Races.Results[0].Driver.givenName} ${Races.Results[0].Driver.familyName}`
        }) 
        const timeData = timeConversion(fastestTime).map((time)=> {
          return time/1000
        })
        const chart = Chart.getChart("fastest")   
        updateChart(chart, year, timeData, drivers)
      })   
    } catch (err){
      console.error(err)
    }
  };
  

  



  return (
    <div style = {{ display: "flex", justifyContent: "center", alignItems:"center", flexGrow: 1, flexDirection:"column"}}>
      {/* <div style = {{display: "flex", minWidth: "500px", width:"50vw", height: "50vh", justifyContent: "center"}}> */}
        <div style = {{display: "flex", height:"100%", width: "100%", maxHeight: "50vh", width:"800px", justifyContent: "center", alignItems: "center"}}><canvas  id={'fastest'}>
        </canvas></div>
        {/* </div> */}
      {selectedGraph === "fastestLap" && <div style = {{padding:"0.5em"}}>
        <p> <b>Note:</b> Some graphs may not display information as this information is not available on the api.</p>
      </div>}
      {selectedGraph === "fastestLap" && <div style = {{padding:"0.5em"}}>
        <p> <b>Interesting Discovery:</b> As you may have seen, fastest laps sometimes arent decreasing over time as expected.This could be due to several factors such as inconsistent weather conditions and regulation changes.</p>
      </div>}
      <form style = {{display: "flex", marginRight: "2em", justifyContent: "center"}}>
      <div style = {{margin: 5, minWidth: "200px"}}>
        <Select
          defaultValue={selectedGraph}

          onChange= {changeSelectGraphOptionHandler}
          options={graphOptions}
          placeholder= "Select Graph"
          isSearchable
          noOptionsMessage={() => "Graph not found"}
        />
      </div>
      {selectedGraph === "fastestLap" && <div style = {{margin: 5,  minWidth: "200px"}}>
        <Select classNames = {{
          control: () => {
            return "word-wrap"
          }
        }}
          defaultValue={selectedTrack}
          onChange={changeSelectTrackHandler}
          options={circuitList}
          placeholder= "Select Track"
          isSearchable
          noOptionsMessage={() => "Track not found"}
        />
      </div>}
      
    </form>

    </div>
    
  )
}

export default NewPage