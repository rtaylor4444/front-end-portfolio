import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/navbar";
import Home from "./components/home";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ConfirmForm from "./components/confirmForm";
import ContactForm from "./components/contactForm";
import PasswordResetForm from "./components/passResetForm";
import PasswordRecoverForm from "./components/passRecoverForm";
import BlogHome from "./components/blogHome";
import BlogForm from "./components/blogForm";
import BlogPage from "./components/blogPage";
import Projects from "./components/projects";
import ProjectPage from "./components/projectPage";
import Footer from "./components/footer";
import RacingCoreGame from "./components/racingCoreGame";

function App() {
  return (
    <div className="u-background-gray">
      <NavBar />
      <Switch>
        <Route path="/racing_core_game" component={RacingCoreGame} />
        <Route path="/projects/:id" component={ProjectPage} />
        <Route path="/projects" component={Projects} />
        <Route path="/make-blog/:id" component={BlogForm} />
        <Route path="/blog/:id" component={BlogPage} />
        <Route path="/blog" component={BlogHome} />
        <Route path="/contact" component={ContactForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/confirm" component={ConfirmForm} />
        <Route path="/recover" component={PasswordRecoverForm} />
        <Route path="/reset" component={PasswordResetForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/not-found" component={NotFound} />
        <Route exact path="/" component={Home} />
        <Redirect to="/not-found" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
