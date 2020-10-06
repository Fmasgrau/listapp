import React from 'react'

export default function FindingIdTime() {

    let Fecha = new Date()
    let año = Fecha.getFullYear()
    let mes = Fecha.getMonth() + 1
    let dia = Fecha.getDay()
    let hora = Fecha.getHours()
    let min = Fecha.getMinutes()
    let seg = Fecha.getSeconds()


    return (
        <React.Fragment>
            {año}{("0"+mes).slice(-2)}{("0"+dia).slice(-2)}:-:{("0"+hora).slice(-2)}{("0"+min).slice(-2)}{("0"+seg).slice(-2)}
        </React.Fragment>
    )
}
