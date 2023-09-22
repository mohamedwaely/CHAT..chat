

import React, { useState } from "react";
import Add from'./images/AddAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import './style.css'


const Singup = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
    }
  };

  return (

    <div id="wrapper">
         <div id="form">
                 <h1 id="logo">CHAT..chat</h1>
               <span id="title">Signing Up</span>
                <form id="indiv" onSubmit={handleSubmit}>
                      <input id="name" type="text" placeholder="Your Name"></input>
                     <input id="email" placeholder="Email" type="email"></input>
                      <input id="password" type="password" placeholder="Password"></input>
                     <input id="avatar" type="file"></input>
                   <label className="lavat" htmlFor="avatar">
                        <img className="avatimg" src={Add} alt="img"></img>
                          <span>Add Avatar</span>
                     </label>
                    <button className="R" disabled={loading}>sign up</button>
                    {loading && "Please Wait..."}
                      {err&&<span>Something Went Wrong</span>}
               </form>
             <p>Do You Have Account? <Link to="/login">Login</Link></p> 
         </div>
        </div>
  );
};

export default Singup;
