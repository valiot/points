import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import StoryLink from 'components/story/StoryLink';
import Icon from 'components/shared/Icon';

const story = {id: 2, get: sinon.stub().returns('unscheduled')};

describe('<StoryLink />', function() {

  beforeEach(jasmineEnzyme);

  it("should have his id as content", function() {
    const wrapper = shallow(<StoryLink story={story} />);
    expect(wrapper.find('.story-link')).toHaveText('#2');
  });

  describe(".story-link-icon", function() {

    it("should not exist when story's state is unscheduled", function() {
      const wrapper = shallow(<StoryLink story={story} />);
      expect(wrapper.find(Icon).length).toBe(0);
    });

    it("should have two icons when state is delivered", function() {
      story.get = sinon.stub().returns('delivered');
      const wrapper = shallow(<StoryLink story={story} />);
      expect(wrapper.find(Icon).length).toBe(2);
    });

    it("should have a material icon when state is accepted", function() {
      story.get = sinon.stub().returns('accepted');
      const wrapper = shallow(<StoryLink story={story} />);
      expect(wrapper.find(Icon)).toHaveProp('material', 'check_circle');
    });

  });

});
