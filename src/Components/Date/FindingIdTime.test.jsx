import React from 'react'
import FindingIdTime from './FindingIdTime'
import { shallow } from 'enzyme'

describe('FindingIdTime', () => {

    test('render', () =>{
        const wrapper = shallow(<FindingIdTime mode={"create"} date={"20200925-101231"}/>)

        console.log(wrapper.text())
    })
})