import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogItem from "./common/blogItem";
import CategoryList from "./common/categoryList";
import Comments from "./common/comments";
import { blogService } from "../services/blogService";
import { getCurrentUser } from "../services/authService";

const BlogPage = (props) => {
  const id = props.match.params.id;
  const [curBlog, setBlog] = useState(undefined);

  useEffect(() => {
    async function getBlog() {
      const blog = await blogService.getBlog(id);
      if (!blog) props.history.push("/not-found");
      setBlog(blog);
    }
    getBlog();
  }, [id, props, setBlog]);

  const renderUpdateBlogButton = () => {
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
  const renderBlogContent = () => {
    return (
      <React.Fragment>
        <div key={id} className="section_blog__blog_container">
          <BlogItem blog={curBlog.content} />
        </div>
        <Comments itemName={id} />
      </React.Fragment>
    );
  };
  return (
    <section className="section_blog">
      <div className="blog-row">
        <div className="blog-col-3-of-4">
          {renderUpdateBlogButton()}
          {curBlog ? renderBlogContent() : <h1>Loading..</h1>}
        </div>
        <div className="blog-col-1-of-4">
          <CategoryList history={props.history} />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
