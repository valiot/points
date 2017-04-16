import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import Icon from 'components/shared/Icon';

describe('<Icon />', function() {

  beforeEach(jasmineEnzyme);

  it("should be material icon", function() {
    const wrapper = shallow(<Icon material='check_circle' />);
    expect(wrapper.find('i').html()).toBe('<i class="mi ">check_circle</i>');
  });

  it("should be a span element", function() {
    const wrapper = shallow(<Icon className='icon'/>);
    expect(wrapper.find('span').html()).toBe('<span class="icon"></span>');
  });

});
