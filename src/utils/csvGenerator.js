export const generateCSV = (dataList) => {
  const headers = ["座號,攜帶食材,最後更新時間"];
  const rows = dataList.map(row => {
      const time = row.updatedAt ? new Date(row.updatedAt.seconds * 1000).toLocaleString('zh-TW') : '';
      const safeIngredients = `"${(row.ingredients || '').replace(/"/g, '""')}"`;
      return `${row.seatNumber},${safeIngredients},${time}`;
  });
  const csvContent = "\uFEFF" + [headers, ...rows].join(String.fromCharCode(10)); 
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ingredients_export_${new Date().getTime()}.csv`;
  link.click();
};
