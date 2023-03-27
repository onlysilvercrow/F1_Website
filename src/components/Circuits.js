import { axiosPublic } from "../api/axios"
import {  useState, useEffect } from 'react';

const Circuits1 = () => {
    const [data, setData]  =  useState(null)
   

    useEffect(()=> {
        const results = async() => {  
        
            try{
                await axiosPublic.get('f1/circuits.json?limit=100').then((response) => {
                    setData(response.data.MRData.CircuitTable.Circuits)
                    
                })        
               
                
            } catch (err){
                console.error(err)
            }
            
        }
        results()
    },[])

    return data
}



export default Circuits1