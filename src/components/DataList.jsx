import { useMemo } from 'react';
import { useSurveyStore } from '../store/surveyStore';

export default function DataList() {
  const { dataList, loading, error } = useSurveyStore();

  const displayList = useMemo(() => {
    const arr = [...dataList];
    arr.sort((a, b) => {
        const aTime = a.updatedAt ? (a.updatedAt.seconds ?? a.updatedAt) : 0;
        const bTime = b.updatedAt ? (b.updatedAt.seconds ?? b.updatedAt) : 0;
        if (bTime === aTime) return parseInt(a.seatNumber) - parseInt(b.seatNumber);
        return bTime - aTime;
    });
    return arr;
  }, [dataList]);

  if (loading) return (
    <div className="text-center py-10">
      <i className="fas fa-spinner fa-spin fa-3x text-amber-500"></i>
      <p className="mt-2 text-gray-500">載入中...</p>
    </div>
  );
  
  if (error) return (
    <div className="text-center text-red-500 py-10">
      Error: {error}
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-2">大家帶了什麼？</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {displayList.map(item => (
          <div key={item.id} className="bg-white rounded shadow p-4 border-l-4 border-amber-500 hover:shadow-lg transition">
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-lg text-amber-800 bg-amber-100 px-2 py-1 rounded">
                {item.seatNumber} 號
              </span>
              <span className="text-xs text-gray-400">
                {item.updatedAt ? new Date(item.updatedAt.seconds * 1000).toLocaleString('zh-TW') : ''}
              </span>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{item.ingredients}</p>
          </div>
        ))}
        {displayList.length === 0 && (
          <div className="col-span-full text-center py-10 text-gray-400">
            <i className="fas fa-carrot fa-3x mb-3"></i>
            <p>目前還沒有人填寫喔！</p>
          </div>
        )}
      </div>
    </div>
  );
}
