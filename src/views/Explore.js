import React from "react";
import ClassDisplay from "../components/ClassDisplay";
import List from "@material-ui/core/List";

class Explore extends React.Component {
  render() {
    return (
      <List
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "344px",
          padding: "32px"
        }}
      >
        <ClassDisplay name="Class" />
        <ClassDisplay name="stuff" />
        <ClassDisplay name="stuff" />
      </List>
    );
  }
}

export default Explore;
