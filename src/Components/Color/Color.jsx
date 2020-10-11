
export default function Color(rating, riskAs = [], riskCol = []) {

var color = "FFFFFF"
var fontColor = "white"

riskAs.map(res => {
    if(rating === res.key){
        color = res.RiskColour
        riskCol.map( res2 =>{
            if(res2.colourId === color){
                color = res2.RGB
                fontColor = res2.FontColor

            }
        })
    }

    

})

return {color, fontColor}

}
