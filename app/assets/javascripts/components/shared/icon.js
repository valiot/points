import React from 'react';

export default ({className = '', material}) =>
  (material)
    ? <i className={`mi ${className}`}>{material}</i>
    : <span className={className}></span>
