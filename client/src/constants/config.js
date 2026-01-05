// API_NOTIFICATION_MESSAGES 
// This object stores all API related messages in one place
// It helps in showing loading, success, and error messages in the UI
export const API_NOTIFICATION_MESSAGES = {

    // Shown when an API call is in progress
    loading: {
        title: 'Loading...', // Title for loader
        message: 'Data is being loaded, please wait' // Message shown to user
    }, 

    // Shown when API call is successful
    success: {
        title: 'Success', // Success title
        message: 'Data successfully loaded' // Success message
    },

    // Shown when backend responds with an error
    responseFailure: {
        title: 'Error', // Error title
        message: 'An error occurred while fetching response from the server. Please try again'
    },

    // Shown when request is sent but no response is received
    requestFailure: {
        title: 'Error', // Error title
        message: 'An error occurred while parsing request data'
    },

    // Shown when there is a network or internet issue
    networkError: {
        title: 'Error', // Error title
        message: 'Unable to connect with the server. Please check your internet connection and try again later'
    }
};



//API Service Call
// SAMple request
export const SERVICE_URLS = {
    userSignup: { url: '/signup', method: 'POST' },
    userLogin: {url: '/login', method: 'POST'}
}