//import http from "./httpService";
//import config from "../config";

//const blogEndPoint = config.blogEndPoint;
//BUG - To call our backend
export const blogService = (function () {
  const blogs = new Map();
  //BUG - this should be set from somewhere and not hardcoded
  const maxRecentIds = 3;
  //The most recent id will be first in this list
  const recentBlogIds = [];
  //Tree like object structure containing categories and id key pairs
  //{subCat: [], id}
  //Portfolio Site: { Step1: { id },
  //                  Step2: { id } }
  const categoryList = {};
  //Categories
  const traverseCategories = (categoryPath, func) => {
    let curCategory = categoryList;
    let returnValue;
    categoryPath.forEach((item, i) => {
      //Do nothing once we get a return value
      if (returnValue) return;
      //If a sub category doesnt exist we must create it
      if (!curCategory[item]) curCategory[item] = {};
      //Traverse through our object
      let parentCategory = curCategory;
      curCategory = curCategory[item];

      returnValue = func(curCategory, parentCategory, item, i);
    });
    return returnValue;
  };
  const getCategories = () => {
    return categoryList;
  };
  const addCategory = (categoryString, id) => {
    const categoryPath = categoryString.split("/");
    return traverseCategories(categoryPath, (cur, parent, key, i) => {
      //Check for final element
      if (i === categoryPath.length - 1) {
        if (cur.id || cur.id === 0)
          return "Catergory already exists enter a different one.";
        cur.id = id;
        return null;
      }
    });
  };
  const removeCategory = (categoryString) => {
    const categoryPath = categoryString.split("/");
    traverseCategories(categoryPath, (item, parent, key, i) => {
      //At each step check and make sure our child only has one key before deleting
      //Make sure that clicked property doesnt count
      let numKeys = Object.keys(item).length;
      numKeys = item["clicked"] ? numKeys - 1 : numKeys;
      if (parent && numKeys <= 1) {
        delete parent[key];
      }
    });
  };

  //Recent Blogs
  const addRecentBlogId = (id) => {
    recentBlogIds.unshift(id);
    if (recentBlogIds.length > maxRecentIds) recentBlogIds.pop();
  };
  const getRecentBlogs = () => {
    return recentBlogIds.map((id) => getBlog(id));
  };

  //Blogs
  const addBlog = (content, category) => {
    const id = blogs.size;
    const error = addCategory(category, id);
    if (error) return error;
    addRecentBlogId(id);
    blogs.set(id, { content, id, category });
  };
  const getBlog = (id) => {
    return blogs.get(id);
  };
  const updateBlog = (id, content, category) => {
    const prevBlog = getBlog(id);
    //Check if categories are different, if so we must fix our category structure
    if (prevBlog.category !== category) {
      removeCategory(prevBlog.category);
      addCategory(category, id);
    }
    blogs.set(id, { content, id, category });
  };
  const deleteBlog = (id, category) => {
    removeCategory(category, id);
    blogs.delete(id);
  };
  return {
    addBlog,
    deleteBlog,
    getBlog,
    getRecentBlogs,
    getCategories,
    updateBlog,
  };
})();
