

export default function showAnalyticalFindings(item = {}, riskAssessment = [], riskIndicator = []) {


    //let lista = []
    let lista = {}
    let scoring = ''
    let freq = 0
    let riskRating = ""
    let riskAdvice = ""
    if (Object.keys(item).length > 0) {
        

        item.map((res, index) => {
            //console.log(res.findings)
            if (Object.keys(lista).indexOf(res.findings) >= 0) {
                //console.log("esta aca?")
                scoring = parseInt(lista[res.findings]["scoring"]) + parseInt(res.scoring)
                freq = lista[res.findings]["frequency"] + 1
                for(let i = 0; i < riskAssessment.length; i++){
                    if (scoring >= parseInt(riskAssessment[i].remarksLowerBand) && scoring <= parseInt(riskAssessment[i].remarksUpperBand)) {
                        //console.log(scoring, riskAssessment[i].key)
                        riskRating = riskAssessment[i].key
                        riskAdvice = riskAssessment[i].remarkImplication
                        let finding = res.findings
                        //console.log(finding)
                        riskIndicator.map(res => {
                            if(finding === res.key && res.analyticalfindings){
                                res.analyticalfindings.map( res2 =>{
                                    if(res2.riskassessmentId === riskRating){
                                        riskAdvice = res2.riskimplication
                                    }
                                })
                            }
                        })

                        break
                      }else{
                        riskRating = 0
                        riskAdvice = "Undefined"
                      }
                }
                lista[res.findings] = { "scoring": parseInt(scoring), "riskrating": riskRating, "frequency": freq, "riskadvice" : riskAdvice }

            } else {
                //console.log("el else", riskAssessment.length)
                for(let i = 0; i < riskAssessment.length; i++){
                    //console.log("esta acá")
                    if (parseInt(res.scoring) >= parseInt(riskAssessment[i].remarksLowerBand) && parseInt(res.scoring) <= parseInt(riskAssessment[i].remarksUpperBand)) {
                        //console.log(parseInt(res.scoring), riskAssessment[i].key)
                        riskRating = riskAssessment[i].key
                        riskAdvice = riskAssessment[i].remarkImplication

                        let finding = res.findings
                        //console.log(finding)
                        riskIndicator.map(res => {
                            
                            if(finding === res.key && res.analyticalfindings){
                                //console.log(finding)
                                res.analyticalfindings.map( res2 =>{
                                    if(res2.riskassessmentId === riskRating){
                                        //console.log(res2.riskassessmentId, riskRating)
                                        riskAdvice = res2.riskimplication
                                        //console.log(riskAdvice)
                                    }
                                })
                            }
                            
                        })

                        break
                      }else{
                        riskRating = 0
                        riskAdvice = "Undefined"
                      }
                }
                //console.log(riskAdvice)
                lista[res.findings] = { "scoring": parseInt(res.scoring), "riskrating": riskRating, "frequency": 1, "riskadvice": riskAdvice }
            }
            //console.log(lista, "index", index)
        return true})
    }

    return lista
}
