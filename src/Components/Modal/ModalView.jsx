import React from 'react';
import '../../App.css';
import riskAssesment from '../Data/Dummy/ic4pro_RiskAssessment.json'
import riskColour from '../Data/Dummy/ic4pro_statusColors.json'
import Color from '../Color/Color'
import { Modal } from 'react-bootstrap';

function ModalView({ show,
    cancelModal, data, mode, rowSelected , deleteModal}) {

    const border = {
        border: '1px solid grey',

        center: {
            border: '1px solid grey',
            textAlign: 'center'
        }
    }

    const deleteRow = () => {
        return window.confirm("Are you sure you want to delete this?")
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
                            <button className="btn btn-sm btn-success" disabled>Save</button>
                            <button className="btn btn-sm btn-danger ml-2" onClick={() => cancelModal()}>Cancel</button>
                            <button className={mode === "delete"  ? "btn btn-sm btn-danger ml-2" : "d-none"} onClick={() => deleteModal(deleteRow())}>Delete</button>
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
                        <div className="col-4 form-control">

                            {data.findingsId}


                        </div>
                    </div>

                    {/* Entity Id */}
                    <div className="row mt-3">
                        <div className="col-2 form-control bg-primary text-light ">
                            Entity ID:
        </div>
                        <div className="col-4 pl-1" >
                            {<select className="form-control" disabled><option>{data.entityId}</option></select>}
                        </div>
                    </div>
                    {/* End of Entity Id */}



                    <div style={{ border: '1px solid grey', borderRadius: '1%' }} className="p-3 mt-3">

                        <form >
                            <h6 className="mb-4 p-2" style={{ background: '#FFC107', borderRadius: '2%' }}>Descriptive Findings</h6>
                            <div className="container mt-2">

                                <div className="row">
                                    <div className="col-3">
                                        <h6>Account N°</h6>
                                    </div>
                                    <div className="col-3">
                                        Findings
          </div>
                                    <div className="col-2">
                                        Scoring
          </div>
                                    <div className="col-2">
                                        Ratings
          </div>
                                    <div className="col-2">

                                    </div>
                                </div>
                                <div className="row" id="descriptiveFindings">
                                    {Object.keys(data).indexOf("descriptiveFindings") > 0 ?

                                        data.descriptiveFindings.map((item, index) => {
                                            return (<React.Fragment key={item.id} >

                                                <div className="col-3 mt-3">
                                                 
                                                        
                                                        <input className="form-control text-center" value={item.accountNo} disabled/>

                                                </div>
                                                <div className="col-3 mt-3">


                                                   

                                                    <input className="form-control text-center" value={item.findings} disabled/>
                                           
                                                </div>


                                                <div className="col-2 mt-3 text-center">

                                                    <input className="form-control text-center" disabled value={item.scoring}></input>

                                                </div>

                                                <div className="col-2 mt-3 text-center">

                                                    <input className="form-control text-center" disabled value={item.riskrating}></input>

                                                </div>

                                                <div className="col-2">
                                                    <button type="button" className="btn btn-sm btn-danger mt-3" disabled>
                                                        Delete
          </button>
                                                </div>
                                            </React.Fragment>)
                                        })
                                        : []}
                                </div>
                            </div>

                            <section>
                                <button
                                    type="button"
                                    className="btn btn-sm btn-primary mt-3"
                                    disabled
                                >
                                    Add Account
        </button>



                                {/* <input type="submit" className="btn btn-sm btn-warning ml-3 mt-3"></input> */}


                            </section>

                            {/* <input type="submit" /> */}
                        </form>

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

                                        {Object.keys(data).indexOf("analyticalfindings") > 0 ?



                                            data.analyticalfindings.map((res, i) => {
                                                console.log("resss", res)

                                                return (
                                                    <tr key={i}>
                                                        <td>{res.riskClassification}</td>
                                                        <td>{res["frequency"]}</td>
                                                        <td>{res["totalscoring"]}</td>
                                                        <td className="" ><span className="pl-2 pr-2 pt-1 pb-1" style={{
                                                            background: `#${Color(res["findingsrating"], riskAssesment, riskColour).color}`, borderRadius: '5%',
                                                            color: `${Color(res["findingsrating"], riskAssesment, riskColour).fontColor}`
                                                        }}>{res["findingsrating"]}</span></td>
                                                        <td>{res["findingsRemarks"]}</td>
                                                    </tr>

                                                )
                                            })
                                            : console.log("nofunca", data)}

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
                                {data.totalfrequency}
                            </div>
                        </div>

                        <div className="row mt-2" >
                            <div className="col-2 ml-2" style={border}>
                                GrandTotal Scoring
              </div>
                            <div className="col-1" style={border.center}>
                                {data.grandtotalscoring}
                            </div>
                        </div>

                        <div className="row mt-2">
                            <div className="col-2 ml-2" style={border}>
                                Average Scoring
              </div>
                            <div className="col-1" style={border.center}>
                                {data.averagescoring}
                            </div>
                        </div>
                        {/* End Resume */}


                        {/* FinalRiskRating */}
                        <div className="row mt-4">
                            <div className="col-2 ml-2" style={border}>
                                Final Risk Rating
              </div>
                            <div className="col-1 text-center" style={{ background: `#${Color(data.finalriskrating, riskAssesment, riskColour).color}`, color: `${Color(data.finalriskrating, riskAssesment, riskColour).fontColor}`, border: '1px solid grey' }}>
                                {
                                    data.finalriskrating


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
                                {data.grandremarks}
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

export default ModalView;
