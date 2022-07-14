import "../../DarkMode.css";
import Switch from '@mui/material/Switch';

const DarkMode = () => { 
    return (
        <div className="toggle-theme-wrapper">
            <span>☀️</span>
            <Switch
//               checked={checked}
//               onChange={handleChange}
                 inputProps={{ 'aria-label': 'controlled' }}
            />                                                      
            <span>🌑</span>
        </div>
    );
};

export default DarkMode;