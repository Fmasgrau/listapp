import showAnalyticalFindings from './showAnalyticalFindings'
import dataRA from './Data/Dummy/ic4pro_RiskAssessment.json'
import dataRI from './Data/Dummy/ic4pro_riskIndicators.json'



describe('showAnalyticalFindings', () => {

    test('testing none array', () => {

        const none = showAnalyticalFindings([])
        expect(none).toMatchObject({})
    })
   

    test('testing empty array', () => {

        const zero = showAnalyticalFindings()
        expect(zero).toMatchObject({})
    })

    test('testing one element', () => {

        const json = [
            {
                "accountNo": "1000130",
                "findings": "overdraft",
                "scoring": "4",
                "riskrating": "Low"
            }]

        const one = showAnalyticalFindings(json, dataRA, dataRI)

        expect(one).toStrictEqual({ "overdraft": { "scoring": 4, "riskrating": "Low" , "frequency": 1, "riskadvice" : "Low - Overdraft not authorised"} })
    })

    test('testing many elements without rep', () => {

        const json = [
            {
                "accountNo": "1000130",
                "findings": "overdraft",
                "scoring": "4",
                "riskrating": "Low"
            }, {
                "accountNo": "1212345",
                "findings": "inactive",
                "scoring": "6",
                "riskrating": "Medium"
            },
            {
                "accountNo": "1000130",
                "findings": "override",
                "scoring": "9",
                "riskrating": "High"
            }]

        const many = showAnalyticalFindings(json, dataRA, dataRI)

        expect(many).toStrictEqual({
            "overdraft": { "scoring": 4, "riskrating": "Low" , "frequency": 1, "riskadvice" : "Low - Overdraft not authorised"},
            "inactive": { "scoring": 6, "riskrating": "Low" , "frequency": 1, "riskadvice": "Low - Account Inactive"},
            "override": { "scoring": 9, "riskrating": "Medium" , "frequency": 1, "riskadvice" : "Send warning to the account holders"},
        })
    })




    test('testing many elements with rep', () => {

        const json = [
            {
                "accountNo": "1000130",
                "findings": "overdraft",
                "scoring": "4",
                "riskrating": "Low"
            }, {
                "accountNo": "1212345",
                "findings": "inactive",
                "scoring": "6",
                "riskrating": "Medium"
            },
            {
                "accountNo": "1000130",
                "findings": "overdraft",
                "scoring": "4",
                "riskrating": "Low"
            },{
                "accountNo": "1000130",
                "findings": "override",
                "scoring": "9",
                "riskrating": "High"
            },{
                "accountNo": "1000130",
                "findings": "overdraft",
                "scoring": "4",
                "riskrating": "Low"
            }]

        const many = showAnalyticalFindings(json, dataRA, dataRI)

        expect(many).toStrictEqual({
            "overdraft": { "scoring": 12, "riskrating": "Medium" , "frequency": 3, "riskadvice" : "Medium - Overdraft not authorised"},
            "inactive": { "scoring": 6, "riskrating": "Low" , "frequency" : 1, "riskadvice" : "Low - Account Inactive"},
            "override" : {"scoring": 9, "riskrating": "Medium", "frequency": 1, "riskadvice" : "Send warning to the account holders"}
            
        })
    })


    
})