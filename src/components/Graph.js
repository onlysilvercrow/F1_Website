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

const yearList = [
  {value: '1996', label: '1996'},
  {value: '1997', label: '1997'},
  {value: '1998', label: '1998'},
  {value: '1999', label: '1999'},
  {value: '2001', label: '2001'},
  {value: '2002', label: '2002'},
  {value: '2003', label: '2003'},
  {value: '2004', label: '2004'},
  {value: '2005', label: '2005'},
  {value: '2006', label: '2006'},
  {value: '2007', label: '2007'},
  {value: '2008', label: '2008'},
  {value: '2009', label: '2009'},
  {value: '2010', label: '2010'},
  {value: '2011', label: '2011'},
  {value: '2012', label: '2012'},
  {value: '2013', label: '2013'},
  {value: '2014', label: '2014'},
  {value: '2015', label: '2015'},
  {value: '2016', label: '2016'},
  {value: '2017', label: '2017'},
  {value: '2018', label: '2018'},
  {value: '2019', label: '2019'},
  {value: '2020', label: '2020'},
  {value: '2021', label: '2021'},
  {value: '2022', label: '2022'},
  {value: '2023', label: '2023'}
]

const timeConversionArr = (timeStrArray) => {
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
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);
  const [lapData, setLapData] = useState(null);
  const [circuitList, setCircuitList] = useState([]) 
  const [roundList, setRoundList] = useState([]) 

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
                text: '',
                font:{
                  weight: "bold"
                }
                
              }
            },
            x: {
              title: {
                display: true,
                text: '',
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

  const clearChart = (chart) => {
    chart.data.datasets.splice(1, chart.data.datasets.length - 1)
    chart.data.datasets[0].data = []
    chart.data.datasets[0].label = ""
    chart.update()
  }

  const updateChartSingleDataset = (chart, xData, yData, addInfo, xlabel, ylabel) => {
    chart.data.labels = xData
    chart.data.datasets[0].data = yData
    chart.options.scales.x.title.text = xlabel
    chart.options.scales.y.title.text = ylabel
    chart.options.plugins.tooltip.callbacks.footer = function(context) {
      return `Driver: ${addInfo[context[0].dataIndex]}`
    }
    chart.update()
    
  }

  const updateChartMultipleDatasets = (chart, xData, yData, xlabel, ylabel) => {
    chart.data.labels = xData
    chart.data.datasets = yData
    chart.options.scales.x.title.text = xlabel
    chart.options.scales.y.title.text = ylabel
    chart.update()
    
  }

  const changeSelectGraphOptionHandler = async (e) => {
    const chart = Chart.getChart("fastest")
    clearChart(chart)
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
        const timeData = timeConversionArr(fastestTime).map((time)=> {
          return time/1000
        })
        const chart = Chart.getChart("fastest") 
        const xlabel = "Year"
        const ylabel =  "Time(seconds)"
        
        updateChartSingleDataset(chart, year, timeData, drivers, xlabel, ylabel)
      })   
    } catch (err){
      console.error(err)
    }
  };

  const changeSelectYearHandler = async(e) => {
    setSelectedYear(e.value);
    const ScheduleURL = `f1/${e.value}.json?`
    try{
      await axiosPublic.get(ScheduleURL).then((response) => {
        const rawScheduleData = response.data.MRData.RaceTable.Races
        const scheduleData = rawScheduleData.map((races) => {
          return {value: races.round, label: races.raceName};  
        })
        
        setRoundList(scheduleData)
        
      })   
    } catch (err){
      console.error(err)
    }
  };
  
  const changeSelectRoundHandler = async(e) => {
    setSelectedRound(e.value);
    const laptimeURL = `f1/${selectedYear}/${e.value}/laps.json?limit=2000`
    try{
      await axiosPublic.get(laptimeURL).then((response) => {
        //console.log(response)
        const rawLapData = response.data.MRData.RaceTable.Races[0].Laps
        const lapData = rawLapData.map((laps) => {
          return {value: laps.Timings, lap: laps.number};  
        })
        let sortedLapData = {}
        let lapNumber = []
        lapData.map((laps)=>{
        lapNumber.push(laps.lap)
        laps.value.forEach(({driverId, time}) => 
          driverId in sortedLapData ? sortedLapData[driverId].push(time) : sortedLapData[driverId] = [time])
        })
        let yData = []
        Object.keys(sortedLapData).map((driver) => {
          yData.push({data:timeConversionArr(sortedLapData[driver]), label: driver})
        })

        const xData = lapNumber
        const xlabel = "Lap Number"
        const ylabel = "Time"
        const chart = Chart.getChart("fastest")
        updateChartMultipleDatasets(chart, xData, yData, xlabel, ylabel)

        setLapData(sortedLapData)
      })   
    } catch (err){
      console.error(err)
    }
  };

  
  
  console.log(lapData)

  return (
    <div style = {{ display: "flex", justifyContent: "center", alignItems:"center", flexGrow: 1, flexDirection:"column"}}>
      {/* <div style = {{display: "flex", minWidth: "500px", width:"50vw", height: "50vh", justifyContent: "center"}}> */}
        <div style = {{ position: "relative", paddingTop: "2em", height:"40vw", width:"100vw", maxHeight:"600px", maxWidth: "1200px",justifyContent: "center", alignItems: "center"}}><canvas  id={'fastest'}>
        </canvas></div>
        {/* </div> */}
      {selectedGraph === "fastestLap" && <div style = {{display: "flex", marginLeft:"0.5em", marginLeft: "0.5em", marginBottom: "0.5em"}}>
        <p style={{display: "flex-inline", width:"90vw", maxWidth: "1200px"}}> <b>Note:</b> Some graphs may not display information as this information is not available on the api.</p>
      </div>}
      {selectedGraph === "fastestLap" && <div style = {{display: "flex", marginLeft:"0.5em", marginLeft: "0.5em"}}>
        <p style={{display: "flex-inline", width:"90vw", maxWidth: "1200px"}}> <b>Interesting Discovery:</b> As you may have seen, fastest laps sometimes arent decreasing over time as expected.This could be due to several factors such as inconsistent weather conditions and regulation changes.</p>
      </div>}
      <form style = {{display: "flex", justifyContent: "center"}}>
      <div style = {{margin: 5, width:"100%", minWidth: "50px", maxWidth: "200px"}}>
        <Select
          defaultValue={selectedGraph}

          onChange= {changeSelectGraphOptionHandler}
          options={graphOptions}
          placeholder= "Select Graph"
          isSearchable
          noOptionsMessage={() => "Graph not found"}
          maxMenuHeight={110}
        />
      </div>
      {selectedGraph === "fastestLap" && <div style = {{margin: 5, width:"100%", minWidth: "50px", maxWidth: "200px"}}>
        <Select
          defaultValue={selectedTrack}
          onChange={changeSelectTrackHandler}
          options={circuitList}
          placeholder= "Select Track"
          isSearchable
          noOptionsMessage={() => "Track not found"}
          maxMenuHeight={110}
          
        />
      </div>}

      {selectedGraph === "raceLaptimes" && <div style = {{margin: 5, width:"100%",  minWidth: "100px", maxWidth: "200px"}}>
        <Select
          defaultValue={selectedYear}
          onChange={changeSelectYearHandler}
          options={yearList}
          placeholder= "Select Year"
          isSearchable
          noOptionsMessage={() => "Year not found"}
          maxMenuHeight={110}
        />
      </div>}

      {selectedGraph !== "fastestLap" && selectedYear !== null && <div style = {{margin: 5, width:"100%",  minWidth: "100px", maxWidth: "200px"}}>
 
        <Select
          defaultValue={selectedRound}
          onChange={changeSelectRoundHandler}
          options={roundList}
          placeholder= "Select Round"
          isSearchable
          noOptionsMessage={() => "Round does not exist"}
          maxMenuHeight={110}
          
        />
      </div>}

    </form>

    </div>
    
  )
}

export default NewPage