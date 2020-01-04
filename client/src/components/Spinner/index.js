//Library imports
import React from "react";

//Image imports
import spinner from "../../img/spinner.gif";

const Spinner = () => (
  <>
    <img 
      src={spinner} 
      style={{width: "200px", margin: "auto", display: "block"}}
      alt="Loading..."/>
  </>
);

export default Spinner;