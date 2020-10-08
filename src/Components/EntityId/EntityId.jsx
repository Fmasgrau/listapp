import React from 'react'
import EntityIdJson from '../Data/Dummy/ic4pro_entityregister.json'

export default function EntityId({handleEntityId}) {
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
