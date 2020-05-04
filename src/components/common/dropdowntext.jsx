import React, { useState } from "react";

const renderDropIcon = (active, utilClass) => {
  if (!active) return <i className={"fa fa-sort-up " + utilClass}></i>;
  return <i className={"fa fa-sort-down " + utilClass}></i>;
};

const DropdownText = (props) => {
  const { title, active, text, commented } = props;
  const [isActive, setActive] = useState(active);

  //Variables based on if this text is styled as a comment or not
  const utilClass = commented ? "u-color-green" : " ";
  const className = "btn-text " + utilClass;
  const titleName = commented ? "//" + title : title;

  return (
    <div>
      <h2>
        <button onClick={() => setActive(!isActive)} className={className}>
          {titleName}
        </button>
        {renderDropIcon(isActive, utilClass)}
      </h2>
      {isActive && text}
    </div>
  );
};

export default DropdownText;
