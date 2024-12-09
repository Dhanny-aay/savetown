import Headbar from "./component/headbar";
import Sidebar from "./component/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="">
      <Sidebar />
      <Headbar />
      <main className=" absolute md:left-20 lg:left-[20%] top-[72px] w-full md:w-[calc(100%-5rem)] lg:w-[80%] px-6 pt-6 pb-20 md:pb-6 ">
        {children}
      </main>
    </div>
  );
}
