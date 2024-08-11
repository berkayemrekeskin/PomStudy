import React, { useState, useEffect } from 'react';
import app, { auth, db } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { getDoc, doc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [position, setPosition] = useState(null);
  const [pomData, setPomData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]); 

  const navigate = useNavigate();
  const userInfos = collection(db, 'PomInfos');

  useEffect(() => {
    
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
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
        navigate('/login'); // Redirect to login if not authenticated
      }
    }, []);

    
    return () => {
      unsubscribeAuth();
    }

  }, [navigate, userInfos]);


  const handleSession = () => {
    navigate("/session");
  }

  const handleSignOut = async () => {
    await auth.signOut();
    navigate("/login");
  }

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!authenticated) {
    return null; 
  }

  return (
    <>
      <div id="user-profile-container" className='flex flex-col items-center justify-center'>
        <a
          href="#"
          className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 lg:w-96 shadow-lg bg-white text-gray-900 mt-20 h-96"
        >
          <span className="absolute inset-x-0 bottom-0 h-2 bg-blue-500"></span>

          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                {userData.firstName} {userData.lastName}
              </h3>
              <h2 className="text-sm text-gray-500"> {userData.school} & {userData.class}. Grade </h2>
            </div>

            <div className="hidden sm:block sm:shrink-0">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                className="size-16 rounded-lg object-cover shadow-sm"
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-pretty text-sm text-gray-500">
              Generated Profile Message According to User's Pomodoro Point
            </p>
          </div>

          <dl className="mt-6 flex flex-row sm:justify-between">
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600 text-left">{pomData.lastPom}</dt>
              <dd className="text-xs text-gray-500">Last Pomodoro</dd>
            </div>

            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600">{pomData.place}</dt>
              <dd className="text-xs text-gray-500">Place</dd>
            </div>

            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600 text-right">{pomData.pompoint}</dt>
              <dd className="text-xs text-gray-500">PomoPoints</dd>
            </div>
          </dl>

          <dl className="mt-6 flex flex-row sm:justify-between">
            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600 text-left">{pomData.friends}</dt>
              <dd className="text-xs text-gray-500">Friends</dd>
            </div>

            <div className="flex flex-col-reverse">
              <dt className="text-sm font-medium text-gray-600 text-right">{pomData.total_poms}</dt>
              <dd className="text-xs text-gray-500">Pomodoros</dd>
            </div>
          </dl>

          <dl className="mt-6 flex flex-row sm:justify-between sm:gap-10">
            <button className="mt-4 w-full rounded-lg bg-blue-500 text-white text-sm font-medium py-2 hover:bg-blue-400"
              onClick={handleSession}
            >
              Start Session
            </button>

            <button className="mt-4 w-full rounded-lg bg-blue-500 text-white text-sm font-medium py-2 hover:bg-blue-400"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </dl>
        </a>

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
                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 active:text-gray-900 active:bg-gray-100"
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
                className="shrink-0 rounded-lg p-2 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                onClick={() => navigate('/message')}
              >
                Messages
              </a>
              <a
                href="#"
                className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
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

export default UserProfile
