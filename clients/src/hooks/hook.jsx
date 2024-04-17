import { useEffect, useState } from "react";
import toast from "react-hot-toast";

/**
 * Custom React hook to handle errors
 * @param {array} errors Array of errors to handle
 */
export const useError = (errors = []) => {
  /**
   * React useEffect hook to handle errors on component mount
   */
  useEffect(() => {
    /**
     * Loop through each error in the errors array
     */
    errors.forEach(({ isError, error, fallback }) => {
      /**
       * Check if the error is set to true
       */
      if (isError) {
        /**
         * If there's a fallback function, call it
         */
        if (fallback) fallback();
        /**
         * Otherwise, show an error message using react-hot-toast
         */
        else toast.error(error?.data?.message || "Something Went Wrong...");
      }
    });
  }, [errors]);
};


/**
 * Custom React hook to handle async mutations
 * @param {function} mutationHook A mutation hook from Apollo Client
 *
 * @returns {array} Array containing the mutate function, isLoading state and the data returned by the mutation
 */
export const useAsyncMutation = (mutationHook) => {
  // isLoading state is used to indicate if the mutation is in progress
  const [isLoading, setIsLoading] = useState(false);

  // data is used to store the data returned by the mutation
  const [data, setData] = useState(null);

  // mutate is the mutation function from the Apollo Client
  const [mutate] = mutationHook();

  /**
   * executeMutation is the function that is called to execute the mutation
   * @param {string} toastMessage The message to show in the toast notification
   * @param {...any} args Arguments to pass to the mutation
   */
  const executeMutation = async (toastMessage, ...args) => {
    // Set isLoading to true before the mutation is executed
    setIsLoading(true);

    // Show a loading message in the toast notification
    const toastId = toast.loading(toastMessage || "Updating data...");

    try {
      // Execute the mutation
      const res = await mutate(...args);

      // If the mutation was successful, show a success toast notification
      if (res.data) {
        toast.success(res?.data?.message || "Updated data successfully.", {
          id: toastId,
        });

        // Set the data to the data returned by the mutation
        setData(res.data);
      } else {
        // If the mutation failed, show an error toast notification
        toast.error(res?.error?.data?.message || "Something Went Wrong.", {
          id: toastId,
        });
      }
    } catch (error) {
      console.log(error);
      // If there's an error, show an error toast notification
      toast.error(error?.message || "Something Went Wrong..", { id: toastId });
    } finally {
      // Set isLoading to false once the mutation is executed
      setIsLoading(false);
    }
  };

  // Return the executeMutation function, isLoading state and the data
  return [executeMutation, isLoading, data];
};

/**
 * Custom React hook to handle socket events
 * @param {object} socket The socket.io client instance
 * @param {object} handlers Event handlers to register for specific socket events
 */
export const useSocketEvents = (socket, handlers) => {
  /**
   * React useEffect hook to register socket event handlers on mount
   * and deregister them on unmount
   */
  useEffect(() => {
    // Iterate over the event handlers and register them for each event
    Object.entries(handlers).forEach(([event, handler]) => {
      socket.on(event, handler);
    });

    // Function to deregister event handlers on unmount
    return () => {
      // Iterate over the event handlers and deregister them for each event
      Object.entries(handlers).forEach(([event, handler]) => {
        socket.off(event, handler);
      });
    };
  }, [socket, handlers]); // Only re-run the effect if socket or handlers change
};
