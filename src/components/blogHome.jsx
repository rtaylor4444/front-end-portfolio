import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { blogService } from "../services/blogService";
import BlogItem from "./common/blogItem";
import CategoryList from "./common/categoryList";
import errorHandler from "../services/errorHandler";

class BlogHome extends Component {
  state = {
    recentBlogs: [],
  };
  async componentDidMount() {
    const result = await blogService.getRecentBlogs();
    const { recentBlogs, errors } = result;
    let error;
    if (errors) error = errorHandler.handleBlogError(errors, {});
    this.setState({
      recentBlogs,
      error: error,
    });
  }
  renderBlogRecentPost(blog) {
    return (
      <div key={blog._id} className="section_blog__blog_content">
        <BlogItem
          blog={blog.content}
          limit={5}
          isLink={true}
          blogID={blog._id}
        />
        <Link
          className="section_blog__blog_content__read_more"
          to={`/blog/${blog._id}`}
        >
          Read More...
        </Link>
      </div>
    );
  }
  renderRecentBlogs() {
    const { recentBlogs } = this.state;
    if (recentBlogs.length === 0)
      return (
        <h1 className="u-center-text">Sorry, there are no blog posts yet!</h1>
      );

    return (
      <div className="section_blog__blog_container">
        {recentBlogs.map((item) => this.renderBlogRecentPost(item))}
      </div>
    );
  }
  renderError() {
    return (
      <p className="form__label--invalid u-center-text">
        {this.state.error.general}
      </p>
    );
  }
  render() {
    const user = getCurrentUser();
    const { error } = this.state;
    return (
      <section className="section_blog">
        <div className="blog-row">
          <div className="blog-col-3-of-4">
            {user && user.isAdmin && (
              <div className="u-center-text">
                <Link to="/make-blog/new" className="btn u-center-text">
                  Make Blog Post
                </Link>
              </div>
            )}
            {error ? this.renderError() : this.renderRecentBlogs()}
          </div>
          <div className="blog-col-1-of-4">
            <CategoryList history={this.props.history} />
          </div>
        </div>
      </section>
    );
  }
}

export default BlogHome;
