import React from 'react';
import Icon from 'components/shared/icon';

const STATE_ICONS = { accepted: 'check_circle', rejected: 'cancel' };

const renderIcon = (state, className = '') =>
  <Icon className={`story-link-icon ${state} ${className}`}
        material={STATE_ICONS[state] || ''} />

export default ({story}) => {
  const state = story.get('state');
  const id = story.id;

  return (
    <a href={`#story-${id}`} id={`story-link-${id}`} className='story-link'>
      { `#${id}` }
      { (state !== 'unscheduled') && renderIcon(state) }
      { (state === 'delivered') && renderIcon(state, 'aux') }
    </a>
  );
}
