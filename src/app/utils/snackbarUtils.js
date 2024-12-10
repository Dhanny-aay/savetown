import { useSnackbar } from "notistack";

// notificationHelper.js
let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

const SnackbarUtils = {
  success(msg) {
    this.toast(msg, "success");
  },
  error(msg) {
    this.toast(msg, "error");
  },
  info(msg) {
    this.toast(msg, "info");
  },
  warning(msg) {
    this.toast(msg, "warning");
  },
  toast(msg, variant = "default") {
    useSnackbarRef.enqueueSnackbar(msg, { variant });
  },
};

export default SnackbarUtils;
