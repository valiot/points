import jasmineEnzyme from 'jasmine-enzyme';
import React from 'react';
import { shallow } from 'enzyme';

import StoryDescription from 'components/story/story_description';
import StoryLink from 'components/story/story_link';
import Markdown from 'react-remarkable';

var defaultProps = {
  description: 'Description',
  stories: { get: sinon.stub() }
};

describe('<StoryLink />', function() {

  beforeEach(jasmineEnzyme);

  describe("parseDescription", function() {

    it("should ignore when there are no ids", function() {
      const wrapper = shallow(<StoryDescription {...defaultProps} />)
      expect(wrapper.find(Markdown)).toHaveProp('source', 'Description');
    });

    it("should turn a valid id into a StoryLink", function() {
      const story = {id: 5, get: sinon.stub().returns('unscheduled')}
      const props = {
        description: 'Description #5',
        stories: { get: sinon.stub().returns(story) }
      };

      const wrapper = shallow(<StoryDescription {...props} />);
      expect(wrapper.html()).toContain('id="story-link-5"');
    });

    it("should be able to ignore invalid ids", function() {
      const props = defaultProps;
      props.description = 'Description #10' ;
      const wrapper = shallow(<StoryDescription {...props} />);
      expect(wrapper.find(Markdown)).toHaveProp('source', 'Description #10');
    });

  });

});
