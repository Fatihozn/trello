import React from "react";
import "./style.css";
export default function Cards(props) {
  return <div id={props.id}>{props.children}</div>;
}
