import React from "react";
import { Redirect, Link } from "react-router-dom";

let isTitleLink, linkID;
const renderBlogTitle = (title, id) => {
  if (isTitleLink)
    return (
      <h1 key={`title${id}`}>
        <Link className="section_blog__blog_content__h1" to={`/blog/${linkID}`}>
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
      src={data[1]}
      alt="not found"
      className="section_blog__blog_content__image"
    />
  );
};
const renderBlogElement = (blogContent, id) => {
  const { type, data } = blogContent;
  switch (type) {
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

const BlogItem = (props) => {
  const { blog, limit, isLink, blogID } = props;
  if (!blog) return <Redirect to="/not-found" />;
  isTitleLink = isLink;
  linkID = blogID;

  return (
    <React.Fragment>
      {blog.map((item, i) => {
        if (limit && i >= limit) return null;
        return renderBlogElement(item, i);
      })}
    </React.Fragment>
  );
};

export default BlogItem;
