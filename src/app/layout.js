import SnackbarLayout from "./components/snackbarLayout";
import "./globals.css";

export const metadata = {
  title: "Savetown",
  description: "Save smarter, Buy Sooner with Savetown",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` antialiased`}>
        <SnackbarLayout>{children}</SnackbarLayout>
      </body>
    </html>
  );
}
