import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonTable = () => {
  return (
    <table className="w-full mt-4 bg-white rounded shadow font-Manrope relative">
      <thead className="sticky top-0 left-0">
        <tr className="text-left bg-gray-50">
          <th className="p-4 w-[5%] font-medium text-sm">
            <Skeleton width="60%" height={16} />
          </th>
          <th className="p-4 w-[25%] font-medium text-sm">
            <Skeleton width="80%" height={16} />
          </th>
          <th className="p-4 w-[20%] text-right font-medium text-sm">
            <Skeleton width="80%" height={16} />
          </th>
          <th className="p-4 w-[15%] text-right font-medium text-sm">
            <Skeleton width="70%" height={16} />
          </th>
          <th className="p-4 w-[20%] text-center font-medium text-sm">
            <Skeleton width="90%" height={16} />
          </th>
          <th className="p-4 w-[15%] text-center font-medium text-sm">
            <Skeleton width="90%" height={16} />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <tr key={index} className="border-t">
              <td className="p-4">
                <Skeleton width="60%" height={16} />
              </td>
              <td className="p-4">
                <Skeleton width="80%" height={16} />
              </td>
              <td className="p-4 text-right">
                <Skeleton width="80%" height={16} />
              </td>
              <td className="p-4 text-right">
                <Skeleton width="70%" height={16} />
              </td>
              <td className="p-4 text-center">
                <Skeleton width="90%" height={16} />
              </td>
              <td className="p-4 text-center">
                <Skeleton width="90%" height={16} />
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default SkeletonTable;
