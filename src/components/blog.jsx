import React, { Component } from "react";

class Blog extends Component {
  state = {
    categories: [
      {
        title: "Web Development",
        blogRefs: [],
      },
      {
        title: "Game Development",
        blogRefs: [],
      },
    ],
  };

  async componentDidMount() {
    //Call the server to get catergories
  }

  onCategoryClick(e, category) {
    if (!category.clicked) category.clicked = true;
    else category.clicked = false;
    this.setState({ categories: this.state.categories });
  }

  getCategoryClassName(category) {
    if (category.clicked) return "fa fa-caret-down";
    return "fa fa-caret-right";
  }
  renderCategoryItem(curCategory, i) {
    return (
      <li
        key={i}
        className="section_blog__catergory_item"
        onClick={(e) => this.onCategoryClick(e, curCategory)}
      >
        <i className={this.getCategoryClassName(curCategory)}></i>
        {curCategory.title}
      </li>
    );
  }
  renderBlogs() {
    const blogList = this.state.blogs;
    if (!blogList || blogList.length === 0)
      return <h1>Sorry, there are no blog posts yet!</h1>;
  }

  render() {
    return (
      <section className="section_blog">
        <div className="blog-row">
          <div className="blog-col-3-of-4">
            <div className="section_blog__blog_container">
              {this.renderBlogs()}
            </div>
          </div>
          <div className="blog-col-1-of-4">
            <div className="section_blog__category_container">
              <h2 className="section_blog__category_text">Categories</h2>
              <ul>
                {this.state.categories.map((item, index) =>
                  this.renderCategoryItem(item, index)
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Blog;
