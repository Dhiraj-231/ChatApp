import React from "react";
import { Navigate, Outlet } from "react-router-dom";
/**
 * ProtectRoute is a component that checks if the user is logged in,
 * and if not, redirects the user to the login page.
 *
 * If children prop is passed, it renders those children, otherwise
 * renders the Outlet component from react-router-dom.
 *
 * @param {object} props Component props
 * @param {React.ReactNode} props.children Children to render
 * @param {boolean} props.user User prop from the context
 * @param {string} [props.redirect="/login"] Redirect URL if user is not logged in
 * @returns {JSX.Element} Rendered component
 */
const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  /**
   * If the user is not logged in, redirect to the login page.
   * Otherwise, render the children if passed or the Outlet component.
   */
  return user ? children ? children : <Outlet /> : <Navigate to={redirect} />;
};

export default ProtectRoute;
