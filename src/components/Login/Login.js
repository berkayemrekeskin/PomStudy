import React, {useState, useEffect} from 'react'
import { signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, google_provider} from '../../config/firebase-config';

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.user;
      console.log(user);
      navigate("/profile");
    } catch(error)
    {
      alert("User is not found!");
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth,google_provider);
      console.log("User Signed In with Google!");
      const user = auth.currentUser;
      console.log(user);
      navigate("/profile");
    } catch (error)
    {
      console.log(error);
    }
  }
  
  const handleRegister = () => {
    navigate("/register");
  }

  return (
    
    <section class="bg-white ">
      <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside class="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            class="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
    
        <main
          class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
        >
          <div class="max-w-xl lg:max-w-3xl">
            <a class="block text-blue-600" href="#">
              <span class="sr-only">Home</span>
            </a>
    
            <h1 class="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            ✏️ Login to PomStudy!
            </h1>
    
            <form action="#" class="mt-8 grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>
    
                <input
                  type="email"
                  id="Email"
                  name="email"
                  class="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
    
              <div class="col-span-6">
                <label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>
    
                <input
                  type="password"
                  id="Password"
                  name="password"
                  class="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
    
              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleLogin}
                >
                  Sign In
                </button>

                <button
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleGoogleLogin}
                >
                  Sign in with Google
                </button>

                <button
                  class="inline-block shrink-0 rounded-md border border-blue-200 bg-blue-200 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleRegister}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>
  )
}

export default Login