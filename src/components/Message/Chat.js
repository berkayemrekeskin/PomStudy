import React, { useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import { addDoc, getDoc, collection, query, where, serverTimestamp, onSnapshot, orderBy, doc, and } from 'firebase/firestore';

const Chat = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [pomData, setPomData] = useState(null);
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    const messagesRef = collection(db, 'messages');
    const roomsRef = collection(db, 'rooms');

    useEffect(() => {
        try {
            const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
                if (user) {
                    const userRef = doc(db, "Users", user.uid);
                    const userSnap = await getDoc(userRef);
                    const pomInfoRef = doc(db, "PomInfos", user.uid);
                    const pomInfoSnap = await getDoc(pomInfoRef);
                    if (userSnap.exists()) {
                        setUserInfo(userSnap.data());
                        setAuthenticated(true);
                        setLoading(false);
                    } else {
                        console.log("No such User!");
                        setAuthenticated(false);
                        setLoading(false);
                        navigate('/login');
                    }
                    if(pomInfoSnap.exists())
                    {
                        setPomData(pomInfoSnap.data());
                    } else {
                        console.log("No Pom Data!");
                    }

                } else {
                    setAuthenticated(false);
                    setLoading(false);
                    navigate('/login'); // Redirect to login if not authenticated
                }
            });
        
            return () => {
                unsubscribeAuth();
            };
        } catch (error) {
            console.log("Error getting user info: ", error);
        }
        
    }, [navigate]);
    
    useEffect(() => {
        try {
            console.log("userInfo: ", userInfo);
            console.log("pomData: ", pomData);  
            if (userInfo) {
                const unsubscribeRooms = onSnapshot(
                    query(
                        roomsRef,
                        and(
                            where("school", "==", userInfo.school),
                            where("class", "==", userInfo.class)
                        ),
                        orderBy("name")
                    ),
                    (snapshot) => {
                        let roomList = [];
                        snapshot.forEach((doc) => {
                            roomList.push({name: doc.data().name, school: doc.data().school, class: doc.data().class});
                        });
                        setRooms(roomList);
                    }
                );
                return () => {
                    unsubscribeRooms();
                };
            }
        } catch (error) {
            console.log("Error getting rooms: ", error);
        }
        
    }, [userInfo]);
    

    useEffect(() => {
        try {

            if (room) {
                const queryMessages = query(messagesRef, where("room", "==", room), orderBy("createdAt"));
                onSnapshot(queryMessages, (snapshot) => {
                    let messagesList = [];
                    snapshot.forEach((doc) => {
                        messagesList.push({ ...doc.data(), id: doc.id });
                    });
                    setMessages(messagesList);
                });

                const unsubscribeMessages = onSnapshot(
                    query(messagesRef, where("room", "==", room), orderBy("createdAt")),
                    (snapshot) => {
                        let messagesList = [];
                        snapshot.forEach((doc) => {
                            messagesList.push({ ...doc.data(), id: doc.id });
                        });
                        setMessages(messagesList);
                    }
                );
                return () => {
                    unsubscribeMessages();
                };

            }
        } catch (error) {
            console.log("Error getting messages: ", error);
        }

    }, [room]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newMessage === "") return;
        await addDoc(messagesRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: userInfo.firstName,
            email: userInfo.email,
            room: room,
        });

        setNewMessage("");
    }

    const handleJoinRoom = (selectedRoom) => {
        setRoom(selectedRoom);
    };

    const handleCreateRoom = async () => {
        if (room === "" || rooms.includes(room)) return;

        await addDoc(roomsRef, {
            name: room,
            school: userInfo.school,
            class: userInfo.class,
        });

        setRooms([...rooms, room]);
        setRoom(room); // Automatically join the created room
    };

    if (loading) {
        return <div>Loading...</div>; 
    }
    
    if (!authenticated) {
    return null; 
    }
    return (
        <>
            {/* Left: Message Room Names */}
            <div className="w-1/4 max-h-96 bg-white shadow-md p-4 border-r border-gray-300 overflow-y-auto rounded">
                <h2 className="text-lg font-semibold text-center">Message Rooms</h2>
                <input 
                    type="text" 
                    placeholder="Enter Room Name" 
                    className="border border-gray-300 p-2 rounded mt-4 w-full" 
                    onChange={(e) => setRoom(e.target.value)}
                    value={room}
                />
                <button 
                    className="bg-blue-500 text-white p-2 rounded mt-4 w-full hover:bg-blue-300" 
                    type='submit' 
                    onClick={handleCreateRoom}
                >
                    Create Room
                </button>
                <div className="flex flex-col gap-4 mt-4">
                    {rooms.map((room) => (
                        <button 
                            key={room.name} 
                            className="bg-gray-300 p-2 rounded" 
                            onClick={() => handleJoinRoom(room.name)}
                        >
                            {room.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Right: Messages */}
            <div className="w-3/4 p-4 flex flex-col h-full">
                <div className="relative flex-grow bg-white border-2 border-gray shadow-lg rounded p-4 overflow-y-auto">
                    <div className="messages">
                        {messages.map((message) => (
                            <div key={message.id}>
                                {(message.email === userInfo.email) ? <div className='text-end'> <span className="text-cyan-500 font-semibold ">You</span>: {message.text} </div> : 
                                <div className='text-start'> <span className="text-gray-500 font-semibold">{message.user}</span>: {message.text} </div>}
                            </div>
                        ))}
                    </div>
                </div>
                <form className="flex gap-4 mt-4" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Enter your message"
                        className="border border-gray-300 p-2 rounded w-full"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white p-2 rounded"
                        type="submit"
                    > Send </button>
                </form>
            </div>
        </>
    );
}

export default Chat;
