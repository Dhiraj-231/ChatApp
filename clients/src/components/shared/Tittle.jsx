import React from "react";
import { Helmet } from "react-helmet-async";
/**
 * Title component
 *
 * @component
 *
 * @param {object} props Props
 * @param {string} [props.title='ChatApp'] Title
 * @param {string} [props.description='This is the chat App called ChatApp'] Description
 *
 * @returns {React.ReactElement}
 */
const Title = ({
  title = "ChatApp",
  description = "This is the chat App called ChatApp",
}) => {
  return (
    <Helmet>
      {/* Sets page title */}
      <title>{title}</title>

      {/* Sets page meta description */}
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Title;
