import { axiosPublic } from "../api/axios"
import {  useState,useEffect } from 'react';


const Championship = () => {
    const [data, setData]  =  useState()
    const [Circuits, setCircuits]  =  useState()
    const [isLoading, setIsLoading]  =  useState(true)
    let circuits_list = []  
    const results = async() => {  
        
        try{
            const response = await axiosPublic.get('/f1/circuits.json?')
            setData(response.data.MRData.CircuitTable.Circuits)
            setIsLoading(false)
            data.map((circuits) => {
                circuits_list[JSON.stringify(circuits.circuitId)] = circuits.circuitName;
                
            })
            
            
        } catch (err){
            console.error(err)
        }
        
    }

    useEffect(() => {
        results()
        setCircuits(circuits_list)
        
    },[isLoading])
    
    
    if(!isLoading){
        return(
            <p>{Circuits["adelaide"]}</p>
        )
    }else{
        return(
            <p>Loading</p>
        )
    }

}
export default Championship