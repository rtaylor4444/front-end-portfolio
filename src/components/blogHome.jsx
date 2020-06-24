import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { blogService } from "../services/blogService";
import BlogItem from "./common/blogItem";
import CategoryList from "./common/categoryList";

class BlogHome extends Component {
  state = {
    recentBlogs: [],
  };
  async componentDidMount() {
    const recentBlogs = blogService.getRecentBlogs();
    this.setState({ recentBlogs });
  }
  renderBlogRecentPost(blog) {
    return (
      <div key={blog.id} className="section_blog__blog_content">
        <BlogItem
          blog={blog.content}
          limit={4}
          isLink={true}
          blogID={blog.id}
        />
        <Link
          className="section_blog__blog_content__read_more"
          to={`/blog/${blog.id}`}
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
  render() {
    const user = getCurrentUser();
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
            {this.renderRecentBlogs()}
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
