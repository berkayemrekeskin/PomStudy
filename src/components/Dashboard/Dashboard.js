import React from 'react'
import { useNavigate } from 'react-router-dom'


const Dashboard = () => {


    const navigate = useNavigate();

    return (
        <>
          <div id="user-profile-container" className='flex flex-col items-center justify-center'>
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
                    className="shrink-0 rounded-lg bg-sky-100 p-2 text-sm font-medium text-sky-600"
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

export default Dashboard