import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoc, setDoc, doc, addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../config/firebase-config';

const Timer = ({ initialHours= 2 ,initialMinutes = 25, initialSeconds = 0 }) => {
    const [hours, setHours] = useState(initialHours);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);
    const [tHour, setTHour] = useState(initialHours);
    const [tMinute, setTMinute] = useState(initialMinutes);
    const [tSecond, setTSecond] = useState(initialSeconds);
    const [description, setDescription] = useState("");
    const [userData, setUserData] = useState(null);
    const [pomData, setPomData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false); 
    const [isActive, setIsActive] = useState(false);
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
            return () => unsubscribe(); // Cleanup the listener on unmount
        }, [navigate]);

        let interval = null;

        if (isActive && (hours > 0 || minutes > 0 || seconds > 0)) {
            interval = setInterval(() => {
            if (seconds === 0) {
            if (minutes > 0) {
                setMinutes(minutes - 1);
                setSeconds(59);
            }
            if(minutes === 0 && hours > 0){
                setHours(hours - 1);
                setMinutes(59);
            }
            } else {
                setSeconds(seconds - 1);
                console.log(isActive, hours, minutes, seconds);
            }
        }, 1000);
        } 
        else if (!isActive && hours !== 0 && minutes !== 0 && seconds !== 0) {
            console.log(isActive, hours, minutes, seconds);
            clearInterval(interval);
        }
        else if (isActive && (hours === 0 && minutes === 0 && seconds === 0)) {
            handleFinish(tHour, tMinute, tSecond);
        }


        
        return () => clearInterval(interval);
    }, [isActive, hours, minutes, seconds]);

    const handleStartPause = () => {
        setIsActive(!isActive);
    };

    const handleReset = () => {
        setIsActive(false);
        setHours(initialHours);
        setMinutes(initialMinutes);
        setSeconds(initialSeconds);
    };

    const handleFinish = async (tHour, tMinute, tSecond) => {
        try {
            const user = auth.currentUser;
            if(user)
            {
                console.log(tHour, tMinute, tSecond);
                const totalDuration = tHour * 60 * 60 + tMinute * 60 + tSecond;
                const totalPoint = parseFloat(totalDuration * 0.1).toFixed(2);

                console.log(totalDuration, totalPoint);
                const PomHistoryRef = doc(db, "PomHistory", user.uid);
                const subColRef = collection(PomHistoryRef, "poms");

                await setDoc(doc(db, "PomInfos", user.uid), {
                    pompoint: parseFloat(pomData.pompoint + totalPoint).toFixed(2),
                    friends: pomData.friends,
                    place: pomData.place,
                    lastPom: new Date().toISOString().split('T')[0],
                    total_poms: pomData.total_poms + 1
                });

                await addDoc( subColRef, {
                    description: description,
                    duration: totalDuration,
                    point: totalPoint,
                    date: new Date().toISOString().split('T')[0]
                });

                console.log("Pom Finished!");
                alert("Pom Finished!");
                navigate("/profile");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleHours = (e) => {
        setHours(parseInt(e.target.value));
        setTHour(parseInt(e.target.value));
    }

    const handleMinutes = (e) => {
        setMinutes(parseInt(e.target.value));
        setTMinute(parseInt(e.target.value));
    }

    const handleSeconds = (e) => {
        setSeconds(parseInt(e.target.value));
        setTSecond(parseInt(e.target.value));
    }   

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="text-6xl font-bold">
                {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
            </div>
            <div className="mt-4">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                    onClick={handleStartPause}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button 
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
            <div className='text-6x1 font-bold'>
                <input className="border border-gray-300 rounded-md px-2 py-1 mr-2 mt-5 w-24" type="number" min="0" max="100" placeholder='Hour' onChange={handleHours} />
                <input className="border border-gray-300 rounded-md px-2 py-1 mr-2 mt-5 w-24" type="number" min="0" max="59" placeholder='Minute'onChange={handleMinutes} />
                <input className="border border-gray-300 rounded-md px-2 py-1 mt-5 w-24" type="number" min="0" max="59" placeholder='Second' onChange={handleSeconds} />
            </div>
            <div className="mt-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Lecture</label>
                <input
                type="text"
                name="description"
                id="description"
                className="mt-1 p-2 w-full rounded-md border border-gray-200"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Timer;
