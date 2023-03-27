import { axiosPublic } from "../api/axios"
import {  useState, useEffect } from 'react';

const FastestLap = (fastestLapURL) => {
    const [fastestData, setFastestData]  =  useState(null)
   
    useEffect(()=> {
        if (!fastestLapURL) return
        const results = async() => {  
            // setFastestData(fastestLapURL)
            // console.log(fastestLapURL)
            try{
                await axiosPublic.get(`${fastestLapURL}`).then((response) => {
                    setFastestData(response.data.MRData.RaceTable.Races)
                    // console.log(response.data.MRData.RaceTable.Races)
                })   
               
                
            } catch (err){
                console.error(err)
            }
            
        }
        results()
    },[fastestLapURL])

    return fastestData
}



export default FastestLap