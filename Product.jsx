import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

/* === CHANGE THIS: your published CSV URL === */
const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHnWWwz0rmowlspxnq8PDUZRBFDOty5UPQLayxtABYl3VO1OsosT9hp8XO9QtIFxit7ZQk92C5HN7N/pub?output=csv";
const DEFAULT_WHATSAPP = "+919521787139";

/* small CSV parser that handles quoted fields */
function parseCSV(text){
  const rows = [];
  const lines = text.split(/\r?\n/).filter(Boolean);
  if(lines.length===0) return rows;
  for(const line of lines){
    const row = [];
    let cur = '';
    let inQuotes = false;
    for(let i=0;i<line.length;i++){
      const ch = line[i];
      if(ch === '"' ) { inQuotes = !inQuotes; continue; }
      if(ch===',' && !inQuotes){
        row.push(cur.trim());
        cur='';
      } else {
        cur += ch;
      }
    }
    row.push(cur.trim());
    rows.push(row);
  }
  return rows;
}

export default function Products(){
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');

  useEffect(()=>{
    fetch(SHEET_CSV_URL).then(r => r.text()).then(txt => {
      const rows = parseCSV(txt);
      const header = rows[0].map(h => h.toLowerCase());
      const data = rows.slice(1).map(r => {
        const obj = {};
        header.forEach((h,i) => obj[h] = r[i] || '');
        return obj;
      }).filter(p => p.name && p.name.trim() !== '');
      setProducts(data);
    }).catch(err => {
      console.error("CSV load error", err);
    });
  },[]);

  const filtered = products.filter(p => p.name.toLowerCase().includes(q.toLowerCase()) || (p.description||'').toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <h3>Products</h3>
      <input className="search" placeholder="Search products..." value={q} onChange={e=>setQ(e.target.value)} />
      <div className="grid">
        {filtered.map((p, idx) => (
          <ProductCard key={idx} product={p} index={idx} whatsapp={p.whatsapp || DEFAULT_WHATSAPP} />
        ))}
      </div>
    </div>
  );
}
