import { useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

export const NotFound = () => {
    const navigate = useNavigate();
    const handleBackHomePage = () => {
        navigate('/');
    };

    return (
        <Result
            status="404"
            title="404 Not Found"
            subTitle="Sorry, the page you visited does not exist."
            style={{ marginTop: '48px' }}
            extra={
                <Button type="primary" onClick={handleBackHomePage}>
                    Back Home
                </Button>
            }
        />
    );
};

export default NotFound;
