import React from 'react';
import Parser from 'html-react-parser'

import StoryLink from 'components/story/StoryLink';

const LOCAL_STORY_REGEXP = /(?!\s|\b)(#\d+)(?!\w)/g;

class StoryDescription extends React.PureComponent {

  constructor(props) {
    super(props);

    const description = Parser(props.description, { replace: domNode => {
      if (!domNode.attribs || !domNode.attribs['data-story-id']) return;

      const id = domNode.attribs['data-story-id'];
      const story = props.linkedStories[id];
      return ( <StoryLink story={story} key={id} /> );
    }});

    this.state = {
      description: description,
      isEmpty: (!props.description || props.description.length === 0)
    };

    this.renderDescription = this.renderDescription.bind(this);
    this.parseStoryLinks = this.renderDescription.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  renderDescription() {
    return (
      <div className='description'>
        {this.state.description}
      </div>
    );
  }

  editButton() {
    return (
      <input
        className={(!this.props.isReadonly) && 'edit-description'}
        value={I18n.t('edit')}
        type="button" />
    );
  }

  render() {
    return (this.state.isEmpty)
      ? this.editButton()
      : this.renderDescription();
  }

}

export default StoryDescription;
