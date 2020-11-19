import React from 'react'
import { Badge } from "react-bootstrap";


function MyBadge({ category }) {
    
    let color;
    switch (category) {
      case "fantasy":
        color = "primary";
        break;
      case "horror":
        color = "secondary";
        break;
      case "scifi":
        color = "success";
        break;
      case "romance":
        color = "danger";
        break;
      case "history":
        color = "info";
        break;
    }

    return (
        <Badge variant={color} className="mt-1">
        {category}
      </Badge>
    );
}

export default MyBadge
