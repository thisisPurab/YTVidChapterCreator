import { useRef } from "react";
import styles from "./Auth.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app, db } from "../../firebaseConfig";
import { setUserDetails } from "../../redux/userSLice";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(auth, email, password).then(async (res) => {
            const docRef = doc(db, "users", res.user.uid);
            const docSnap = await getDoc(docRef);
            dispatch(
                setUserDetails({
                    uid: res.user.uid,
                    name: docSnap.data().name,
                    email: res.user.email,
                    courses: Object.keys(docSnap.data().courses),
                })
            );
            navigate("/");
            sessionStorage.setItem(
                "Auth Token",
                res._tokenResponse.refreshToken
            );
        });
    };

    return (
        <div className={styles.auth}>
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
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
