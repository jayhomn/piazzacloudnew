import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";

class ClassDisplay extends React.Component {
  render() {
    return (
      <CardActionArea>
        <Card
          style={{
            padding: "32px"
          }}
        >
          <Typography>{this.props.name}</Typography>
        </Card>
      </CardActionArea>
    );
  }
}

export default ClassDisplay;
