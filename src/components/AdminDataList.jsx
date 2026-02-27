export default function AdminDataList({ 
  dataList, 
  selectedRows, 
  onToggleSelect, 
  onToggleSelectAll, 
  sortKey, 
  sortDir, 
  onSort 
}) {
  const allSelected = dataList.length > 0 && selectedRows.length === dataList.length;

  return (
    <div className="bg-white rounded shadow overflow-x-auto">
      <table className="min-w-full text-left">
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="px-6 py-4 w-12 text-center">
              <input 
                type="checkbox" 
                checked={allSelected} 
                onChange={onToggleSelectAll}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
            </th>
            <th 
              className="px-6 py-4 cursor-pointer hover:bg-gray-200 transition select-none"
              onClick={() => onSort('seatNumber')}
            >
              座號 {sortKey === 'seatNumber' && (sortDir === 1 ? '▲' : '▼')}
            </th>
            <th className="px-6 py-4">攜帶食材</th>
            <th 
              className="px-6 py-4 cursor-pointer hover:bg-gray-200 transition select-none"
              onClick={() => onSort('updatedAt')}
            >
              更新時間 {sortKey === 'updatedAt' && (sortDir === 1 ? '▲' : '▼')}
            </th>
            <th className="px-6 py-4">最後編輯</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {dataList.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4 text-center">
                <input 
                  type="checkbox" 
                  checked={selectedRows.includes(item.id)}
                  onChange={() => onToggleSelect(item.id)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
              </td>
              <td className="px-6 py-4 font-medium text-gray-900">{item.seatNumber}</td>
              <td className="px-6 py-4 text-gray-700 whitespace-pre-wrap">{item.ingredients}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {item.updatedAt ? new Date(item.updatedAt.seconds * 1000).toLocaleString('zh-TW') : ''}
              </td>
              <td className="px-6 py-4 text-xs text-gray-400 font-mono">
                {item.updatedBy ? item.updatedBy.slice(0, 6) : 'N/A'}...
              </td>
            </tr>
          ))}
          {dataList.length === 0 && (
            <tr>
              <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                無資料
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
