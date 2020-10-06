import React, { useState, useEffect } from 'react';
import './App.css';
import dataJson from './Components/Data/Dummy/ic4pro_findings.json'
import Iterator from './Components/Iterator'
import DescriptiveFindings from './Components/DescriptiveFindings/DescriptiveFindings';
import FindingIdTime from './Components/Date/FindingIdTime';

function App() {

  const [descFindings, setDescFindings] = useState(dataJson.descriptiveFindings ? dataJson.descriptiveFindings : [])
  const [analyticFindings , setAnalyticFindings] = useState({})
  const [frequency, setFrequency] = useState(1)
  const [totalScore, setTotalScore] = useState(0)
  const [avgScoring, setAvgScoring] = useState(0)

  const border = {
    border: '1px solid grey',

    center :{
      border: '1px solid grey',
      textAlign : 'center'
    }
  }

  

  useEffect(() => {
    let datos = Iterator(descFindings)
    let freq = 0
    let tScore = 0
    let avg = 0
    setAnalyticFindings(datos)
    
    Object.keys(datos).map((res, i) => {
      //console.log(datos[res]["frequency"])
      freq = freq + datos[res]["frequency"]
      tScore = tScore + datos[res]["scoring"]
      avg = (tScore / freq).toFixed(2)
      setFrequency (freq)
      setTotalScore(tScore)
      setAvgScoring(avg)

      return true
    })

    if(Object.keys(datos) < 1){
      setFrequency (0)
      setTotalScore(0)
      setAvgScoring(0)
    }
    //console.log(Object.keys(datos))

  }, [descFindings])

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
          <FindingIdTime />
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
      <div style={{border: '1px solid grey', borderRadius: '1%'}} className="p-3 mt-3 mb-3">
      
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
                
                Object.keys(analyticFindings).map((res, i) => {
                  
                
                  return (
                    <tr key={i}>
                      <td>{res}</td>
                      <td>{analyticFindings[res]["frequency"]}</td>
                      <td>{analyticFindings[res]["scoring"]}</td>
                      <td>{analyticFindings[res]["riskrating"]}</td>
                      <td>TBD</td>
                    </tr>

                  )
                })
              }

            </tbody>
          </table>
        </div>

        
      </div>
      
      {/* Resume */}
      <div className="row mt-2">
              <div className="col-2 ml-2" style={border}>
                Total Frequency
              </div>
              <div className="col-1" style={border.center}>
              {frequency}
              </div>
      </div>

      <div className="row mt-2" >
              <div className="col-2 ml-2" style={border}>
                GrandTotal Scoring
              </div>
              <div className="col-1" style={border.center}>
              {totalScore}
              </div>
      </div>

      <div className="row mt-2">
              <div className="col-2 ml-2" style={border}>
                Average Scoring
              </div>
              <div className="col-1" style={border.center}>
              {avgScoring}
              </div>
      </div>
      {/* End Resume */}

     
      </div>
      {/* End of Analyticalfindings */}

      {/* Testing */}
              <DescriptiveFindings>
                
              </DescriptiveFindings>
      {/* End Testing */}
    </div>
  );
}

export default App;
