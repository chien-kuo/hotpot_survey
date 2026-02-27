export default function AdminPanel({ 
  userEmail, 
  onExportCSV, 
  onExportPDF, 
  onClearData, 
  onDeleteSelected, 
  selectedCount, 
  dataCount 
}) {
  return (
    <div className="bg-white border-l-4 border-yellow-500 rounded shadow p-4 flex flex-wrap justify-between items-center gap-4 animate-fade-in">
      <h2 className="font-bold text-gray-800">
        <i className="fas fa-tools mr-2"></i>後台操作 ({userEmail})
      </h2>
      <div className="flex gap-3">
        <button
          onClick={onExportCSV}
          disabled={dataCount === 0}
          title="匯出 CSV"
          aria-label="匯出 CSV"
          className="bg-amber-600 text-white w-11 h-10 flex items-center justify-center rounded hover:bg-amber-700 disabled:opacity-50 shadow transition"
        >
          <i className="fas fa-file-csv"></i>
        </button>

        <button
          onClick={onExportPDF}
          disabled={dataCount === 0}
          title="匯出 PDF"
          aria-label="匯出 PDF"
          className="bg-amber-600 text-white w-11 h-10 flex items-center justify-center rounded hover:bg-amber-700 disabled:opacity-50 shadow transition"
        >
          <i className="fas fa-file-pdf"></i>
        </button>

        <button
          onClick={onClearData}
          disabled={dataCount === 0}
          title="清空資料庫"
          aria-label="清空資料庫"
          className="bg-red-600 text-white w-11 h-10 flex items-center justify-center rounded hover:bg-red-700 disabled:opacity-50 shadow transition"
        >
          <i className="fas fa-trash-alt"></i>
        </button>

        <button
          onClick={onDeleteSelected}
          disabled={selectedCount === 0}
          title="刪除所選"
          aria-label="刪除所選"
          className="bg-red-500 text-white px-3 h-10 flex items-center justify-center rounded hover:bg-red-600 disabled:opacity-50 shadow transition"
        >
          <i className="fas fa-trash mr-2"></i>
          <span>刪除 ({selectedCount})</span>
        </button>
      </div>
    </div>
  );
}
