import Headbar from "./component/headbar";
import Sidebar from "./component/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="">
      <Sidebar />
      <Headbar />
      <main className=" absolute lg:left-[20%] top-[72px] w-full lg:w-[80%] p-6 ">
        {children}
      </main>
    </div>
  );
}
