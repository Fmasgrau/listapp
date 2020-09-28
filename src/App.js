import React, { useState, useEffect } from 'react';
import './App.css';
import dataJson from './ic4pro_findings.json'

function App() {

  const [descFindings, setDescFindings] = useState([])

  useEffect(() => {
    setDescFindings(dataJson.descriptiveFindings)
  }, [])

  const handleDelete = (i) => {

    const newRows = descFindings.slice(0, i).concat(descFindings.slice(i+1))

    setDescFindings(newRows)
    
  }

  const addAccount = () => {
    setDescFindings([...descFindings,
      {
        "accountNo":"1000130",
        "findings":"inactive",	   
        "scoring":"4",
        "riskrating":"Medium"
        }
      ])
  }

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-2 form-control bg-primary text-light mr-1">
          Finding ID:
        </div>
        <div className="col-4 form-control" >
          YYYYMMDD...
        </div>
      </div>

      {/* Entity Id */}
      <div className="row mt-3">
        <div className="col-2 form-control bg-primary text-light ">
          Entity ID:
        </div>
        <div className="col-4 pl-1" >
          <select className="form-control" id="exampleFormControlSelect1">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>
      {/* End of Entity Id */}


      {/* Descriptive findigs */}
      <div style={{border: '1px solid grey', borderRadius: '1%'}} className="p-3 mt-3">
      
          <h6 className="mb-2 p-2" style={{background : '#FFC107', borderRadius: '5%'}}>Descriptive Findings</h6>
         
      
      <div className="row">
        <div className="col-12">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Account N°</th>
                <th scope="col">Findings</th>
                <th scope="col">Scoring</th>
                <th scope="col">Ratings</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>

              {
                descFindings.map((res, i) => {
                  return (
                    <tr key={i}>
                      <td>{res.accountNo}</td>
                      <td>{res.findings}</td>
                      <td>{res.scoring}</td>
                      <td>{res.riskrating}</td>
                      <td><button className="btn btn-sm btn-danger" value={res.accountNo} onClick={() => handleDelete(i)}>Delete</button></td>
                    </tr>

                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
      

      <div className="row">
          <div className="col-2">
              <button className="btn btn-sm btn-primary" onClick={addAccount}>Add Account</button>
          </div>
      </div>
      </div>
      {/* End Descriptive findings */}


      {/* Analyticalfindings */}
      <div style={{border: '1px solid grey', borderRadius: '1%'}} className="p-3 mt-3">
      
          <h6 className="mb-2 p-2" style={{background : '#FFC107', borderRadius: '5%'}}>Analytical Findings</h6>
         
      
      <div className="row">
        <div className="col-12">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">Risk Classification</th>
                <th scope="col">Frequency</th>
                <th scope="col">Scores</th>
                <th scope="col">Risk Rating</th>
                <th scope="col">Risk Advice</th>
              </tr>
            </thead>

            <tbody>

              {
                descFindings.map((res, i) => {
                  return (
                    <tr key={i}>
                      <td>{res.accountNo}</td>
                      <td>{res.findings}</td>
                      <td>{res.scoring}</td>
                      <td>{res.riskrating}</td>
                      <td>TBD</td>
                    </tr>

                  )
                })
              }

            </tbody>
          </table>
        </div>
      </div>
      

     
      </div>
      {/* End of Analyticalfindings */}
    </div>
  );
}

export default App;
