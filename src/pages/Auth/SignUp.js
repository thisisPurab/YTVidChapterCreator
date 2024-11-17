import { useRef } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app, db } from "../../firebaseConfig";
import { setUserDetails } from "../../redux/userSLice";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignUp = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        createUserWithEmailAndPassword(auth, email, password).then(
            async (res) => {
                console.log(res._tokenResponse.refreshToken);
                dispatch(
                    setUserDetails({
                        uid: res.user.uid,
                        name: name,
                        email: res.user.email,
                        courses: [],
                    })
                );
                await setDoc(doc(db, "users", res.user.uid), {
                    name: name,
                    email: email,
                    courses: {},
                });
                navigate("/");
                sessionStorage.setItem(
                    "Auth Token",
                    res._tokenResponse.refreshToken
                );
            }
        );
    };

    return (
        <div className={styles.auth}>
            <label>Name</label>
            <input
                type="text"
                required
                name="name"
                ref={nameRef}
            />
            <label>Email</label>
            <input
                type="text"
                required
                name="email"
                ref={emailRef}
            />
            <label>Password</label>
            <input
                type="password"
                required
                name="password"
                ref={passwordRef}
            />
            <button onClick={handleSignUp}>SignUp</button>
        </div>
    );
};

export default SignUp;
