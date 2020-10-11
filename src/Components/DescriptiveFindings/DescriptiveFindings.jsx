import React, { useRef, useEffect, useState } from "react";
import { useForm, useFieldArray, Controller, useWatch } from "react-hook-form";
import dataAccounts from '../Data/Dummy/ic4pro_accounts.json'
import entityRegister from '../Data/Dummy/ic4pro_entityregister.json'
import riskIndicators from '../Data/Dummy/ic4pro_riskIndicators.json'
import riskAssessment from '../Data/Dummy/ic4pro_RiskAssessment.json'



export default function DescriptiveFindings({ entityId, handleFindings }) {
  const { register, control, handleSubmit, reset, watch, setValue, getValues } = useForm({

  });
  const { fields, append, remove } = useFieldArray(
    {
      control,
      name: "descriptiveFindings",

    }
  );

  const [item1, setItem] = useState()
  const onSubmit = (data) => console.log("data", data);

  const dataJson = watch("descriptiveFindings", "")

  useEffect(() => {
    handleFindings(dataJson)
  }, [fields])
  useEffect(() => {
    reset()
  }, [entityId])



  useEffect(() => {
    handleFindings(watch().descriptiveFindings)

  }, [fields, item1])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

          {fields.map((item, index) => {
            return (<React.Fragment key={item.id} >

              <div key={item.id} className="col-3">
                <select name={`descriptiveFindings[${index}].accountNo`}
                  defaultValue={`${item.accountNo}`} // make sure to set up defaultValue
                  ref={register()}
                  className="custom-select mt-3">
                  {dataAccounts.map((res, index) => {
                    return (
                      <option key={index}>{res.accountNo}</option>
                    )
                  })

                  }
                </select>
              </div>
              <div className="col-3">


                <select name={`descriptiveFindings[${index}].findings`}
                  defaultValue={`${item.findings}`} // make sure to set up defaultValue
                  ref={register()}
                  className="custom-select mt-3"
                  onChange={
                    (e) => {
                      let riskI = 0
                 
                      for (let i = 0; i < riskIndicators.length; i++) {
                        if (riskIndicators[i].key === e.target.value) {
                          //console.log("entro al if",riskIndicators[i].riskValue)
                          riskI = riskIndicators[i].riskValue
                          setValue(`descriptiveFindings[${index}].scoring`, riskI)
                          setItem(!item1)
                          break
                        } else {
                          setValue(`descriptiveFindings[${index}].scoring`, 0)
                          setItem(!item1)
                          //console.log("no entiendo porque", riskI)
                        }
                      }

                      for (let i = 0; i < riskAssessment.length; i++) {
                        //console.log(riskAssessment[i])
                        if (riskI >= parseInt(riskAssessment[i].matrixLowerBand) && riskI <= parseInt(riskAssessment[i].matrixUpperBand)) {
                          //console.log(riskI, riskAssessment[i].description)
                          //riskRatingRef.current.value = riskAssessment[i].description
                          setValue(`descriptiveFindings[${index}].riskrating`, riskAssessment[i].description)
                          break
                        } else {
                          setValue(`descriptiveFindings[${index}].riskrating`, "Undefined")
                        }
                      }

                      //scoringRef.current.value = riskI
                      //console.log("mando este handle")
                      //handleFindings(dataJson)
                    }
                  }
                >
                  <option>Select...</option>
                  {
                    entityRegister.map(res => {
                      if (res.key === entityId) {
                        return (
                          res.riskIndicator.map((res, index) => {
                            return (<option key={index}>{res.indicator}</option>)
                          })
                        )
                      }

                    })

                  }
                </select>
              </div>


              <div className="col-2">
                <Controller
                  as={<input />}
                  name={`descriptiveFindings[${index}].scoring`}
                  control={control}
                  defaultValue={0}
                  className="form-control mt-3 text-center"
                  disabled// make sure to set up defaultValue
                />
              </div>

              <div className="col-2">
                <Controller
                  as={<input />}
                  name={`descriptiveFindings[${index}].riskrating`}
                  control={control}
                  defaultValue={`${item.riskrating}`}
                  className="form-control mt-3 text-center"
                  disabled// make sure to set up defaultValue
                />
              </div>

              <div className="col-2">
                <button type="button" onClick={() => {

                  remove(index)
                  //console.log(fields)
                  //setDeleteValue(!deleteValue)
                  //handleFindings(dataJson)

                }} className="btn btn-sm btn-danger mt-3">
                  Delete
              </button>
              </div>
            </React.Fragment>);
          })}
        </div>
      </div>

      <section>
        <button
          type="button"
          onClick={() => {
            append();
            //setDeleteValue(!deleteValue)
            //handleFindings(fields)
          }}
          className="btn btn-sm btn-primary mt-3"
        >
          Add Account
        </button>



        {/* <input type="submit" className="btn btn-sm btn-warning ml-3 mt-3"></input> */}


      </section>

      {/* <input type="submit" /> */}
    </form>
  );
}


