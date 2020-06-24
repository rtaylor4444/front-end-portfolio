import React, { Component } from "react";
import { blogService } from "../../services/blogService";

class CategoryList extends Component {
  state = { categories: {} };

  async componentDidMount() {
    const categories = blogService.getCategories();
    this.setState({ categories });
  }

  onCategoryClick = (e, category) => {
    //Toggle if a catergory will disply sub catergories
    if (!category.clicked) category.clicked = true;
    else category.clicked = false;
    //Send user to that blog if there is an id
    if (category.id || category.id === 0)
      return this.props.history.push(`/blog/${category.id}`);
    //Re-render our list
    this.setState({ categories: this.state.categories });
  };
  getCategoryClassName(category) {
    if (category.id || category.id === 0) return "";
    else if (category.clicked) return "fa fa-caret-down";
    return "fa fa-caret-right";
  }
  renderCategoryItem(categoryObj, key, level) {
    return (
      <li
        key={key}
        className="section_blog__category_item"
        style={{ marginLeft: `${1 * level}rem` }}
        onClick={(e) => this.onCategoryClick(e, categoryObj)}
      >
        <i className={this.getCategoryClassName(categoryObj)}></i>
        {key}
      </li>
    );
  }
  renderCategories(categories, level) {
    const keys = Object.keys(categories);
    if (keys.length === 0) return null;
    //Iterate through our keys
    //Render each key obj
    //Render child key obj only this obj is clicked
    return (
      <React.Fragment>
        {keys.map((key) => {
          const obj = categories[key];
          if (key === "id" || key === "clicked") return null;
          return (
            <React.Fragment key={`frag${key}`}>
              {this.renderCategoryItem(obj, key, level)}
              {obj.clicked && this.renderCategories(obj, level + 1)}
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
  render() {
    const { categories } = this.state;
    return (
      <div className="section_blog__category_container">
        <h2 className="section_blog__category_text">Categories</h2>
        <ul>{this.renderCategories(categories, 1)}</ul>
      </div>
    );
  }
}

export default CategoryList;
