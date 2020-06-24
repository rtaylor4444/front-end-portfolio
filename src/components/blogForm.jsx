import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";
import CategoryList from "./common/categoryList";
import * as authService from "../services/authService";
import { blogService } from "../services/blogService";

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
    const blog = blogService.getBlog(parseInt(id, 10));
    if (!blog) return this.props.history.push("/not-found");
    //Convert this into formContent after our state is set
    this.setState(
      {
        blogID: parseInt(id, 10),
        data: { title: blog.content[0].data, category: blog.category },
      },
      () => {
        blog.content.forEach((item) =>
          this.createFormContent(item.type, item.data)
        );
      }
    );
  }
  createBlogContent(type, id) {
    const { data } = this.state;
    switch (type) {
      //Heading
      case 1:
        return data[`heading${id}`];
      //Paragraph
      case 2:
        return data[`paragraph${id}`];
      //Image
      case 3:
        return [data[`image${id}`], data[`image${id}_url`]];
      //Invalid type
      default:
        return;
    }
  }
  createBlogContentArray() {
    const { formContent, data } = this.state;
    const blogContent = [];
    blogContent.push({ type: 0, data: data.title });
    formContent.forEach((item) => {
      const blogData = this.createBlogContent(item.type, item.id);
      const blogItem = { type: item.type, data: blogData };
      blogContent.push(blogItem);
    });
    return blogContent;
  }
  createFormContent(type, value = "") {
    const { formContent, data } = this.state;
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
      //Image BUG - must verify image filetype
      case 3:
        console.log(value);
        data[`image${numType}`] = "";
        this.schema[`image${numType}`] = Joi.string().label(`Image ${numType}`);
        //Add future url so joi does not throw a fit
        data[`image${numType}_url`] = value[1];
        this.schema[`image${numType}_url`] = Joi.string();
        break;
      //Invalid type
      default:
        return;
    }
    //Add this type to our list
    formContent.push({ type, id: numType });
    //Keep track of how many of each content type we have
    this.numContentTypes[type] += 1;
    //Rerender our form
    this.setState({ formContent });
  }

  //Event Handlers
  handleFileUpload(e, id) {
    const { data } = this.state;
    e.preventDefault();
    if (!e.currentTarget) return;
    data[`image${id}`] = e.currentTarget.value;
    data[`image${id}_url`] = URL.createObjectURL(e.target.files[0]);
    this.handleChange(e);
  }
  doSubmit(e) {
    const { data, blogID } = this.state;
    e.preventDefault();
    const blogContent = this.createBlogContentArray();
    if (blogID === "new") {
      const error = blogService.addBlog(blogContent, data.category);
      if (error) return this.setState({ errors: { general: error } });
      //Go back to the home blog page
      this.props.history.push("/blog");
    } else {
      blogService.updateBlog(blogID, blogContent, data.category);
      //Go back to that specific blog page
      this.props.history.push(`/blog/${blogID}`);
    }
  }
  onAddFormContent(e, type) {
    e.preventDefault();
    this.createFormContent(type);
  }
  onRemoveFormContent(e, type, id) {
    const { formContent, data } = this.state;
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
        delete this.schema[`image${id}_url`];
        break;
      //Invalid type
      default:
        return;
    }
    //Remove from the form content
    const newContent = formContent.filter((item) => {
      return !(item.id === id && item.type === type);
    });
    //Remove stored data
    delete this.schema[varName];
    delete data[varName];
    //Rerender our form
    this.setState({ data, formContent: newContent });
  }

  renderBlogElement(content) {
    const { type, id } = content;
    const { data } = this.state;
    switch (type) {
      //Heading
      case 1:
        return (
          <h2 key={`b${type}${id}`} className="section_blog__blog_content__h2">
            {data[`heading${id}`]}
          </h2>
        );
      //Paragraph
      case 2:
        return (
          <p key={`b${type}${id}`} className="section_blog__blog_content__p">
            {data[`paragraph${id}`]}
          </p>
        );
      //Image
      case 3:
        return (
          <img
            key={`b${type}${id}`}
            src={data[`image${id}_url`]}
            alt="not found"
            className="section_blog__blog_content__image"
          />
        );
      default:
        return null;
    }
  }
  renderBlogPreview() {
    const { data, formContent } = this.state;
    return (
      <div className="section_blog__blog_container">
        <h1 className="section_blog__blog_content__h1">{data.title}</h1>
        {formContent.map((item) => this.renderBlogElement(item))}
      </div>
    );
  }
  renderFormContent(type, id) {
    let content;
    switch (type) {
      //heading
      case 1:
        content = this.renderInput("Heading", `heading${id}`);
        break;
      //paragraph
      case 2:
        content = this.renderTextArea("Paragraph", `paragraph${id}`);
        break;
      //image
      case 3:
        content = this.renderInputFile(
          "Upload Image",
          `image${id}`,
          "image/png, image/jpeg",
          (e) => {
            this.handleFileUpload(e, id);
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

    const { formContent } = this.state;
    return (
      <React.Fragment>
        <h1 className="u-center-text u-margin-bottom-med">Create Blog Post</h1>
        <div className="blog-row">
          <div className="blog-col-3-of-4">{this.renderBlogPreview()}</div>
          <div className="blog-col-1-of-4">
            <CategoryList history={this.props.history} />
          </div>
        </div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            {this.renderFormError()}
            {this.renderInput("Category", "category")}
            {this.renderInput("Blog Title", "title")}
            {formContent.map((item, i) => (
              <div key={i}>{this.renderFormContent(item.type, item.id)}</div>
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

/*
import axios from 'axios'; 

import React,{Component} from 'react'; 
import { blogService } from './../services/blogService';

class App extends Component { 

	state = { 

	// Initially, no file is selected 
	selectedFile: null
	}; 
	
	// On file select (from the pop up) 
	onFileChange = event => { 
	
	// Update the state 
	this.setState({ selectedFile: event.target.files[0] }); 
	
	}; 
	
	// On file upload (click the upload button) 
	onFileUpload = () => { 
	
	// Create an object of formData 
	const formData = new FormData(); 
	
	// Update the formData object 
	formData.append( 
		"myFile", 
		this.state.selectedFile, 
		this.state.selectedFile.name 
	); 
	
	// Details of the uploaded file 
	console.log(this.state.selectedFile); 
	
	// Request made to the backend api 
	// Send formData object 
	axios.post("api/uploadfile", formData); 
	}; 
	
	// File content to be displayed after 
	// file upload is complete 
	fileData = () => { 
	
	if (this.state.selectedFile) { 
		
		return ( 
		<div> 
			<h2>File Details:</h2> 
			<p>File Name: {this.state.selectedFile.name}</p> 
			<p>File Type: {this.state.selectedFile.type}</p> 
			<p> 
			Last Modified:{" "} 
			{this.state.selectedFile.lastModifiedDate.toDateString()} 
			</p> 
		</div> 
		); 
	} else { 
		return ( 
		<div> 
			<br /> 
			<h4>Choose before Pressing the Upload button</h4> 
		</div> 
		); 
	} 
	}; 
	
	render() { 
	
	return ( 
		<div> 
			<h1> 
			GeeksforGeeks 
			</h1> 
			<h3> 
			File Upload using React! 
			</h3> 
			<div> 
				<input type="file" onChange={this.onFileChange} /> 
				<button onClick={this.onFileUpload}> 
				Upload! 
				</button> 
			</div> 
		{this.fileData()} 
		</div> 
	); 
	} 
} 

export default App; 
*/
