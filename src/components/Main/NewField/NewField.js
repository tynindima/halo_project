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
    errorMessage,
    isValid,
    onBlur
  } = props;

  const handleBlud = (event) => {
    const { target } = event;

    onBlur(target.name);
  };

  return (
    <div>
      <label className="main__label" htmlFor={name}>
        {label}
        {name !== 'company' && <span className="main__asterisk">*</span> }

        <input
          className={cx('main__input', { error: isValid })}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          type="text"
          autoComplete="off"
          onChange={onChange}
          onBlur={handleBlud}
        />
      </label>
      <p className="main__valid-text">{errorMessage}</p>
    </div>
  );
};

NewField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  errorMessage: PropTypes.string,
  isValid: PropTypes.bool,
};

NewField.defaultProps = {
  isValid: false,
  errorMessage: '',
  onBlur: () => {},
};

export default NewField;
