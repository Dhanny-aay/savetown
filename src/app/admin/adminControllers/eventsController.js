import api from "../index/api";

export const showAvailableAttendees = async (onError) => {
    try {
      // Call the API function
      const response = await api("GET", '/dinner-attendees');
      return(response);
    } catch (error) {
        //   console.log('i am response', response)
      if (onError) {
        onError(error);
      }
    }
  };

  export const showAvailableDates = async (onError) => {
    try {
      // Call the API function
      const response = await api("GET", '/dinner-available-dates');
      return(response);
    } catch (error) {
        //   console.log('i am response', response)
      if (onError) {
        onError(error);
      }
    }
  };

  export const showAvailableDays = async ( day, onSuccess, onError) => {
    try {
        const response = await api("POST", "/dinner-available-dates", day);
        onSuccess(response);
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
  };