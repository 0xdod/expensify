import React from "react";

function Action(props) {
  return (
    <div>
      <button className="big-button" onClick={props.handleRandomPick} disabled={!props.hasOptions}>
        What do you want to do today?
      </button>
    </div>
  );
}

export default Action;
