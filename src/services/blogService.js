import http from "./httpService";
import config from "../config";

export const blogService = (function () {
  const blogs = new Map();
  const maxRecentIds = config.maxRecentBlogsDisplayed;
  //The most recent id will be first in this list
  const recentBlogIds = [];
  //Tree like object structure containing categories and id key pairs
  const categoryList = {};

  //Categories
  const traverseCategories = (categoryPath, func) => {
    let curCategory = categoryList;
    categoryPath.forEach((item, i) => {
      //If a sub category doesnt exist we must create it
      if (!curCategory[item]) curCategory[item] = {};
      //Traverse through our object
      let parentCategory = curCategory;
      curCategory = curCategory[item];

      func(curCategory, parentCategory, item, i);
    });
  };
  const getCategories = () => {
    return categoryList;
  };
  const addCategory = (categoryString, id) => {
    const categoryPath = categoryString.split("/");
    traverseCategories(categoryPath, (cur, parent, key, i) => {
      //Check for final element
      if (i === categoryPath.length - 1) {
        cur.id = id;
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
  const setRecentBlogIDs = (id) => {
    if (recentBlogIds.length < maxRecentIds) recentBlogIds.push(id);
  };
  const loadAllRecentBlogs = async () => {
    //If we have no recent blogs lets call our server
    if (recentBlogIds.length === 0) {
      try {
        const res = await http.get(config.blogEndPoint);
        res.data.forEach((item) => {
          setRecentBlogIDs(item._id);
          addCategory(item.category, item._id);
          blogs.set(item._id, item);
        });
      } catch (error) {
        return error;
      }
    }
  };
  const getRecentBlogs = async () => {
    const errors = await loadAllRecentBlogs();
    if (errors) return { errors, recentBlogs: [] };
    const recentBlogs = recentBlogIds.map((id) => blogs.get(id));
    return { recentBlogs };
  };

  //Blogs
  const addBlog = async (content, category) => {
    try {
      //Load all of our blogs if they werent loaded already
      await loadAllRecentBlogs();
      //Add our new blog to the server
      const res = await http.post(config.blogEndPoint, {
        content,
        category,
      });
      const id = res.data._id;
      addRecentBlogId(id);
      addCategory(category, id);
      blogs.set(id, res.data);
    } catch (error) {
      console.log(error);
      return error;
    }
  };
  const getBlog = async (id) => {
    //I have to get all of the blogs at the start so categories can be loaded
    const error = await loadAllRecentBlogs();
    if (error) return null;
    //Once loaded all blog successfully there is no need to
    //call the server to get an individual blog
    let blog = blogs.get(id);
    return blog;
  };
  const updateBlog = async (id, content, category) => {
    const prevBlog = await getBlog(id);
    try {
      const res = await http.put(`${config.blogEndPoint}/${id}`, {
        content,
        category,
      });
      const blog = res.data;
      //Check if categories are different, if so we must fix our category structure
      if (prevBlog.category !== blog.category) {
        removeCategory(prevBlog.category);
        addCategory(category, id);
      }
      blogs.set(blog._id, blog);
    } catch (error) {
      return error;
    }
  };
  return {
    addBlog,
    getBlog,
    getRecentBlogs,
    getCategories,
    updateBlog,
  };
})();
