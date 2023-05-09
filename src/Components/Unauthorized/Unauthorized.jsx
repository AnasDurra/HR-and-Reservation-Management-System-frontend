import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import './Unauthorized.css';

export default function Unauthorized() {

    const navigate = useNavigate();

    return (
        <div className="unauthContainer">
            <Result
                status="error"
                title="هذا الإجراء غير مصرّح به."
                extra={[
                    <Button onClick={() => navigate(-1)} type="primary" key="console">
                        العودة
                    </Button>
                ]}
            />
        </div>
    )
}