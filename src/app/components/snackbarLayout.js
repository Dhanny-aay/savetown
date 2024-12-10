"use client";

import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "../utils/snackbarUtils";

export default function SnackbarLayout({ children }) {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <SnackbarUtilsConfigurator />
      {children}
    </SnackbarProvider>
  );
}
