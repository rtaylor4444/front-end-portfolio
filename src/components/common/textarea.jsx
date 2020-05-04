import React from "react";

function getInvalidClass(error) {
  if (error) return "form__textarea--invalid";
  return "";
}

const TextArea = (props) => {
  const { value, onChange, name, label, error } = props;
  return (
    <React.Fragment>
      <label className="form__label" htmlFor={name}>
        {label}
      </label>
      <textarea
        className={"form__textarea " + getInvalidClass(error)}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="form__label--invalid">{error}</div>}
    </React.Fragment>
  );
};

export default TextArea;
