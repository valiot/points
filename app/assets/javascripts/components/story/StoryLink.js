import React from 'react';
import Icon from 'components/shared/Icon';

const STATE_ICONS = { accepted: 'check_circle', rejected: 'cancel' };

export default class StoryLink extends React.Component {

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { story } = this.props;
    story && _.each(story.views, view => view.highlight());
  }

  renderIcon(state, className = '') {
    return (
      <Icon className={`story-link-icon ${state} ${className}`}
            material={STATE_ICONS[state] || ''} />
    );
  }

  render() {
    const { story } = this.props;
    const state = story.get('state');
    const id = story.id;
    const popoverContent = require('templates/story_hover.ejs')({
      story: story,
      noteTemplate: require('templates/note.ejs')
    });

    return (
      <a className='story-link popover-activate'
         data-content={popoverContent}
         data-original-title={story.get('title')}
         id={`story-link-${id}`}
         href={`#story-${id}`}
         onClick={this.handleClick}>
        { `#${id}` }
        { (state !== 'unscheduled') && this.renderIcon(state) }
        { (state === 'delivered') && this.renderIcon(state, 'aux') }
      </a>
    );
  }

}
