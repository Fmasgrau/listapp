import Color from './Color'
import RiskA from '../Data/Dummy/ic4pro_RiskAssessment.json'
import ColorDummy from '../Data/Dummy/ic4pro_statusColors.json'

describe('Color', () => {

    test('testing none colors', () =>{
        
        const none = Color("12314")

        expect(none).toStrictEqual({"color":"FFFFFF", "fontColor" : "white"})
    })

    test('testing zero colors', () =>{
        
        const none = Color()

        expect(none).toStrictEqual({"color":"FFFFFF", "fontColor" : "white"})
    })

    test('one rating', () =>{
        
        const none = Color('Low', RiskA, ColorDummy)

        expect(none).toStrictEqual({"color":"0000FF", "fontColor" : "white"})
    })
})
