import React from 'react';
import reactCSS from 'reactcss'
import { TwitterPicker } from 'react-color'

export default class ColorPick extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      },
    };

    this.handleClick = () => {
      this.setState({ displayColorPicker: !this.state.displayColorPicker })
    };

    this.handleClose = () => {
      this.setState({ displayColorPicker: false })
    };

    this.handleChange = (color) => {
      this.setState({ color: color.rgb })
    };
  }

  getHexColor()
  {
    let r = parseInt(this.state.color.r).toString(16)
    let g = parseInt(this.state.color.g).toString(16)
    let b = parseInt(this.state.color.b).toString(16)
    return "#" + r + g + b
  }

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
          <input type="hidden" value={ this.getHexColor() } name="bg_color" />
        </div>
        { this.state.displayColorPicker ? <div style={ styles.popover }>
          <div style={ styles.cover } onClick={ this.handleClose }/>
          <TwitterPicker color={ this.state.color } onChange={ this.handleChange } />
        </div> : null }

      </div>
    )
  }
}

