import React from 'react';
import SurveyForm from '../components/SurveyForm';
import DataList from '../components/DataList';

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4">
          <SurveyForm />
        </div>
        <div className="md:col-span-8">
          <DataList />
        </div>
      </div>
    </div>
  );
}
