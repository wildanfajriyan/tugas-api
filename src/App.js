import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [provinsi, setProvinsi] = useState([]);
  const [nama, setNama] = useState('');
  const [ibukota, setIbukota] = useState('');

  useEffect(() => {
    getProvinsi();
  }, []);

  const getProvinsi = () => {
    fetch('https://64202e3182bea25f6dfb967e.mockapi.io/api/provinsi')
      .then((res) => res.json())
      .then((data) => setProvinsi(data));
  };

  const addProvinsi = async (e) => {
    e.preventDefault();
    const data = {
      nama,
      ibukota,
    };

    setNama('');
    setIbukota('');

    try {
      let res = await fetch(
        'https://64202e3182bea25f6dfb967e.mockapi.io/api/provinsi',
        {
          method: 'POST',
          body: JSON.stringify({
            nama,
            ibukota,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );

      let result = await res.json();

      if (res.status === 200) {
        setNama('');
        setIbukota('');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeProvinsi = async (id) => {
    try {
      let res = await fetch(
        `https://64202e3182bea25f6dfb967e.mockapi.io/api/provinsi/${id}`,
        { method: 'DELETE' }
      );
      let result = res.json();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='App'>
      <h1>Nama - Nama Provinsi</h1>
      <div className='all-provinsi'>
        {provinsi.map((p) => (
          <div key={p.id} className='provinsi-card'>
            <h2>{p.nama}</h2>
            <h3>{p.ibukota}</h3>
            <button onClick={() => removeProvinsi(p.id)}>X</button>
          </div>
        ))}
      </div>

      <div className='form-container'>
        <form onSubmit={addProvinsi}>
          <input
            type={'text'}
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder={'Nama Provinsi'}
          />
          <input
            type={'text'}
            value={ibukota}
            onChange={(e) => setIbukota(e.target.value)}
            placeholder={'Nama Ibukota'}
          />

          <button type={'submit'}>TAMBAH</button>
        </form>
      </div>
    </div>
  );
}

export default App;
