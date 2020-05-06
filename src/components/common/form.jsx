import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import TextArea from "./textarea";

//Reuseable Component to be Inherited from
//Fill in the data object and create a schema in your inherited class

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const { data } = this.state;
    const result = Joi.validate(data, this.schema, { abortEarly: false });
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = (path, value) => {
    const obj = { [path]: value };
    const schema = { [path]: this.schema[path] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (event) => {
    //We do not want default submit form behavior since it reloads the page
    //and all of our code which is unwanted in a React.js application
    event.preventDefault();

    //const username = this.username.current.value;
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    //If we have any errors do not call the server
    if (errors) return;

    this.doSubmit(event);
  };

  handleChange = (event) => {
    const errors = { ...this.state.errors };
    //Use event.currentTarget to get a value from an input field
    const { name: path, value } = event.currentTarget;
    const errorMessage = this.validateProperty(path, value);
    if (errorMessage) errors[path] = errorMessage;
    else delete errors[path];

    const data = { ...this.state.data };
    data[path] = value;

    this.setState({ data, errors });
  };

  renderInput(label, path, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        label={label}
        name={path}
        value={data[path]}
        type={type}
        error={errors[path]}
        onChange={this.handleChange}
      />
    );
  }

  renderSelect(label, path, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={path}
        value={data[path]}
        label={label}
        options={options}
        error={errors[path]}
        onChange={this.handleChange}
      />
    );
  }

  renderTextArea(label, path) {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={path}
        value={data[path]}
        label={label}
        error={errors[path]}
        onChange={this.handleChange}
      />
    );
  }

  renderButton(label) {
    return (
      <div className="u-center-text">
        <button disabled={this.validate()} className="btn">
          {label}
        </button>
      </div>
    );
  }

  renderFormError() {
    return (
      <p className="form__label--invalid u-center-text">
        {this.state.errors.general}
      </p>
    );
  }
}

export default Form;
