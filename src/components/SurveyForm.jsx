import { useState } from 'react';
import { SEAT_NUMBERS } from '../utils/constants';
import { useSurveyActions } from '../hooks/useSurveyActions';

export default function SurveyForm() {
  const [selectedSeat, setSelectedSeat] = useState(SEAT_NUMBERS[0]);
  const [ingredients, setIngredients] = useState('');
  const { submitSurvey, submitting, errorMsg } = useSurveyActions();

  const handleSubmit = async () => {
    const success = await submitSurvey(selectedSeat, ingredients);
    if (success) {
      setIngredients('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
      <h2 className="text-xl font-bold text-gray-700 mb-6 border-b pb-2">填寫食材</h2>
      <p className="text-sm text-gray-500 mb-4">學校已備有：高麗菜、玉米、香菇、肉片、排骨</p>
      
      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {errorMsg}</span>
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label className="block text-gray-600 font-medium mb-2">1. 學生座號</label>
          <div className="relative">
            <select 
              value={selectedSeat}
              onChange={(e) => setSelectedSeat(e.target.value)}
              className="w-full border border-gray-300 rounded p-3 appearance-none bg-gray-50 focus:outline-none focus:border-blue-500 focus:bg-white transition"
            >
              {SEAT_NUMBERS.map(n => <option key={n} value={n}>{n} 號</option>)}
            </select>
            <div className="absolute right-3 top-3.5 pointer-events-none text-gray-500"><i className="fas fa-chevron-down"></i></div>
          </div>
        </div>
        <div>
          <label className="block text-gray-600 font-medium mb-2">2. 攜帶食材</label>
          <textarea 
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="4"
            placeholder="請輸入攜帶食材..."
            className="w-full border border-gray-300 rounded p-3 focus:outline-none focus:border-blue-500 transition"
          />
        </div>
        <button 
          onClick={handleSubmit}
          disabled={submitting}
          className={`w-full text-white font-bold py-3 rounded transition shadow-md ${submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          {submitting ? <><i className="fas fa-spinner fa-spin mr-2"></i>傳送中...</> : <><i className="fas fa-paper-plane mr-2"></i>送出資料</>}
        </button>
      </div>
    </div>
  );
}
