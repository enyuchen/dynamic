import React from 'react';
import PropTypes from 'prop-types';

import './TextInput.scss';

function TextInput(props) {
  const { name, value, label, placeholder, onChange, onSubmit } = props;
  const { invalid, invalidMsg } = props;

  const handleSubmit = evt => {
    if (evt.key === 'Enter') onSubmit(evt);
  };

  return (
    <div className="field-container">
      <label className="field-title" htmlFor={name}>
        {label}
        <div className="input-container">
          <input
            className={'input-text' + (invalid ? ' invalid' : '')}
            type="text"
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={evt => onChange(evt)}
            onKeyPress={evt => handleSubmit(evt)}
          />
          {invalid && <span className="input-message">{invalidMsg}</span>}
        </div>
      </label>
    </div>
  );
}

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  invalid: PropTypes.bool,
  invalidMsg: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func
};

TextInput.defaultProps = {
  invalid: false,
  invalidMsg: 'Invalid input',
  placeholder: 'Placeholder',
  label: 'Label',
  onSubmit: () => {}
};

export default TextInput;