import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import './styles/input_file.scss';

const InputFile = (props) => {
  const { files, addFiles } = props;

  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    addFiles(fileUploaded);
  };

  return (
    <div className="input-file">
      <button className="input-file__btn" type="button" onClick={handleClick}>
        Add file as attachment
      </button>
      <input
        className="input-file__input"
        type="file"
        ref={hiddenFileInput}
        onChange={handleChange}
      />
      <span className="input-file__counting-text">{`${files.length} files attached`}</span>
    </div>
  );
};

InputFile.propTypes = {
  files: PropTypes.arrayOf(PropTypes.object),
  addFiles: PropTypes.func.isRequired,

};

InputFile.defaultProps = {
  files: [],
};

export default InputFile;
