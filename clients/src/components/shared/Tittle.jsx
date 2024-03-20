import React from "react";
import { Helmet } from "react-helmet-async";
const Title = ({
  title = "ChatApp",
  description = "This is the chat App called ChatApp",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
