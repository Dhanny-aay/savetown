import AdminNavBar from "./components/adminNavBar";
import Sidebar from "./components/sidebar";


export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-white">
        <AdminNavBar/>
      <main className="p-8 mt-16 h-full md:pt-[56px] md:pl-[122px] w-full lg:absolute lg:pl-[20%]">
        {children}
      </main>
    </div>
    </div>
  );
}
