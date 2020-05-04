import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-1-of-2">
          <p className="footer__copyright">
            Built by Rob Taylor Copyright &copy;
          </p>
        </div>
        <div className="col-1-of-2">
          <div className="footer__icons">
            <a
              href="https://www.linkedin.com/in/robtaylorSWE"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-3x footer__icons--black"></i>
            </a>
            <a
              href="https://github.com/rtaylor4444"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github fa-3x fa-3x footer__icons--black"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
