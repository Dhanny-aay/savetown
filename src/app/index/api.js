import SnackbarUtils from "../utils/snackbarUtils";
import config from "../config";

const api = async (method, uri, body = null) => {
  const url = config.baseURL + uri;
  const token = localStorage.getItem("savetown_token");

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  try {
    const response = await fetch(url, options);
    const res = await response.json();

    if (response.ok) {
      // Handle access token if present
      if (res.access_token) {
        localStorage.setItem("savetown_token", res.access_token);
      }

      // Display success message if present
      if (res.data && res.data.message) {
        SnackbarUtils.success(res.data.message);
      } else if (res.message) {
        SnackbarUtils.success(res.message);
      }

      return res;
    } else {
      // Handle 401 Unauthorized status
      if (response.status === 401) {
        localStorage.removeItem("savetown_token");

        // Check if the current page is already the sign-in page
        if (window.location.pathname === "/sign-in") {
          SnackbarUtils.error("Please check your account details.");
        } else {
          SnackbarUtils.error("Session expired. Redirecting to sign-in...");
          window.location = "/sign-in";
        }
        return; // Stop further execution
      }
      // Handle other status codes
      if (response.status === 403) {
        // localStorage.removeItem("savetown_token");
        // window.location = "/sign-in";
        SnackbarUtils.error(
          res?.data?.error ? res.data.error : "Something went wrong"
        );
      } else if (response.status === 409) {
        SnackbarUtils.error(
          res?.data?.error ? res.data.error : "Something went wrong"
        );
        throw new Error(
          res?.data?.message ? res.data.message : "Something went wrong"
        );
      } else if (response.status === 422) {
        SnackbarUtils.error(
          res?.message ? res.message : "Something went wrong"
        );
        throw new Error(res?.message ? res.message : "Something went wrong");
      } else {
        SnackbarUtils.error(
          res?.data.error ? res.data.error : response.statusText
        );
        throw new Error(res?.data.error ? res.data.error : response.statusText);
      }
    }
  } catch (err) {
    SnackbarUtils.error("Fetch error: " + err.message);
    throw err;
  }
};

export default api;