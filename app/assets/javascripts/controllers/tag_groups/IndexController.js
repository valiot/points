import React from 'react';
import ReactDOM from 'react-dom';
import User from 'models/user';
import ColorPick from 'components/tag_groups/ColorPick';
import ProjectCollection from 'collections/project_collection';

export default () => {
  ReactDOM.render(<ColorPick/>, document.getElementById('tag_group_color'));
}
