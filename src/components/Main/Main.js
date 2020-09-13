import React, { useState } from 'react';
import cx from 'classnames';
import './styles/main.scss';
import InpuFile from './InputFile/InputFile';
import NewField from './NewField/NewField';

const initialState = {
  company: '',
  people: '',
  business: '',
  description: '',
};

const Main = () => {
  const [files, setFiles] = useState([]);
  const [values, setValues] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState({
    people: '',
    business: '',
    description: ''
  });
  const [isValid, setIsValid] = useState({
    people: false,
    business: false,
    description: false
  });

  const isEmptyString = (name) => {
    if (!values[name]) {
      setErrorMessage({
        ...errorMessage,
        [name]: 'This field in required'
      });
      setIsValid({
        ...isValid,
        [name]: true
      });

      return true;
    }

    return false;
  };

  const isEmptyOfNumber = (name) => {
    const pattern = /^\d+$/;

    if (!values[name]) {
      setErrorMessage({
        ...errorMessage,
        [name]: 'This field in required'
      });
      setIsValid({
        ...isValid,
        [name]: true
      });

      return true;
    } if (!pattern.test(+values[name]) || +values[name] < 1 || +values[name] > 99) {
      setErrorMessage({
        ...errorMessage,
        [name]: 'Please enter number from 1 to 99'
      });
      setIsValid({
        ...isValid,
        [name]: true
      });

      return true;
    }

    return false;
  };

  const addFiles = (newFile) => {
    setFiles([...files, newFile]);
  };

  const clearAll = () => {
    setValues({ ...initialState });
    setFiles([]);
  };

  const validate = () => {
    const newIsValid = {
      people: false,
      business: false,
      description: false
    };
    let peopleErrorTemp = '';
    let businessErrorTemp = '';
    let descriptionErrorTemp = '';

    const pattern = /^\d+$/;

    if (!values.people) {
      peopleErrorTemp = 'This field in required';
      newIsValid.people = true;
    } else if (!pattern.test(+values.people) || +values.people < 1 || +values.people > 99) {
      peopleErrorTemp = 'Please enter number from 1 to 99';
      newIsValid.people = true;
    }

    if (!values.business) {
      businessErrorTemp = 'This field in required';
      newIsValid.business = true;
    }

    if (!values.description) {
      descriptionErrorTemp = 'This field in required';
      newIsValid.description = true;
    }

    if (peopleErrorTemp || businessErrorTemp || descriptionErrorTemp) {
      setIsValid({ ...newIsValid });
      setErrorMessage({
        people: peopleErrorTemp,
        business: businessErrorTemp,
        description: descriptionErrorTemp
      });

      return false;
    }

    return true;
  };

  const handleSumbit = (event) => {
    event.preventDefault();
    const check = validate();

    if (check) {
      /* eslint-disable no-console */
      console.log(`Company name: ${values.company}`);
      console.log(`People: ${values.people}`);
      console.log(`Busines area: ${values.business}`);
      console.log(`Description: ${values.description}`);
      console.log(files);
      clearAll();
    }
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;

    setValues({
      ...values,
      [name]: value,
    });

    setErrorMessage({
      ...errorMessage,
      [name]: '',
    });

    setIsValid({
      ...isValid,
      [name]: false,
    });
  };

  const handleBlur = (name) => {
    switch (name) {
      case 'people':
        isEmptyOfNumber(name);
        break;
      case 'description':
      case 'business':
        isEmptyString(name);
        break;
      default:
        break;
    }
  };

  return (
    <form className="main" onSubmit={handleSumbit}>
      <div className="main__box">
        <NewField
          name="company"
          label="Your company name"
          placeholder="Type text"
          value={values.company}
          onChange={handleInput}
        />
        <NewField
          name="people"
          label="Number of people"
          placeholder="1-99"
          value={values.people}
          onChange={handleInput}
          isValid={isValid.people}
          errorMessage={errorMessage.people}
          onBlur={handleBlur}
        />
      </div>

      <div className="main__business">
        <NewField
          name="business"
          label="Business area"
          placeholder="Design, Marketing, Development, etc."
          value={values.business}
          onChange={handleInput}
          isValid={isValid.business}
          errorMessage={errorMessage.business}
          onBlur={handleBlur}
        />
      </div>
      <div className="main__business">
        <label className="main__label" htmlFor="description">
          Description
          <span className="main__asterisk">*</span>
          <textarea
            name="description"
            className={cx('main__textarea', { error: isValid.description })}
            placeholder="Type text"
            id="description"
            value={values.description}
            onChange={handleInput}
            onBlur={() => handleBlur('description')}
          />
        </label>
        <p className="main__valid-text">{errorMessage.description}</p>
      </div>
      <div className="main__business">
        <InpuFile files={files} addFiles={addFiles} />
      </div>
      <button className="main__button button" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Main;
