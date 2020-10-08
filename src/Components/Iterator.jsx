import riskAssessment from './Data/Dummy/ic4pro_RiskAssessment.json'


export default function Iterator(item = {}) {


    //let lista = []
    let lista = {}
    let scoring = ''
    let freq = 0
    let riskRating = ""
    let riskAdvice = ""
    if (Object.keys(item).length > 0) {


        item.map((res) => {

            if (Object.keys(lista).indexOf(res.findings) >= 0) {
                scoring = parseInt(lista[res.findings]["scoring"]) + parseInt(res.scoring)
                freq = lista[res.findings]["frequency"] + 1
                for(let i = 0; i < riskAssessment.length; i++){
                    if (scoring >= parseInt(riskAssessment[i].remarksLowerBand) && scoring <= parseInt(riskAssessment[i].remarksUpperBand)) {
                        console.log(scoring, riskAssessment[i].description)
                        riskRating = riskAssessment[i].description
                        riskAdvice = riskAssessment[i].remarkImplication
                        break
                      }else{
                        riskRating = 0
                        riskAdvice = "Undefined"
                      }
                }
                lista[res.findings] = { "scoring": scoring, "riskrating": riskRating, "frequency": freq, "riskadvice" : riskAdvice }

            } else {
                for(let i = 0; i < riskAssessment.length; i++){
                    if (parseInt(res.scoring) >= parseInt(riskAssessment[i].remarksLowerBand) && parseInt(res.scoring) <= parseInt(riskAssessment[i].remarksUpperBand)) {
                        console.log(parseInt(res.scoring), riskAssessment[i].description)
                        riskRating = riskAssessment[i].description
                        riskAdvice = riskAssessment[i].remarkImplication
                        break
                      }else{
                        riskRating = 0
                        riskAdvice = "Undefined"
                      }
                }
                lista[res.findings] = { "scoring": parseInt(res.scoring), "riskrating": riskRating, "frequency": 1, "riskadvice": riskAdvice }
            }

        return true})
    }

    return lista
}
