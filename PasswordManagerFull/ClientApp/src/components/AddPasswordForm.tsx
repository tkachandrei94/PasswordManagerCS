import React from 'react';
import {
    Paper,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff, Refresh } from '@mui/icons-material';
import CustomTextField from './CustomTextField';
import CustomButton from './CustomButton';

interface AddPasswordFormProps {
    title: string;
    password: string;
    showPassword: boolean;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTogglePasswordVisibility: () => void;
    onGeneratePassword: () => void;
    onSubmit: (e: React.FormEvent) => void;
}

const AddPasswordForm: React.FC<AddPasswordFormProps> = ({
    title,
    password,
    showPassword,
    onTitleChange,
    onPasswordChange,
    onTogglePasswordVisibility,
    onGeneratePassword,
    onSubmit
}) => {
    return (
        <div>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                <CustomTextField
                    label="Title"
                    value={title}
                    onChange={onTitleChange}
                    fullWidth
                    margin="normal"
                    required
                    sx={{ mb: 2 }}
                />
                <CustomTextField
                    label="Password"
                    value={password}
                    onChange={onPasswordChange}
                    fullWidth
                    margin="normal"
                    required
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={onTogglePasswordVisibility}
                                    edge="end"
                                    sx={{ color: '#BD787D' }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                                <IconButton
                                    aria-label="generate new password"
                                    onClick={onGeneratePassword}
                                    edge="end"
                                    sx={{ color: '#BD787D', mr: 1 }}
                                >
                                    <Refresh />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />
                <CustomButton
                    type="submit"
                    sx={{ width: '60%' }}
                >
                    Add Password
                </CustomButton>
            </form>
        </div >
    );
};

export default AddPasswordForm; 