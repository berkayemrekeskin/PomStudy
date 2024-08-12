import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import app, { auth, db } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc } from 'firebase/firestore';

const Session = () => {

  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [point, setPoint] = useState("");
  const [userData, setUserData] = useState(null);
  const [pomData, setPomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuthenticated(true);
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        const pomInfoRef = doc(db, "PomInfos", user.uid);
        const pomInfoSnap = await getDoc(pomInfoRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No such User!");
        }
        if(pomInfoSnap.exists())
        {
          setPomData(pomInfoSnap.data());
        } else {
          console.log("No Pom Data!");
        }
        setLoading(false);

      } else {
        setAuthenticated(false);
        setLoading(false);
        navigate('/login');
      }
    });


    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [navigate]);

  return (
    <>
      

      <div id="user-profile-container" className='flex flex-col items-center justify-center'>

        <div className="min-h-screen flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Timer initialHours={0} initialMinutes={0} initialSeconds={0} />
          </div>
        </div>

        <div className='absolute bottom-10'>
          <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">Tab</label>
            <select id="Tab" className="w-full rounded-md border-gray-200">
              <option>Social</option>
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
                className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
                onClick={() => navigate('/session')}
              >
                Session
              </a>
              <a
                href="#"
                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
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
  )
}

export default Session