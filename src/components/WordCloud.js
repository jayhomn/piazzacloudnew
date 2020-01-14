import React from "react";
import Button from "@material-ui/core/Button";

class WordCloud extends React.Component {
  tempWords = ["dsads", "dsadsa", "dsadsadas", "sdadsa"];

  render() {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)"
        }}
      >
        {this.tempWords.map(err => (
          <Button component="span">{err}</Button>
        ))}
      </div>
    );
  }
}

export default WordCloud;
