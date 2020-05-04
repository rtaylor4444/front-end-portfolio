import React from "react";

function getInvalidClass(error) {
  if (error) return "form__input--invalid";
  return "";
}

const Input = (props) => {
  const { value, onChange, name, label, type, error } = props;
  return (
    <React.Fragment>
      {
        //We use ref to access document data that was typed in from the user
        //This is mainly for react, in vanilla js we would have use
        //document.getElementById("username").value
        //
        //value attribute can be used so that we are always using our state for the value
        //
        //name attribute is used to we can access the object dynamically via [] operator
      }
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
        className={"form__input " + getInvalidClass(error)}
      />
      {error && <div className="form__label--invalid">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
