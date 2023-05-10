import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Header.css';
// import routes from '../../routers/routers';
import images from '../../assets/images';

function Header() {
    const auth = JSON.parse(localStorage.getItem('auth'));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('auth');
        setTimeout(() => {
            navigate('/');
            toast.success('Successful logout !', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }, 500);
    };

    return (
        <header>
            <div className="header-top">
                <div className="left">
                    {auth && auth.user ? (
                        <p className="userName" style={{ color: '#fff' }}>
                            <AiOutlineUser />
                            <span>{auth.user}</span>
                        </p>
                    ) : (
                        <Link to="/login" className="user">
                            <AiOutlineUser />
                            <span>Login</span>
                        </Link>
                    )}
                </div>
                <div className="right">{auth && <button onClick={handleLogout}>Logout</button>}</div>
            </div>
            <div className="header-bottom">
                <Link to="/">
                    <img src={images.logo} alt="" />
                </Link>
                <ul>
                    <li>
                        <Link to="/claim">Claim</Link>
                    </li>
                    <li>
                        <a href="#news">News</a>
                    </li>
                    <li>
                        <a href="#vote">Vote</a>
                    </li>
                    <li>
                        <a href="#contact">Contact</a>
                    </li>
                </ul>
            </div>
            <ToastContainer />
        </header>
    );
}

export default Header;
