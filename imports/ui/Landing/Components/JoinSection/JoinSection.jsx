import React, { Component } from 'react';
import PropTypes from 'prop-types';
import posed from 'react-pose';

import TextInput from '../../../Components/TextInput/TextInput';

import './JoinSection.scss';

const Logo = posed.div({
  pressable: true,
  init: { scale: 1 },
  press: { scale: 0.8 },
  hidden: {
    y: 50,
    opacity: 0,
    transition: { duration: 150 }
  },
  visible: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  }
});

export default class JoinSection extends Component {
  static propTypes = {
    handleCode: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    code: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    invalidMsg: PropTypes.string
  };

  static defaultProps = {
    code: ''
  };

  state = {
    visible: false
  };

  componentDidMount() {
    this.setState({
      visible: true
    });
  }

  render() {
    const { visible } = this.state;
    const { handleCode, handleSubmit, code, invalid, invalidMsg } = this.props;

    return (
      <>
        <Logo className="logo" pose={visible ? 'visible' : 'hidden'}>
          <img src="./logo-jpg-196.jpg" alt="" />
        </Logo>
        <TextInput
          name="session-code"
          onSubmit={handleSubmit}
          onChange={handleCode}
          value={code}
          invalid={invalid}
          invalidMsg={invalidMsg}
          label="Session code"
          placeholder="CODE"
        />
      </>
    );
  }
}
