import React, { useState } from 'react';
import {
    IconButton,
    InputAdornment,
    TextField,
    TextFieldProps
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from './CustomTextField';

interface PasswordFieldProps extends Omit<TextFieldProps, 'variant'> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <CustomTextField
            {...props}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
                ...props.InputProps,
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            sx={{
                                color: '#BD787D',
                                marginLeft: '8px'
                            }}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )
            }}
        />
    );
};

export default PasswordField; 