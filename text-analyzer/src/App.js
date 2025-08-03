import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };
  
      handleResize(); // cek pertama kali
      window.addEventListener('resize', handleResize); // pantau saat resize
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    const textareaStyle = {
      width: isMobile ? '100%' : '98%',
      height: '300px',
      resize: 'none',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxSizing: 'border-box',
    };

    const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:3001/analyze', { text });
      const { category, summary } = res.data;

      const historyEntry = {
        input: text,
        category,
        summary,
      };

      // Simpan ke backend
      const saved = await axios.post('http://localhost:3001/save-history', historyEntry);
      setHistory(prev => [...prev, saved.data.entry]);
      setResult({ category, summary });
      setText('');
    } catch (error) {
      alert('Gagal menganalisis teks.');
      console.error(error);
    }
    setLoading(false);
  };
  
  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://localhost:3001/history');
      setHistory(res.data);
    } catch (error) {
      console.error('Gagal memuat riwayat');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/history/${id}`);
      setHistory(prev => prev.filter(entry => entry.id !== id));
    } catch (error) {
      alert('Gagal menghapus riwayat');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '0px 24px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Left: Input & Result */}
      <div className="md:w-2/3 w-full space-y-4">
        <h1 className="text-2xl font-bold">Text Analyzer</h1>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={textareaStyle}
          placeholder="Masukkan teks untuk dianalisis..."
        />


        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Memproses...' : 'Analisis Teks'}
        </button>

        {result && (
          <div className="bg-white p-4 rounded shadow mt-4">
            <h2 className="font-semibold">Hasil Analisis:</h2>
            <p><strong>Kategori:</strong> {result.category}</p>
            <p><strong>Ringkasan:</strong> {result.summary}</p>
          </div>
        )}
      </div>

      {/* Right: History */}
      <div className="md:w-1/3 w-full bg-white rounded shadow p-4 h-fit">
        <h2 className="text-xl font-semibold mb-4">Riwayat Analisis</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">Belum ada riwayat.</p>
        ) : (
          <ul className="space-y-3 max-h-[500px] overflow-y-auto">
            {history.map((entry) => (
              <li key={entry.id} className="border p-3 rounded">
                <p className="text-sm text-gray-600">{new Date(entry.timestamp).toLocaleString()}</p>
                <p><strong>Kategori:</strong> {entry.category}</p>
                <p><strong>Ringkasan:</strong> {entry.summary}</p>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="mt-2 text-sm text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
