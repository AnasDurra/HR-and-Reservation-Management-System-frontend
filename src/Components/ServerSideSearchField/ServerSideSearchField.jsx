import { Button, Input } from "antd";
import './ServerSideSearchField.css';

export default function ServerSideSearchField({ placeholder, searchBtnText, resetBtnText, handleSearch, handleReset, searchValue, setSearchValue }) {
    return (
        <div className="serverSideSearchFieldContainer">
            <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder={placeholder} />
            <Button onClick={handleSearch} type="primary">{searchBtnText}</Button>
            <Button onClick={handleReset} className="secondButton">{resetBtnText}</Button>
        </div>
    );
}