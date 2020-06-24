import React from "react";

function getInvalidClass(error) {
  if (error) return "form__input--invalid";
  return "";
}

const Input = (props) => {
  const { value, onChange, name, label, type, accept, error } = props;
  return (
    <React.Fragment>
      <label className="form__label" htmlFor={name}>
        {label}
      </label>
      <input
        //ref={this.username}
        value={value}
        name={name}
        onChange={onChange}
        id={name}
        type={type}
        accept={accept}
        className={"form__input " + getInvalidClass(error)}
      />
      {error && <div className="form__label--invalid">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
