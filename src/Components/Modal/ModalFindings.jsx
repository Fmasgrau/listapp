import React, { useState, useEffect } from 'react';
import '../../App.css';
import showAnalyticalFindings from '../showAnalyticalFindings'
import DescriptiveFindings from '../DescriptiveFindings/DescriptiveFindings';
import FindingIdTime from '../Date/FindingIdTime';
import EntityId from '../EntityId/EntityId';
import riskAssesment from '../Data/Dummy/ic4pro_RiskAssessment.json'
import riskColour from '../Data/Dummy/ic4pro_statusColors.json'
import riskIndicator from '../Data/Dummy/ic4pro_riskIndicators.json'
import entityRegister from '../Data/Dummy/ic4pro_entityregister.json'
import Color from '../Color/Color'
import {Modal} from 'react-bootstrap';

function ModalFindings({ show,
  cancelModal}) {

  const [descFindings, setDescFindings] = useState() //useState(dataJson.descriptiveFindings ? dataJson.descriptiveFindings : [])
  const [analyticFindings, setAnalyticFindings] = useState({})
  const [frequency, setFrequency] = useState(1)
  const [totalScore, setTotalScore] = useState(0)
  const [avgScoring, setAvgScoring] = useState(0)
  const [entityId, setEntityId] = useState()
  const [finalRisk, setFinalRisk] = useState()
  const [grandreMarks, setGrandreMarks] = useState()
 

  const handleEntityId = (e) => {
    setEntityId(e)
  }

  const finalRiskRating = (score) => {


    if (score === '0.00' || score === undefined || score === 0.00) {
      setFinalRisk("")
    } else {
      console.log("finalriskelse", score)
      for (let i = 0; i < riskAssesment.length; i++) {
        //console.log("for",Math.round(score),riskAssesment[i].matrixLowerBand, riskAssesment[i].matrixUpperBand  )
        if (Math.round(score) >= riskAssesment[i].matrixLowerBand && Math.round(score) <= riskAssesment[i].matrixUpperBand) {
          setFinalRisk(riskAssesment[i].key)
          return riskAssesment[i].key

        }
      }
    }
  }

  const __grandreMarks = (score) => {

    console.log("grand", score)
    if (score === '0' || score === undefined) {
      console.log("entro aca?")
      setGrandreMarks("")
    } else {
      entityRegister.map(res => {
        if (res.key === entityId) {
          console.log("grandent", score)
          res.riskAssessment.map(res2 => {
            console.log("grandent2", res2)
            if (res2.riskRating === score) {
              setGrandreMarks(res2.implications)
            }
          })
        }
      })
    }
  }


  const border = {
    border: '1px solid grey',

    center: {
      border: '1px solid grey',
      textAlign: 'center'
    }
  }



  useEffect(() => {
    let datos = showAnalyticalFindings(descFindings, riskAssesment, riskIndicator)
    let freq = 0
    let tScore = 0
    let avg = 0
    setAnalyticFindings(datos)

    if (Object.keys(datos) < 1) {
      setFrequency(0)
      setTotalScore(0)
      setAvgScoring(0)
      finalRiskRating(0)
      __grandreMarks(0)
    } else {
      console.log("keys", Object.keys(datos))
      Object.keys(datos).map((res, i) => {
        console.log(datos[res]["frequency"])
        freq = freq + datos[res]["frequency"]
        tScore = tScore + datos[res]["scoring"]
        avg = (tScore / freq).toFixed(2)
        setFrequency(freq)
        setTotalScore(tScore)
        setAvgScoring(avg)
        console.log("Probando", avg)
        finalRiskRating(avg)
        __grandreMarks(finalRiskRating(avg))

        return true
      })

    }
    console.log(Object.keys(datos))

  }, [descFindings])



  const handleFindings = (e) => {
    //console.log("handleapp", e)
    setDescFindings(e)

  }






  return (
    <Modal
      show={show}
      backdrop="static"
      keyboard={false}
      size="xl"
      
    >
      <Modal.Header>
        <div className="container">
          <div className="row">
            <div className="col-8">
            Findings
            </div>
            <div className="col-4 d-flex justify-content-end">
              <button className="btn btn-sm btn-success">Save</button>
              <button className="btn btn-sm btn-danger ml-2" onClick={() => cancelModal()}>Cancel</button>
            </div>
          </div>
        </div>
          
            
          
        </Modal.Header>
      <Modal.Body>
        <div className="container">
          <div className="row mt-3">
            <div className="col-2 form-control bg-primary text-light mr-1">
              Finding ID:
        </div>
            <div className="col-4 form-control" >
              <FindingIdTime onChange={entityId} />
            </div>
          </div>

          {/* Entity Id */}
          <div className="row mt-3">
            <div className="col-2 form-control bg-primary text-light ">
              Entity ID:
        </div>
            <div className="col-4 pl-1" >
              <EntityId handleEntityId={handleEntityId} />
            </div>
          </div>
          {/* End of Entity Id */}



          <div style={{ border: '1px solid grey', borderRadius: '1%' }} className="p-3 mt-3">

            <DescriptiveFindings entityId={entityId} handleFindings={handleFindings} />

          </div>



          {/* Analyticalfindings */}
          <div style={{ border: '1px solid grey', borderRadius: '1%' }} className="p-3 mt-3 mb-3">

            <h6 className="mb-2 p-2" style={{ background: '#FFC107', borderRadius: '2%' }}>Analytical Findings</h6>


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
                            <td className="" ><span className="pl-2 pr-2 pt-1 pb-1" style={{
                              background: `#${Color(analyticFindings[res]["riskrating"], riskAssesment, riskColour).color}`, borderRadius: '5%',
                              color: `${Color(analyticFindings[res]["riskrating"], riskAssesment, riskColour).fontColor}`
                            }}>{analyticFindings[res]["riskrating"]}</span></td>
                            <td>{analyticFindings[res]["riskadvice"]}</td>
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


            {/* FinalRiskRating */}
            <div className="row mt-4">
              <div className="col-2 ml-2" style={border}>
                Final Risk Rating
              </div>
              <div className="col-1 text-center" style={{ background: `#${Color(finalRisk, riskAssesment, riskColour).color}`, color: `${Color(finalRisk, riskAssesment, riskColour).fontColor}`, border: '1px solid grey' }}>
                {
                  finalRisk


                }
              </div>
            </div>
            {/* end FinalRiskRating */}

            {/* GrandreMarks */}
            <div className="row mt-2">
              <div className="col-2 ml-2" style={border}>
                GrandreMarks
              </div>
              <div className="col-8" style={border.center}>
                {grandreMarks}
              </div>
            </div>
            {/* end GrandreMarks */}

          </div>
          {/* End of Analyticalfindings */}


        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ModalFindings;
