import { useState, useMemo, useEffect } from 'react';
import { useSurveyStore } from '../store/surveyStore';
import { useSurveyActions } from '../hooks/useSurveyActions';
import { useAuthStore } from '../store/authStore';
import AdminPanel from '../components/AdminPanel';
import AdminDataList from '../components/AdminDataList';
import { generateCSV } from '../utils/csvGenerator';
import { generatePDF } from '../utils/pdfGenerator';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const { dataList } = useSurveyStore();
  const { clearAllData, deleteSelected } = useSurveyActions();
  const { user, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);

  const [sortKey, setSortKey] = useState('seatNumber');
  const [sortDir, setSortDir] = useState(1); // 1 = asc, -1 = desc
  const [selectedRows, setSelectedRows] = useState([]);

  // Clear selection when dataList changes (to avoid stale ids)
  useEffect(() => {
    setSelectedRows(prev => prev.filter(id => dataList.some(d => d.id === id)));
  }, [dataList]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDir(prev => -prev);
    } else {
      setSortKey(key);
      setSortDir(key === 'seatNumber' ? 1 : -1);
    }
  };

  const sortedList = useMemo(() => {
    const arr = [...dataList];
    arr.sort((a, b) => {
      if (sortKey === 'seatNumber') {
        return (parseInt(a.seatNumber) - parseInt(b.seatNumber)) * sortDir;
      }
      if (sortKey === 'updatedAt') {
        const aTime = a.updatedAt ? (a.updatedAt.seconds ?? a.updatedAt) : 0;
        const bTime = b.updatedAt ? (b.updatedAt.seconds ?? b.updatedAt) : 0;
        if (aTime === bTime) return parseInt(a.seatNumber) - parseInt(b.seatNumber);
        return (aTime - bTime) * sortDir;
      }
      return 0;
    });
    return arr;
  }, [dataList, sortKey, sortDir]);

  const toggleSelect = (id) => {
    setSelectedRows(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      return [...prev, id];
    });
  };

  const toggleSelectAll = () => {
    const allIds = sortedList.map(i => i.id);
    if (selectedRows.length === allIds.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allIds);
    }
  };

  const handleDelete = async () => {
    const success = await deleteSelected(selectedRows);
    if (success) setSelectedRows([]);
  };

  if (!isAdmin) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <AdminPanel 
        userEmail={user?.email || 'Admin'}
        onExportCSV={() => generateCSV(sortedList)}
        onExportPDF={() => generatePDF(sortedList)}
        onClearData={clearAllData}
        onDeleteSelected={handleDelete}
        selectedCount={selectedRows.length}
        dataCount={dataList.length}
      />
      
      <AdminDataList 
        dataList={sortedList}
        selectedRows={selectedRows}
        onToggleSelect={toggleSelect}
        onToggleSelectAll={toggleSelectAll}
        sortKey={sortKey}
        sortDir={sortDir}
        onSort={handleSort}
      />
    </div>
  );
}
