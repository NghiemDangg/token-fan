import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import './Login.css';

function Login() {
    const [passwordShown, setPasswordShown] = useState(false);
    const [isShowIcon, setIsShowIcon] = useState(false);
    const [username, setUsername] = useState('');
    const [pwd, setPwd] = useState('');
    const auth = localStorage.getItem("auth");

    const navigate = useNavigate();

    useEffect(() => {
        if (auth) navigate('/');
    });

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
        setIsShowIcon(!isShowIcon);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username === 'trongnh' || username === 'quyenvv') {
            if (username === 'trongnh') localStorage.setItem("auth", JSON.stringify(
                { user: username, token: "QpwL5tke4_trongnh" }
            ))
            else if (username === 'quyenvv') localStorage.setItem("auth", JSON.stringify(
                { user: username, token: "CI6IkpXVCJ9_quyenvv" }
            ))
            navigate('/');
        } else {
            alert(`User ${username} does not exist`);
        }
    }

    return (
        <div className="login">
            <div className="login-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="form-item">
                            <label>Username</label>
                            <input type="text" placeholder='Type your username' required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <AiOutlineUser className="icon-left" />
                        </div>
                        <div className="form-item">
                            <label>Password</label>
                            <input type={passwordShown ? "text" : "password"} placeholder='Type your password'
                                value={pwd}
                                required onChange={e => setPwd(e.target.value)}
                            />
                            <BiLock className="icon-left" />
                            <div className="icon-right" onClick={togglePassword}>
                                {isShowIcon ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </div>
                        </div>
                        <div className="form-item">
                            <button>Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
