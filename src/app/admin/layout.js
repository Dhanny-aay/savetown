import AdminNavBar from "./components/adminNavBar";
import Sidebar from "./components/sidebar";


export default function AdminLayout({ children }) {
  return (
    <div className="w-screen">
      <Sidebar />
      <div className="flex-1 bg-white">
        <AdminNavBar/>
      <main className="p-8 mb-16 mt-14 h-full md:mb-0 md:pt-[64px] max-sm:p-3 md:pl-[122px] w-full lg:absolute lg:pl-[20%]">
        {children}
      </main>
    </div>
    </div>
  );
}
