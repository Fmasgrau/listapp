import Iterator from './Iterator'



describe('Iterator', () => {

    const json = [
        {
            "accountNo": "1000130",
            "findings": "overdraft",
            "scoring": "4",
            "riskrating": "Low"
        },
        {
            "accountNo": "1212345",
            "findings": "inactive",
            "scoring": "6",
            "riskrating": "Medium"
        },
        {
            "accountNo": "1301345",
            "findings": "overdraft",
            "scoring": "4",
            "riskrating": "Low"
        },
        {
            "accountNo": "1000130",
            "findings": "override",
            "scoring": "9",
            "riskrating": "High"
        }
    ]

    test('testing empty array', () => {

        const zero = Iterator()
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

        const one = Iterator(json)

        expect(one).toStrictEqual({ "overdraft": { "scoring": 4, "riskrating": "Low" , "frequency": 1} })
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

        const many = Iterator(json)

        expect(many).toStrictEqual({
            "overdraft": { "scoring": 4, "riskrating": "Low" , "frequency": 1},
            "inactive": { "scoring": 6, "riskrating": "Medium" , "frequency": 1},
            "override": { "scoring": 9, "riskrating": "High" , "frequency": 1},
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

        const many = Iterator(json)

        expect(many).toStrictEqual({
            "overdraft": { "scoring": 12, "riskrating": "Low" , "frequency": 3},
            "inactive": { "scoring": 6, "riskrating": "Medium" , "frequency" : 1},
            "override" : {"scoring": 9, "riskrating": "High", "frequency": 1}
            
        })
    })

})