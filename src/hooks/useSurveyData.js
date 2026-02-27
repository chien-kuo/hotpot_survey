import { useEffect } from 'react';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useSurveyStore } from '../store/surveyStore';
import { useAuthStore } from '../store/authStore';
import { APP_ID, PUBLIC_COLLECTION } from '../utils/constants';

export const useSurveyData = () => {
  const { user } = useAuthStore();
  const { setDataList, setLoading, setError } = useSurveyStore();

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const collectionRef = collection(
      db, 
      'artifacts', 
      APP_ID, 
      'public', 
      'data', 
      PUBLIC_COLLECTION
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const loadedData = [];
      snapshot.forEach(doc => {
        loadedData.push({ id: doc.id, ...doc.data() });
      });
      // Default sort by seat number
      loadedData.sort((a, b) => parseInt(a.seatNumber) - parseInt(b.seatNumber));
      
      setDataList(loadedData);
      setLoading(false);
    }, (error) => {
      console.error("Snapshot Error:", error);
      setError(`資料讀取失敗: ${error.message}`);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, setDataList, setLoading, setError]);
};
