import React from 'react';
import { renderToString } from 'react-dom/server';
import Markdown from 'react-remarkable';

import StoryLink from 'components/story/story_link';

const LOCAL_STORY_REGEXP = /(?!\s|\b)(#\d+)(?!\w)/g;

export default class StoryDescription extends React.Component {

  constructor() {
    super();
    this.parseDescription = this.parseDescription.bind(this);
  }

  parseDescription() {
    var {stories, description} = this.props;

    description = description.split(LOCAL_STORY_REGEXP);
    let id, story;
    for (var i = 1, length = description.length; i < length; i += 2) {
      id = description[i].substring(1);
      story = stories.get(id);

      if (story) {
        description[i] = renderToString(
          <StoryLink story={story} key={i} />
        );
      }
    }

    return description.join('');
  }

  render() {
    return (
      <Markdown
        options={{ html: true, breaks: true, linkify: true }}
        source={this.parseDescription()} />
    );
  }

}
