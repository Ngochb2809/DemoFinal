import { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from "react-icons/fa";
import { UserContext } from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const { userInfo, setUserInfo } = useContext(UserContext);

    // Kiểm tra nếu người dùng đã đăng nhập trước đó và có email trong localStorage
    useEffect(() => {
        const storedEmail = localStorage.getItem('userEmail');
        if (storedEmail && !userInfo) {
            setEmail(storedEmail);
        }
    }, []);

    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });
        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                // Lưu email vào localStorage khi người dùng đăng nhập thành công
                localStorage.setItem('userEmail', email);
                setRedirect(true);
            });
        } else if (response.status === 400) {
            alert('Incorrect email or password');
        } else {
            setError('Server error. Please try again later.');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="login-page">
            <div className="login-page-background"></div>
            <div className="form-container">
                <form className="login" onSubmit={login}>
                    <h1>Welcome back</h1>
                    <h2>Welcome back! Please enter your details.</h2>
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                    />
                    <div className="password-input-container" style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                        />
                        <span
                            className="toggle-password custom-span-style"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <button className="custom-button">Login</button>
                    {error && <p className="error-message">{error}</p>}
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                    <div className="alternative-login-options">
                        <p>Or</p>
                        <button className="facebook-custom"><FaFacebook /></button>
                        <button className="google-custom"><FaGoogle /></button>
                    </div>
                </form>
            </div>
        </div>
    );
}
