import React from "react";
import { Redirect } from "react-router-dom";
import { getProject } from "../services/fakeProjectService";

const ProjectPage = (props) => {
  const id = props.match.params.id;
  const project = getProject(id);
  if (!project) return <Redirect to="/not-found" />;
  return (
    <React.Fragment>
      <h1>{project.title}</h1>
      <h1>{"{"}</h1>
      <div className="project_page">{project.content && project.content()}</div>
      <h1>{"}"}</h1>
    </React.Fragment>
  );
};

export default ProjectPage;
