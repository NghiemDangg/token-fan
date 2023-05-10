import classes from './Layout.module.css';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className={classes.content}>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
