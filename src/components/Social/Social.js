import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { addDoc, getDoc, collection, query, where, serverTimestamp, onSnapshot, orderBy, doc, and } from 'firebase/firestore';
const Social = () => {
  
  const [userData, setUserData] = useState(null);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [pomHistoryData, setPomHistoryData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  const pomHistoryRef = collection(db, 'PomHistory');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setAuthenticated(true);
        const userRef = doc(db, "Users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.log("No such User!");
        }
        setLoading(false);
      } else {
        setAuthenticated(false);
        setLoading(false);
        navigate('/login');
      }
      return () => unsubscribe(); // Cleanup the listener on unmount
    }, [navigate]);
  } , [navigate]);

  useEffect(() => {
    if (userData) {

      console.log("userData", userData);
      const unsubscribePomHistory = onSnapshot(
        query(
          pomHistoryRef,
          and(
            where("school", "==", userData.school),
            where("class", "==", userData.class)
        ),
          orderBy('createdAt', 'desc'),
        ),
        (snapshot) => {
          const newPosts = snapshot.docs.map((doc) => ({
            id: doc.id,
            school: doc.data().school,
            class: doc.data().class,
            name: doc.data().name,
            surname: doc.data().surname,
            description: doc.data().description,
            duration: doc.data().duration,
            point: doc.data().point,
            date: doc.data().date,
            createdAt: doc.data().createdAt,
          }));
          setPosts(newPosts);
        }
      );
      
      return () => {
        unsubscribePomHistory();
      };
    }

  }, [userData]);


  const handleTime = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time - hours * 3600) / 60);
    let seconds = time - hours * 3600 - minutes * 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <>
      <div className="flex flex-col items-center h-full">
        {/* Social Feed */}
        <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>

        <div className="w-full px-4 sm:px-0 sm:w-96 flex-grow overflow-y-auto max-h-[calc(100vh-8rem)]">
          <div className="space-y-2">
            {posts.slice(start,end).map((post) => (
                <div className="bg-gray-100 p-2 rounded-lg shadow">
                <h4 className="font-bold text-sm">{post.name}</h4>
                <p className="text-xs text-gray-700">{post.name} finished {post.description} pom within {handleTime(post.duration)} with {post.point} points! 💪</p>
                <span className="text-xs text-gray-500"> {post.date} </span>
                </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Tabs */}
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
                className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
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

export default Social