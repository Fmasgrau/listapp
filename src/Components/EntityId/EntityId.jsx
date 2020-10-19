import React from 'react'
import EntityIdJson from '../Data/Dummy/ic4pro_entityregister.json'

export default function EntityId({handleEntityId, mode, entityId}) {
    

    if (mode === "edit" || mode === "view"){
        
        return(<React.Fragment>
            <select className="form-control" id="exampleFormControlSelect1" onChange={ (e) => handleEntityId(e.target.value)}>
        <option>{entityId}</option>
                {EntityIdJson.map((res,index) => {
                    if(res.key !== entityId){
                    return <option key={index}>{res.key}</option>
                    }
                })}
            </select>
        </React.Fragment>)
    }else{

    return (
        <React.Fragment>
            <select className="form-control" id="exampleFormControlSelect1" onChange={ (e) => handleEntityId(e.target.value)}>
                <option>---</option>
                {EntityIdJson.map((res,index) => {
                    
                    return <option key={index}>{res.key}</option>
                })}
            </select>
        </React.Fragment>
    )
}
}
