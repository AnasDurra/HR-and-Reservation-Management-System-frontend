import { Spin } from "antd";
import './Spinner.css';

export default function Spinner(props) {
    return props.loading ? <Spin className="loadingSpinner" size="large" /> : props.children
}