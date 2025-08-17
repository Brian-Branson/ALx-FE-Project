import React, { useState } from 'react';

export default function Pagination({ page = 1, totalPages = 1, onChange }) {
  const [input, setInput] = useState('');

  function goto(p) {
    if (p < 1) p = 1;
    if (p > totalPages) p = totalPages;
    if (onChange) onChange(p);
  }

  function submitJump(e) {
    e.preventDefault();
    const num = Number(input);
    if (!isNaN(num)) goto(num);
    setInput('');
  }

  const showPrev = page > 1;
  const showNext = page < totalPages;

  return (
    <div className="flex items-center justify-center gap-3">
      <button onClick={() => goto(page - 1)} disabled={!showPrev} className="px-3 py-1 rounded border disabled:opacity-50">Prev</button>

      <div className="text-sm px-3 py-1">Page {page} of {totalPages}</div>

      <button onClick={() => goto(page + 1)} disabled={!showNext} className="px-3 py-1 rounded border disabled:opacity-50">Next</button>

      <form onSubmit={submitJump} className="ml-3 flex items-center gap-2">
        <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Go to" className="w-16 border rounded px-2 py-1 text-sm" />
        <button type="submit" className="px-2 py-1 border rounded text-sm">Go</button>
      </form>
    </div>
  );
}
