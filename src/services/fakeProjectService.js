import React from "react";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
import Unity, { UnityContent } from "react-unity-webgl";
import DropdownText from "./../components/common/dropdowntext";

const projects = [
  {
    _id: 0,
    title: "Petri Dish",
    genre: "Arcade Game",
    lang: "C#",
    content: () => {
      return (
        <React.Fragment>
          <DropdownText
            title="About"
            active={true}
            text={
              <p className="project_page__paragraph">
                You are bacteria vying for domination and control of your Petri
                Dish. You must strategically move across the dish to contimate
                it with you bacterial DNA and exterminate your three opponents.
                There are a series of power-ups that can be activated, and with
                a skillful combination of directional movements, you can earn
                points faster before the time runs out and spell certain doom
                for the other germs.
              </p>
            }
          />
          <img
            src="/images/Petri Dish.png"
            alt="not found"
            className="project_page__image"
          />
          <div className="u-center-text">
            <a href="/games/Petri Dish.zip" download className="btn">
              Download
            </a>
          </div>
          <DropdownText
            title="Personal Notes"
            active={false}
            commented={true}
            text={
              <p className="project_page__paragraph project_page__paragraph--green">
                {"/* "}This was my first true game development experience and it
                was quite a good one. This is my first time working with a team
                in order to develop a game, the time constraint of 3 days
                actually made it creative and fun. (although many hours of sleep
                were lost beacuse of it) I programmed the animations but I was
                fairly new to coding at the time, so that might be why they
                aren't fluid. {" */"}
              </p>
            }
          />
        </React.Fragment>
      );
    },
  },
  {
    _id: 1,
    title: "Yaotl Coatl Racers",
    genre: "Racing Game",
    lang: "Unity C#",
    content: () => {
      return (
        <React.Fragment>
          <DropdownText
            title="About"
            active={true}
            text={
              <p className="project_page__paragraph">
                Players struggle to amass power and navigate the twists and
                turns of the jungle race-track to arrive at the Sun God’s temple
                as quickly as possible. The speed and pace of the game are
                geared toward quality navigation around the track and
                simultaneous Coatl (Serpent) v. Coatl ‘Dogfighting’. Coatl that
                lead the pack should focus on staying in the lead and avoiding
                being bitten, while Coatl that trail should focus on biting the
                tails of the leaders to increase their power and eventually
                overtake them in the race to the checkpoints.
              </p>
            }
          />
          <img
            src="/images/Yaotl_Coatl_Racing.png"
            alt="not found"
            className="project_page__image"
          />
          <div className="u-center-text">
            <a href="/games/Yaotl Coatl Racers_0.zip" download className="btn">
              Download
            </a>
          </div>
          <DropdownText
            title="Personal Notes"
            active={false}
            commented={true}
            text={
              <p className="project_page__paragraph project_page__paragraph--green">
                {"/* "}
                This was a difficult project to complete especially under the
                time constraint of 3 days; I learned first hand the meaning of
                too many hands in the pot. Due to so many people contributing to
                the project it was difficult to maintain the codebase and it
                created many bugs that needed to be squished. I'm actually
                impressed we managed to finish the game on time; an achievement
                indeed.
                {" */"}
              </p>
            }
          />
        </React.Fragment>
      );
    },
  },
  {
    _id: 2,
    title: "Labrynthium",
    genre: "Puzzle Game",
    lang: "C++, C# for tools",
    content: () => {
      return (
        <React.Fragment>
          <DropdownText
            title="About"
            active={true}
            text={
              <p className="project_page__paragraph">
                This is a game project that was created at Full Sail University
                for the Structure of Game Programming course. You are an
                explorer and you have stumbled upon a dungeon containing
                mysterious golems. You must use your wit to solve the puzzles
                that await you in order to harness thier energy and unlock the
                secret behind these golems.
              </p>
            }
          />
          <YouTube videoId="lbI3hLo0WOY" className="project_page__image" />
          <DropdownText
            title="Personal Notes"
            active={false}
            commented={true}
            text={
              <p className="project_page__paragraph project_page__paragraph--green">
                {"/*"}This is a class project that I enjoyed working on with two
                other classmates, my personal favorite. We meshed very well as a
                team since we had the same interests in anime and games. With
                this team collaboration we were able to overcome the Wheel of
                Misfortune; which is a literal Wheel you would spin and possibly
                land on things like team swap, having your game in multiple
                languages, or even having to turn in your game early. It's
                unfortunate that I lost the main game files.{"*/"}
              </p>
            }
          />
        </React.Fragment>
      );
    },
  },
  {
    _id: 3,
    title: "Racing Core",
    genre: "Racing Game",
    lang: "Unity C#",
    content: () => {
      return (
        <React.Fragment>
          <DropdownText
            title="About"
            active={true}
            text={
              <p className="project_page__paragraph">
                This is a simple racing sample that I made on my own using
                Unity, in order to keep my game development skills sharp. It
                features AI and physics both of which were coded from scratch to
                demonstrate my abilities. I managed to complete this within two
                weeks. (Being fairly busy with work and other personal matters I
                dont have much time for game development anymore)
              </p>
            }
          />
          <p>
            P.S: Please be patient and give the demo some time to load, thanks!
          </p>
          <Unity
            unityContent={
              new UnityContent(
                "/games/Racing Core/WebGL.json",
                "/games/Racing Core/UnityLoader.js"
              )
            }
          />
          <DropdownText
            title="Personal Notes"
            active={false}
            commented={true}
            text={
              <p className="project_page__paragraph project_page__paragraph--green">
                {"/* "}It was fun coding both the AI and the physics for this
                which are my favorite areas of game development. I did have to
                do some research in order to get the formulas for the car
                acceleration, deceleration and brakes but I managed to get it
                done. I love programming movement and behaviors which is
                probably why I glean toward racing games so much. {" */"}
              </p>
            }
          />
        </React.Fragment>
      );
    },
  },
];

export function getProjects() {
  return projects;
}

export function getProject(id) {
  //return projects.find(m => m._id === id);
  return projects[id];
}

export function deleteProject(id) {
  let movieInDb = projects.find((m) => m._id === id);
  projects.splice(projects.indexOf(movieInDb), 1);
  return movieInDb;
}

export function renderProjectItem(id) {
  const project = getProject(id);
  return (
    <div key={id} className="project_item">
      <div
        className={
          "project_item__content project_item__content--" + project._id
        }
      >
        <div
          className={
            "project_item__content__header project_item__content__header--" +
            project._id
          }
        >
          {project.title}
        </div>
        <div className="project_item__content__text">{project.genre}</div>
        <div className="project_item__content__text">
          Made With: {project.lang}
        </div>
        <Link to={`/projects/${project._id}`}>
          <button className="btn">View</button>
        </Link>
      </div>
    </div>
  );
}
