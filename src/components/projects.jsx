import React from "react";

import { getProjects, renderProjectItem } from "../services/fakeProjectService";

const Projects = (props) => {
  const projects = getProjects();
  return (
    <React.Fragment>
      <h1 className="u-center-text">Projects</h1>
      <div className="row">
        <div className="col-1-of-2">
          {projects.map((p) => p._id % 2 === 0 && renderProjectItem(p._id))}
        </div>
        <div className="col-1-of-2">
          {projects.map((p) => p._id % 2 !== 0 && renderProjectItem(p._id))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Projects;
