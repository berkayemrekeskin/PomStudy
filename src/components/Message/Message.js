import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../config/firebase-config';
import Chat from './Chat';
import { getDoc, doc, setDoc, addDoc } from 'firebase/firestore';


const Message = () => {

  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuthenticated(true);
        setLoading(false);

      } else {
        setAuthenticated(false);
        setLoading(false);
        navigate('/login'); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  return (
    <>
      <div id="user-profile-container" className='flex flex-col items-center justify-center relative h-screen'>
        <div className="flex flex-row items-start justify-center w-3/4 h-3/4">
          <Chat />
        </div>
        <div className='absolute bottom-10'>
          <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">Tab</label>
            <select id="Tab" className="w-full rounded-md border-gray-200">
              <option>Social</option>
              <option>Dashboard</option>
              <option>Session</option>
              <option>Messages</option>
              <option selected>Profile</option>
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="flex gap-6" aria-label="Tabs">
              <a
                href="#"
                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                aria-current="page"
                onClick={() => navigate('/social')}
              >
                Social
              </a>
              <a
                href="#"
                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </a>
              <a
                href="#"
                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                onClick={() => navigate('/session')}
              >
                Session
              </a>
              <a
                href="#"
                className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
                onClick={() => navigate('/message')}
              >
                Messages
              </a>
              <a
                href="#"
                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                aria-current="page"
                onClick={() => navigate('/profile')}
              >
                Profile
              </a>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
