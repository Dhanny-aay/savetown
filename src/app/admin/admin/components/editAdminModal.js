export default function EditAdminModal() {
    return(
        <div
        className="fixed inset-0 z-[999] bg-black bg-opacity-50 flex justify-center items-center"
        onClick={() => setShowModal(false)}
      >
        <div
          className="bg-white rounded-2xl p-6 w-[600px] space-y-5 font-Manrope"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-lg font-bold font-Manrope">Add New Admin</h2>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Admin Name
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={newAdmin.name}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Email Address"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-[32px]"
            />
          </div>
          <div className="flex justify-between items-center w-full space-x-2">
            <button
              onClick={() => setShowModal(false)}
              className="px-3 py-[18px] w-1/2 border bg-white border-gray-300 rounded-[32px]"
            >
              Cancel
            </button>
            <button
              onClick={handleAddAdmin}
              className="px-3 py-[18px] w-1/2 bg-[#ED1450] text-white rounded-[32px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )
}