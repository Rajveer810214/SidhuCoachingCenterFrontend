import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import Footer from './footer';
import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [loading, setLoading] = useState(false); // Add loading state

  const [askquery, setAskQuery] = useState('');
  const handleAskQuery = (e) => {
    setAskQuery(e.target.value);
  };
  const [query, setQuery] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (!token) {
      setQuery(false);
    } else {
      setQuery(true);
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (askquery.length < 20) {
      toast('Minimum length is 20 characters');
    } else {
      setLoading(true);
      const response = await fetch('https://sidhu-coaching-center.onrender.com/api/query/addqueries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'auth-token': localStorage.getItem('auth-token') },
        body: JSON.stringify({ askquery }),
      });
      await response.json();
      if (response.ok) {
        setLoading(false);
        toast('Successfully sent query'); setAskQuery('');
      }
    }
  };
  return (
    <div className="container" style={{ marginTop: '96px' }}>
      <style jsx>
        {`
        .accordion-item {
          border:1px solid black
        }
        .accordion-button{
            font-size: 18px
        }
      `}

      </style>
      {!query
        ? (
          <div className="alert alert-danger" role="alert">
            Verify your account For asking question
            <Link href="/login">   Login your Account</Link>
          </div>
        )
        : (
          <form onSubmit={handleSubmit}>
            <ToastContainer />
            <div className="input-group">
              <span className="input-group-text">Ask your query</span>
              <textarea className="form-control" value={askquery} onChange={handleAskQuery} minLength={20} required aria-label="With textarea" />
            </div>
            <button type="submit" className="btn btn-dark d-flex float-end my-2" disabled={loading}>{loading ? 'submitting...' : 'submit'}</button>
          </form>
        ) }
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h2 style={{ textAlign: 'center' }}>Choose your Standard</h2>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Student</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Class 10th</h1>
                <p className="leading-relaxed mb-3">Success is not final; failure is not fatal: It is the courage to continue that counts.</p>
                <Link href="components/class10" className="text-indigo-500 inline-flex items-center">
                  Go to Class 10th
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Student</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Class +1</h1>
                <p className="leading-relaxed mb-3">It is better to fail in originality than to succeed in imitation.</p>
                <Link href="components/class11" className="text-indigo-500 inline-flex items-center">
                  Go the Class +1
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="p-4 lg:w-1/3">
              <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">Student</h2>
                <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">Class +2</h1>
                <p className="leading-relaxed mb-3">It is not whether you get knocked down, it is whether you get up</p>
                <Link href="components/class12" className="text-indigo-500 inline-flex items-center">
                  Go the class +2
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
