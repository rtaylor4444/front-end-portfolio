import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import NavBar from "./components/navbar";
import Home from "./components/home";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ContactForm from "./components/contactForm";
import Logout from "./components/logout";
import Blog from "./components/blog";
import Projects from "./components/projects";
import ProjectPage from "./components/projectPage";
import Footer from "./components/footer";

function App() {
  return (
    <div className="u-background-gray">
      <NavBar />
      <Switch>
        <Route path="/projects/:id" component={ProjectPage} />
        <Route path="/projects" component={Projects} />
        <Route path="/blog" component={Blog} />
        <Route path="/contact" component={ContactForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/logout" component={Logout} />
        <Route path="/not-found" component={NotFound} />
        <Route exact path="/" component={Home} />
        <Redirect to="/not-found" />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;