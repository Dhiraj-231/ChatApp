/**
 * Constants for the different types of events that can be emitted by the server
 */
const ALERT = 'ALERT'; // Alert the user to a particular situation, e.g. a new message
const REFETCH_CHATS = "REFETCH_CHATS"; // The chats list needs to be updated
const NEW_ATTACHMENT = "NEW_ATTACHMENT"; // A new attachment has been uploaded and
// should be displayed in the chat
const NEW_MESSAGE_ALERT = "NEW_MESSAGE_ALERT"; // Alert the user to a new message
const NEW_FRIEND_REQUEST = "NEW_FRIEND_REQUEST"; // A new friend request has been made
const NEW_MESSAGE = "NEW_MESSAGE"; // A new message has been received

export { ALERT, REFETCH_CHATS, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, NEW_FRIEND_REQUEST, NEW_MESSAGE }
