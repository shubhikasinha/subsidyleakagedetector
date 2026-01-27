"use client";
import { useEffect, useState } from 'react';

interface QueryRow {
  name: string;
  count: number;
}

interface ErrorResponse {
  error: string;
}

export default function BigQueryTest() {
  const [data, setData] = useState<QueryRow[] | ErrorResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/query')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        setData({ error: err.message });
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">BigQuery Data (Sandbox Test)</h1>
        
        {loading ? (
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600">Loading data from BigQuery...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
        
        <p className="mt-4 text-sm text-gray-500">
          API Endpoint: <code className="bg-gray-200 px-2 py-1 rounded">/api/query</code>
        </p>
      </div>
    </div>
  );
}
