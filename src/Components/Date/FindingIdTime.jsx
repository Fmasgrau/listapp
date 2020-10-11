import React, {useEffect, useState} from 'react'

export default function FindingIdTime(props) {

    const [año, setAño] = useState()
    const [mes, setMes] = useState()
    const [dia, setDia] = useState()
    const [hora, setHora] = useState()
    const [min, setMin] = useState()
    const [seg, setSeg] = useState()
    

    useEffect( ()=> {
        let Fecha = new Date()
        setAño ( Fecha.getFullYear())
        setMes(Fecha.getMonth() + 1)
        setDia(Fecha.getDay())
        setHora(Fecha.getHours())
        setMin(Fecha.getMinutes())
         setSeg(Fecha.getSeconds())
    }, [props.onChange])

    


    return (
        <React.Fragment>
            
            {año}{("0"+mes).slice(-2)}{("0"+dia).slice(-2)}:-:{("0"+hora).slice(-2)}{("0"+min).slice(-2)}{("0"+seg).slice(-2)}
        </React.Fragment>
    )
}
