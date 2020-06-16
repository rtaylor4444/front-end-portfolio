import React from "react";
import { renderProjectItem } from "../services/fakeProjectService";

const Home = (props) => {
  const recentProjects = [0, 2, 3];
  return (
    <React.Fragment>
      <section className="section_header">
        <h1 className="section_header__text_box">
          <span className="section_header__text_name">Rob Taylor</span>
          <span className="section_header__text_slogan">
            Coding is my passion
          </span>
        </h1>
      </section>

      <section className="section_experience">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary">Wide range of skills</h2>
        </div>
        <p className="paragraph">
          Rob Taylor started off as a gamer but has always had a passion for
          creating and building. Ever since his humble beginnings making games
          using RPG Maker VX he gained an interest in programming. This interest
          sparked Rob to pursue a Bachelors Degree in Game Development at Full
          Sail University. Thanks to his ability to pick up new skills and
          concepts quickly he make it through the accelerated program. This
          ability allowed him to learn Web Development and eventually Full-Stack
          Development to meet his professional needs.
        </p>

        <div className="row">
          <div className="col-1-of-2">
            <h3 className="heading-tertiary u-margin-bottom-small">
              Game Development expertise
            </h3>
            <p className="section_experience__paragraph">
              Game Design, Development, Data Structures, Algorithms, Unity, C++
              and C# programming skills.
            </p>

            <h3 className="heading-tertiary u-margin-bottom-small">
              Full-Stack Development expertise
            </h3>
            <p className="section_experience__paragraph">
              HTML, CSS, SASS, JavaScript, React.js, Node.js, REST APIs and
              MongoDB experience.
            </p>
          </div>
          <div className="col-1-of-2">
            <img
              src="/images/resume.png"
              className="section_experience__resume"
              alt=""
            ></img>
          </div>
        </div>
        <div className="u-center-text">
          <a href="/rob-taylor-resume-web.docx" download className="btn">
            Download Resume
          </a>
        </div>
      </section>

      <section className="section_projects">
        <div className="section_projects__content">
          <h2 className="heading-secondary heading-secondary--black">
            Show don't Tell
          </h2>
          <p>Check out my projects!</p>
          <div className="row">
            {recentProjects.map((p) => (
              <div key={p} className="col-1-of-3">
                {renderProjectItem(p)}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section_learning">
        <div className="u-center-text u-margin-bottom-big">
          <h2 className="heading-secondary">What I'm learning</h2>
          <p>If you're not constantly learning you are falling behind</p>
          <div className="study_item">
            <a
              href="https://www.udemy.com/course/advanced-css-and-sass/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="study_item__content">
                <img
                  src="images/Udemy_logo.png"
                  alt="Udemy"
                  className="study_item__content__image"
                />
                <h3 className="study_item__content__heading">
                  Udemy: Advanced CSS and SASS
                </h3>
                <p className="study_item__content__paragraph">
                  The most advanced and modern CSS course on the internet: Learn
                  complex CSS animations, advanced responsive design techniques,
                  flexbox layouts, Sass, CSS architecture, fundamental CSS
                  concepts, and so much more.
                </p>
                <p>Created by: Jonas Schmedtmann</p>
              </div>
            </a>
          </div>
          <div className="study_item">
            <a
              href="https://leetcode.com/rtaylor4444/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="study_item__content">
                <img
                  src="images/LeetCode_logo.png"
                  alt="Leetcode"
                  className="study_item__content__image"
                />
                <h3 className="study_item__content__heading">LeetCode</h3>
                <p className="study_item__content__paragraph">
                  Level up your coding skills and quickly land a job. This is
                  the best place to expand your knowledge and get prepared for
                  your next interview. Users of this site have received offers
                  from top companies such as Google, Facebook, Amazon and
                  Microsoft.
                </p>
              </div>
            </a>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
