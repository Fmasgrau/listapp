import {shallow} from 'enzyme'
import Home from './Home'
import React from 'react'

describe('Home', () => {

    test('Render', () => {
        const wrapper = shallow(<Home />)

        console.log(wrapper.html())
    })
})