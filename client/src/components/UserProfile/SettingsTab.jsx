import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

export default function SettingsTab({ darkMode, setDarkMode }) {
    return (
        <FormControlLabel
            control={
                <Switch
                    checked={darkMode}
                    onChange={e => setDarkMode(e.target.checked)}
                />
            }
            label="Тёмная тема"
        />
    );
}