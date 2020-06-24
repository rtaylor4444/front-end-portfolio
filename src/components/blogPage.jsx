import React from "react";
import { Redirect, Link } from "react-router-dom";
import BlogItem from "./common/blogItem";
import CategoryList from "./common/categoryList";
import Comments from "./common/comments";
import { blogService } from "../services/blogService";
import { getCurrentUser } from "../services/authService";

const renderUpdateBlogButton = (id) => {
  const user = getCurrentUser();
  if (!user || !user.isAdmin) return null;

  return (
    <div className="u-center-text">
      <Link to={`/make-blog/${id}`} className="btn u-center-text">
        Edit Blog Post
      </Link>
    </div>
  );
};

const BlogPage = (props) => {
  const id = parseInt(props.match.params.id, 10);
  const blog = blogService.getBlog(id);
  if (!blog) return <Redirect to="/not-found" />;
  return (
    <section className="section_blog">
      <div className="blog-row">
        <div className="blog-col-3-of-4">
          {renderUpdateBlogButton(id)}
          <div key={blog.id} className="section_blog__blog_container">
            <BlogItem blog={blog.content} />
          </div>
          <Comments itemName={blog.content[0].data} />
        </div>
        <div className="blog-col-1-of-4">
          <CategoryList history={props.history} />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
