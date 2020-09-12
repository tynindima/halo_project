import React, { useState } from 'react';
import cx from 'classnames';
import './styles/main.scss';
import InpuFile from './InputFile/InputFile';
import NewField from './NewField/NewField';

const Main = () => {
  const [files, setFiles] = useState([]);
  const [company, setCompany] = useState('');
  const [people, setPeople] = useState('');
  const [business, setBusiness] = useState('');
  const [description, setDescription] = useState('');
  const [isValid, setIsValid] = useState({
    people: false,
    peopleNum: false,
    business: false,
    description: false
  });

  const addFiles = (newFile) => {
    setFiles([...files, newFile]);
  };

  const clearAll = () => {
    setCompany('');
    setPeople('');
    setBusiness('');
    setDescription('');
    setFiles([]);
  };

  const handleSumbit = (event) => {
    event.preventDefault();

    const newIsValid = {
      people: false,
      peopleNum: false,
      business: false,
      description: false
    };

    const pattern = /^\d+$/;

    let check = 1;

    if (people === '') {
      newIsValid.people = true;
      check += 1;
    } else if (!pattern.test(+people) || +people < 1 || +people > 99) {
      newIsValid.peopleNum = true;
      check += 1;
    }

    if (business === '') {
      newIsValid.business = true;
      check += 1;
    }

    if (description === '') {
      newIsValid.description = true;
      check += 1;
    }

    setIsValid({ ...newIsValid });

    if (check === 1) {
      /* eslint-disable no-console */
      console.log(`Company name: ${company}`);
      console.log(`People: ${people}`);
      console.log(`Busines area: ${business}`);
      console.log(`Description: ${description}`);
      console.log(files);
      clearAll();
    }
  };

  const handleInput = ({ target }) => {
    const { name, value } = target;
    switch (name) {
      case 'company':
        setCompany(value);
        break;
      case 'people':
        setPeople(value);
        break;
      case 'business':
        setBusiness(value);
        break;
      case 'description':
        setDescription(value);
        break;
      default:
        break;
    }

    setIsValid({
      ...isValid,
      [name]: false,
    });
  };

  return (
    <form className="main" onSubmit={handleSumbit}>
      <div className="main__box">
        <NewField
          name="company"
          label="Your company name"
          placeholder="Type text"
          value={company}
          onChange={handleInput}
          isValid={isValid.company}
        />
        <NewField
          name="people"
          label="Number of people"
          placeholder="1-99"
          value={people}
          onChange={handleInput}
          isValid={isValid.people}
          isNumberValid={isValid.peopleNum}
        />
      </div>

      <div className="main__business">
        <NewField
          name="business"
          label="Business area"
          placeholder="Design, Marketing, Development, etc."
          value={business}
          onChange={handleInput}
          isValid={isValid.business}
        />
      </div>
      <div className="main__business">
        <label className="main__label" htmlFor="description">
          Description
          <textarea
            name="description"
            className={cx('main__textarea', { error: isValid.description })}
            placeholder=""
            id="description"
            value={description}
            onChange={handleInput}
          />
        </label>
        <p className="main__valid-text">
          {
            isValid.description
              ? 'This field in required'
              : ''
          }
        </p>
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
