import { useState } from 'react';
import { collection, doc, setDoc, serverTimestamp, writeBatch, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuthStore } from '../store/authStore';
import { APP_ID, PUBLIC_COLLECTION } from '../utils/constants';

export const useSurveyActions = () => {
  const { user } = useAuthStore();
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const getCollectionRef = () => {
    return collection(db, 'artifacts', APP_ID, 'public', 'data', PUBLIC_COLLECTION);
  };

  const submitSurvey = async (seatNumber, ingredients) => {
    if (!ingredients.trim()) {
      alert("請輸入攜帶的食材");
      return;
    }
    if (!user) {
      alert("系統尚未連線，請稍候");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const seatNumInt = parseInt(seatNumber);
      const docId = `seat_${seatNumInt}`;
      const docRef = doc(getCollectionRef(), docId);

      await setDoc(docRef, {
        seatNumber: seatNumInt,
        ingredients: ingredients.trim(),
        updatedAt: serverTimestamp(),
        updatedBy: user.uid
      });
      return true;
    } catch (err) {
      console.error("Write Error:", err);
      setErrorMsg(`送出失敗: ${err.message}`);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const clearAllData = async () => {
    if (!confirm("確定要清空所有資料嗎？此操作對所有使用者生效。")) return;
    setSubmitting(true);
    try {
      const snapshot = await getDocs(getCollectionRef());
      const batch = writeBatch(db);
      snapshot.docs.forEach(doc => batch.delete(doc.ref));
      await batch.commit();
      alert("資料庫已清空");
    } catch (err) {
      alert("清空失敗：" + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteSelected = async (selectedIds) => {
    if (selectedIds.length === 0) return;
    if (!confirm(`確定要刪除 ${selectedIds.length} 筆所選資料嗎？此操作無法復原。`)) return;
    
    setSubmitting(true);
    try {
      const batch = writeBatch(db);
      selectedIds.forEach(id => {
        const docRef = doc(getCollectionRef(), id);
        batch.delete(docRef);
      });
      await batch.commit();
      alert('已刪除所選資料');
      return true;
    } catch (err) {
      alert('刪除失敗：' + err.message);
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return { submitting, errorMsg, submitSurvey, clearAllData, deleteSelected };
};
