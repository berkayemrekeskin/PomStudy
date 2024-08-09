import React, {useState, useEffect} from 'react'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db, google_provider } from '../../config/firebase-config';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Register = () => {

  const [email, setEmail] = useState("");
  const [fpassword, setFpassword] = useState("");
  const [lpassword, setLpassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [sname, setSname] = useState("");
  const [sclass, setSclass] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if(fpassword !== lpassword)
      {
        alert("Passwords do not match!");
      }
      else 
      {
        await createUserWithEmailAndPassword(auth,email,fpassword);
        const user = auth.currentUser;
        if(user)
        {
          await setDoc(doc(db, "Users", user.uid), {
            email: user.email,
            firstName: fname,
            lastName: lname,
            school: sname,
            class: sclass
          });

          await setDoc(doc(db, "PomInfos", user.uid), {
            pompoint: 0.0,
            friends: 0,
            place: 0,
            lastPom: "no-date",
            total_poms: 0
          });
        }

        console.log("User Registered!");
        navigate("/profile");
      }
    }
    catch (error)
    {
      console.log(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, google_provider);
      console.log("User Signed In with Google!");
      /* 
        Create a user info page for google sign in!
      */ 
      navigate("/profile");
    } catch(error)
    {
      console.log(error);
    }
  }

  const handleLogin = () => {
    navigate("/login");
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
            ✏️ Register to PomStudy!
            </h1>
    
            <form action="#" class="mt-8 grid grid-cols-6 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label for="FirstName" class="block text-sm font-medium text-gray-700">
                  First Name
                </label>
    
                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  class="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
    
              <div class="col-span-6 sm:col-span-3">
                <label for="LastName" class="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
    
                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  class="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setLname(e.target.value)}
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="SchoolName" class="block text-sm font-medium text-gray-700">
                  School Name
                </label>
    
                <input
                  type="text"
                  id="SchoolName"
                  name="school_name"
                  class="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setSname(e.target.value)}
                />
              </div>

              <div class="col-span-6 sm:col-span-3">
                <label for="SchoolClass" class="block text-sm font-medium text-gray-700">
                  School Class
                </label>
    
                <input
                  type="number"
                  id="SchoolClass"
                  name="school_class"
                  class="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setSclass(e.target.value)}
                />
              </div>
    
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
    
              <div class="col-span-6 sm:col-span-3">
                <label for="Password" class="block text-sm font-medium text-gray-700"> Password </label>
    
                <input
                  type="password"
                  id="Password"
                  name="password"
                  class="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setFpassword(e.target.value)}
                />
              </div>
    
              <div class="col-span-6 sm:col-span-3">
                <label for="PasswordConfirmation" class="block text-sm font-medium text-gray-700">
                  Password Confirmation
                </label>
    
                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  class="mt-1 w-full rounded-md border-gray-300 bg-white text-sm text-gray-700 shadow-sm"
                  onChange={(e) => setLpassword(e.target.value)}
                />
              </div>
    
              <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleRegister}
                >
                  Create an account
                </button>

                <button
                  class="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleGoogleSignIn}
                >
                  Sign in with Google
                </button>

                <button
                  class="inline-block shrink-0 rounded-md border border-blue-200 bg-blue-200 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                  onClick={handleLogin}
                >
                  Login
                </button>
                
              </div>
              
            </form>
          </div>
        </main>
      </div>
    </section>
  );
}

export default Register;