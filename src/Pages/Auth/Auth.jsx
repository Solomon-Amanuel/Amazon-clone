import React, { useContext, useState } from "react";
import classes from "./signup.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/amazon-logo-black.png";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";


const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState({signIn:false, signUp:false});

  const [{user} , dispatch] = useContext(DataContext)
  const navigate = useNavigate()
  const navStateData = useLocation()

  // console.log(user);
  

  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);
    

    if (e.target.name == "signin") {
      // firebase auth
      setisLoading({...isLoading,signIn:true});
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type:Type.SET_USER,
            user:userInfo.user,
          })
          setisLoading({ ...isLoading, signIn: false });
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          setError(err.message);
          setisLoading({ ...isLoading, signIn: false });
        });
    } else {
      setisLoading({ ...isLoading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setisLoading({ ...isLoading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setisLoading({ ...isLoading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small style={{
            padding:"5px",
            textAlign:"center",
            color:"red",
            fontWeight:"bold"
          }}>
         {navStateData?.state?.msg}
        </small>
      )}
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            name="signin"
            onClick={authHandler}
            type="submit"
            className={classes.login__signInButton}
          >
            {isLoading.signIn ? (
              <ClipLoader color="#000" size={15} />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agreee to the AMAZON FAKE CLONE conditions of use &
          sale. please see our Privacy Notice, Cookies Notice and Interest-Based
          Ads Notice.
        </p>
        {/* create account btn */}
        <button
          name="signup"
          onClick={authHandler}
          type="submit"
          className={classes.login__registerButton}
        >
          {isLoading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <small style={{ padding: "5px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
};

export default Auth;
