import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";

/**
 * SocketContext is a React context that is used to store the socket.io client instance.
 * It is used by the SocketProvider component to wrap components that need to use the
 * socket instance, and by the getSocket function to retrieve the socket instance from
 * child components.
 */
const SocketContext = createContext();

/**
 * getSocket is a function that retrieves the socket.io client instance from the SocketContext.
 * It should be used by child components to retrieve the socket instance.
 * @returns {Socket} The socket.io client instance
 */
const getSocket = () => useContext(SocketContext);

/**
 * SocketProvider is a React component that wraps other components that need to use the
 * socket.io client instance. It creates a SocketContext.Provider that provides the socket
 * instance to child components using the getSocket function.
 */
const SocketProvider = ({ children }) => {
  /**
   * The socket instance is created using the io function from socket.io-client.
   * The server URL is obtained from the config module, and the withCredentials option
   * is set to true to send credentials (e.g. the session cookie) with requests.
   */
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  /**
   * The SocketProvider component returns a SocketContext.Provider that provides the socket
   * instance to child components using the getSocket function.
   */
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };

