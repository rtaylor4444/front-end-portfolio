import React from "react";
import { Redirect, Link } from "react-router-dom";

const BlogItem = (props) => {
  const { blog, limit, isLink, blogID } = props;
  if (!blog) return <Redirect to="/not-found" />;
  let isTitleLink = isLink;
  let linkID = blogID;

  const renderBlogTitle = (title, id) => {
    if (isTitleLink)
      return (
        <h1 key={`title${id}`}>
          <Link
            className="section_blog__blog_content__h1"
            to={`/blog/${linkID}`}
          >
            {title}
          </Link>
        </h1>
      );

    return (
      <h1 className="section_blog__blog_content__h1" key={`title${id}`}>
        {title}
      </h1>
    );
  };
  const renderBlogHeader = (header, id) => {
    return (
      <h2 key={`heading${id}`} className="section_blog__blog_content__h2">
        {header}
      </h2>
    );
  };
  const renderBlogParagraph = (paragraph, id) => {
    return (
      <p key={`paragraph${id}`} className="section_blog__blog_content__p">
        {paragraph}
      </p>
    );
  };
  const renderBlogImage = (data, id) => {
    return (
      <img
        key={`image${id}`}
        src={`data:image/png;base64, ${data}`}
        alt="not found"
        className="section_blog__blog_content__image"
      />
    );
  };
  const renderBlogElement = (blogContent, id) => {
    const { contentType, data } = blogContent;
    switch (contentType) {
      case 0:
        return renderBlogTitle(data, id);
      //Heading
      case 1:
        return renderBlogHeader(data, id);
      //Paragraph
      case 2:
        return renderBlogParagraph(data, id);
      //Image
      case 3:
        return renderBlogImage(data, id);
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {blog.map((item, i) => {
        if (limit && i >= limit) return null;
        return renderBlogElement(item, item._id);
      })}
    </React.Fragment>
  );
};

export default BlogItem;
