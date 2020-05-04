import React from "react";

//data has
//value:
//label:
const Select = (props) => {
  const { name, label, value, error, options, onChange } = props;
  return (
    <React.Fragment>
      <label className="form_label" htmlFor={name}>
        {label}
      </label>
      <select
        className="form__select"
        value={value}
        id={name}
        name={name}
        onChange={onChange}
      >
        <option value=""></option>
        {options.map((item) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Select;
