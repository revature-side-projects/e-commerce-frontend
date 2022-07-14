import "../../DarkMode.css";
import Switch from '@mui/material/Switch';
import { ChangeEventHandler } from "react";

const setDark = () => {

    localStorage.setItem("theme", "dark");

    document.documentElement.setAttribute("data-theme", "dark");
};

const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
};

const storedTheme = localStorage.getItem("theme");

const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const defaultDark =
    storedTheme === "dark" || (storedTheme === null && prefersDark);

if (defaultDark) {
    setDark();
}

const toggleTheme: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.checked) {
        setDark();
    } else {
        setLight();
    }
};

const DarkMode = () => {
    return (
        <div className="toggle-theme-wrapper">
            <span>☀️</span>
            <Switch
                role="switch"
                defaultChecked={storedTheme ? true : false}
                onChange={toggleTheme}

                inputProps={{ 'aria-label': 'controlled' }}
            />
            <span>🌑</span>
        </div>
    );
};

export default DarkMode;