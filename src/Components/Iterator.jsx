
export default function Iterator(item = {}) {


    //let lista = []
    let lista = {}
    let scoring = ''
    let freq = 0
    if (Object.keys(item).length > 0) {


        item.map((res) => {
            if (Object.keys(lista).indexOf(res.findings) >= 0) {
                scoring = parseInt(lista[res.findings]["scoring"]) + parseInt(res.scoring)
                freq = lista[res.findings]["frequency"] + 1
                lista[res.findings] = { "scoring": scoring, "riskrating": res.riskrating, "frequency": freq }

            } else {
                lista[res.findings] = { "scoring": parseInt(res.scoring), "riskrating": res.riskrating, "frequency": 1 }
            }

        return true})
    }

    return lista
}
