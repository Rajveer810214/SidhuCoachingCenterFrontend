/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Addquery() {
  const router = useRouter();
  const [queries, setQueries] = useState([]);
  const [loadingQueryId, setLoadingQueryId] = useState('');

  const deleteNoteIcon = async (id) => {
    try {
      setLoadingQueryId(id); // Set the loadingQueryId to the ID of the query being deleted
      const response = await fetch(`https://sidhu-coaching-center.onrender.com/api/query/deletequeries/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('auth-token') },
      });
      await response.json();
      if (response.ok) {
        // Remove the deleted query from the state
        // eslint-disable-next-line no-underscore-dangle
        setQueries((prevQueries) => prevQueries.filter((query) => query._id !== id));
        toast.success('Item deleted successfully'); // Display success toast
      } else {
        toast.error('Error deleting query'); // Display error toast
      }
    } catch (error) {
      toast.error('Error deleting query'); // Display error toast
    } finally {
      setLoadingQueryId(''); // Reset the loadingQueryId to empty string
    }
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token') === null) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sidhu-coaching-center.onrender.com/api/query/getqueries', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('auth-token') },
        });
        const data = await response.json();
        if (response.ok) {
          setQueries(data);
        }
      } catch (error) {
        toast.error('Error while fetching the queries'); // Display error toast
      }
    };

    fetchData();
  }, []);

  if (!Array.isArray(queries) || queries.length === 0) {
    return <h2 style={{ marginTop: '77px', textAlign: 'center' }}>No data available...</h2>;
  }

  // Group the queries into rows with three queries per row
  const rows = [];
  for (let i = 0; i < queries.length; i += 3) {
    const row = queries.slice(i, i + 3);
    rows.push(row);
  }

  return (
    <div className="container" style={{ marginTop: '96px' }}>
      <ToastContainer />
      <h1 style={{ textAlign: 'center' }}>Your Queries</h1>
      {rows.map((row) => (
        <div className="row" key={row.id}>
          {row.map((query) => (
            <div className="col-sm-4 mb-3 mb-sm-0 my-3" key={query.id}>
              <div className="card">
                <div className="icons d-flex flex-row-reverse my-2">
                  <i className="fa-solid fa-trash mx-2" onClick={() => deleteNoteIcon(query._id)} />
                </div>
                <div className="card-body">
                  <p className="card-title">
                    <strong>Question: </strong>
                    {query.askquery}
                  </p>
                  <p className="btn btn-secondary my-3">
                    {loadingQueryId === query.id ? 'Deleting...' : 'response is pending '}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Addquery;
