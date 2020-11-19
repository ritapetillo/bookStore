import React from 'react'
import { Alert} from "react-bootstrap";

function AlertBook({text, variant,show}) {
    return (
      <Alert variant={variant} show={show}>
       {text}
      </Alert>
    );
}

export default AlertBook
