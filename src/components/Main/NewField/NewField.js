import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const NewField = (props) => {
  const {
    name,
    label,
    placeholder,
    value,
    onChange,
    isValid,
    isNumberValid
  } = props;

  let mistake = '';

  if (isValid) {
    mistake = 'This field in required';
  } else if (isNumberValid) {
    mistake = 'Please enter number from 1 to 99';
  }

  return (
    <div>
      <label className="main__label" htmlFor={name}>
        {label}
        <input
          className={cx('main__input', { error: isValid }, { error: isNumberValid })}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          type="text"
          autoComplete="off"
          onChange={onChange}
        />
      </label>
      <p className="main__valid-text">{mistake}</p>
    </div>
  );
};

NewField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool,
  isNumberValid: PropTypes.bool,
};

NewField.defaultProps = {
  isValid: false,
  isNumberValid: false
};

export default NewField;
