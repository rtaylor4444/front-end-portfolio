import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import CategoryList from "./common/categoryList";
import BlogItem from "./common/blogItem";
import * as authService from "../services/authService";
import { blogService } from "../services/blogService";
import errorHandler from "../services/errorHandler";

//FormContent type
//0 - misc (title, category... etc)
//1 - heading
//2 - paragraph
//3 - image
class BlogForm extends Form {
  state = {
    data: { title: "", category: "" },
    errors: {},
    formContent: [],
    blogID: "new",
    blogContent: { content: [{ contentType: 0, data: "", _id: 0 }] },
  };
  schema = {
    title: Joi.string().required().label("Blog Title").min(3),
    category: Joi.string().required().label("Category").min(3),
  };

  //Keep track of how many content of each type was created
  numContentTypes = [1, 0, 0, 0];
  async componentDidMount() {
    const id = this.props.match.params.id;
    //Do not do anything when creating a new blog
    if (id === "new") return;

    const blogContent = await blogService.getBlog(id);
    if (!blogContent) return this.props.history.push("/not-found");

    //Convert blogContent into formContent
    this.state.data = {
      title: blogContent.content[0].data,
      category: blogContent.category,
    };
    blogContent.content.forEach((item) => {
      //Data must be set properly for images
      if (item.contentType === 3)
        this.state[`imageData${this.numContentTypes[3]}`] = item.data;
      this.createFormContent(item.contentType, item.data, true);
    });

    this.setState({
      blogID: blogContent._id,
      data: this.state.data,
      formContent: this.state.formContent,
      blogContent,
    });
  }
  createFormContent(type, value = "", isFromServer = false) {
    const { formContent, blogContent, data } = this.state;
    //Add a new variable to our schema and our state data
    const numType = this.numContentTypes[type];
    switch (type) {
      //Heading
      case 1:
        data[`heading${numType}`] = value;
        this.schema[`heading${numType}`] = Joi.string()
          .required()
          .label(`Heading ${numType}`)
          .min(3);
        break;
      //Paragraph
      case 2:
        data[`paragraph${numType}`] = value;
        this.schema[`paragraph${numType}`] = Joi.string()
          .required()
          .label(`Paragraph ${numType}`)
          .min(3);
        break;

      case 3:
        //Set empty since file input elements cannot have a predefined value
        data[`image${numType}`] = "";
        //We will verify image filetype outside of joi
        //Due to lacking a url from our server
        this.schema[`image${numType}`] = Joi.any();
        break;
      //Invalid type
      default:
        return;
    }
    //Add this type to our list
    formContent.push({ type, id: numType });
    //Only add blog content if we arent loading from our server
    if (!isFromServer) {
      blogContent.content.push({
        contentType: type,
        data: value,
        _id: numType,
      });
    }
    //Keep track of how many of each content type we have
    this.numContentTypes[type] += 1;
  }

  //Event Handlers
  handleFileUpload(e, id, index) {
    const { data, blogContent } = this.state;
    e.preventDefault();
    if (!e.currentTarget) return;

    //BUG - verify file extension
    //if fail no image is loaded
    //Set our file information
    data[`image${id}`] = e.currentTarget.value;

    //Read file data
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(e.target.files[0]);

    //Loaded successfully
    fileReader.onload = () => {
      //Convery binary string to base64 ascii string
      blogContent.content[index].data = btoa(fileReader.result);
      this.setState({ blogContent });
    };

    //Error
    fileReader.onerror = () => {
      console.log(fileReader.error);
      const errors = errorHandler.handleBlogError(
        fileReader.error,
        this.state.errors
      );
      this.setState({ errors });
    };
    this.handleChange(e);
  }
  async doSubmit(e) {
    const { data, blogID, blogContent } = this.state;
    let error;
    e.preventDefault();
    let redirectURL;
    if (blogID === "new") {
      error = await blogService.addBlog(blogContent.content, data.category);
      //Go back to the home blog page
      redirectURL = "/blog";
    } else {
      error = await blogService.updateBlog(
        blogID,
        blogContent.content,
        data.category
      );
      //Go back to that specific blog page
      redirectURL = `/blog/${blogID}`;
    }
    if (error) {
      const errors = errorHandler.handleBlogError(error, this.state.errors);
      return this.setState({ errors });
    }
    this.props.history.push(redirectURL);
  }
  onValueChange(e, index) {
    const { blogContent } = this.state;
    e.preventDefault();
    const { value } = e.currentTarget;
    //Edit our blog content as well
    blogContent.content[index].data = value;
    this.handleChange(e);
    this.setState({ blogContent });
  }
  onAddFormContent(e, type) {
    const { formContent } = this.state;
    e.preventDefault();
    this.createFormContent(type);
    //Rerender our form
    this.setState({ formContent });
  }
  onRemoveFormContent(e, type, id) {
    const { formContent, blogContent, data } = this.state;
    e.preventDefault();
    //Get our variable name
    let varName;
    switch (type) {
      //Heading
      case 1:
        varName = `heading${id}`;
        break;
      //Paragraph
      case 2:
        varName = `paragraph${id}`;
        break;
      //Image
      case 3:
        varName = `image${id}`;
        break;
      //Invalid type
      default:
        return;
    }
    //Remove from the form content
    let indexToDelete;
    const newContent = formContent.filter((item, i) => {
      if (item.id === id && item.type === type) {
        indexToDelete = i + 1;
        return false;
      }
      return true;
    });
    //Remove from the blog content
    const newBlogContent = blogContent.content.filter((item, i) => {
      return i !== indexToDelete;
    });
    //Remove stored data
    delete this.schema[varName];
    delete data[varName];
    //Rerender our form
    this.setState({
      data,
      formContent: newContent,
      blogContent: { content: newBlogContent },
    });
  }

  //Rendering
  renderFormContent(type, id, index) {
    let content;
    switch (type) {
      //heading
      case 1:
        content = this.renderInput("Heading", `heading${id}`, "text", (e) =>
          this.onValueChange(e, index)
        );
        break;
      //paragraph
      case 2:
        content = this.renderTextArea("Paragraph", `paragraph${id}`, (e) =>
          this.onValueChange(e, index)
        );
        break;
      //image
      case 3:
        content = this.renderInputFile(
          "Upload Image",
          `image${id}`,
          "image/png, image/jpeg",
          (e) => {
            this.handleFileUpload(e, id, index);
          }
        );
        break;
      default:
        return null;
    }
    //Add a remove button to the form element
    return (
      <React.Fragment>
        <div className="form__width--restrict">{content}</div>
        <button
          className="btn btn--red_small"
          onClick={(e) => this.onRemoveFormContent(e, type, id)}
        >
          -
        </button>
      </React.Fragment>
    );
  }
  render() {
    //No access unless logged in and an admin
    const user = authService.getCurrentUser();
    if (!user || !user.isAdmin) return <Redirect to="/blog" />;

    const { formContent, blogContent } = this.state;
    return (
      <React.Fragment>
        <h1 className="u-center-text u-margin-bottom-med">Create Blog Post</h1>
        <div className="blog-row">
          <div className="blog-col-3-of-4">
            <div className="section_blog__blog_container">
              <BlogItem blog={blogContent.content} />
            </div>
          </div>
          <div className="blog-col-1-of-4">
            <CategoryList history={this.props.history} />
          </div>
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.renderFormError()}
            {this.renderInput("Category", "category")}
            {this.renderInput("Blog Title", "title", "text", (e) =>
              this.onValueChange(e, 0)
            )}
            {formContent.map((item, i) => (
              <div key={i}>
                {this.renderFormContent(item.type, item.id, i + 1)}
              </div>
            ))}
            <button
              className="btn"
              onClick={(e) => this.onAddFormContent(e, 1)}
            >
              Add Heading
            </button>
            <button
              className="btn"
              onClick={(e) => this.onAddFormContent(e, 2)}
            >
              Add Paragraph
            </button>
            <button
              className="btn"
              onClick={(e) => this.onAddFormContent(e, 3)}
            >
              Add Image
            </button>
            {this.renderButton("Submit")}
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default BlogForm;
