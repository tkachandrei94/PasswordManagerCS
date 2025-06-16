import React from 'react';
import { Box, CheckboxProps } from '@mui/material';

interface CustomCheckboxProps extends CheckboxProps {
    label?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ checked, onChange, ...props }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onChange?.(e as any, !checked);
    };

    return (
        <Box
            component="div"
            onClick={handleClick}
            sx={{
                width: '24px',
                height: '24px',
                border: '2px solid #BD787D',
                backgroundColor: checked ? '#BD787D' : 'transparent',
                borderRadius: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                    backgroundColor: checked ? '#BD787D' : 'rgba(189, 120, 125, 0.1)',
                },
            }}
            {...props}
        >
            {checked && (
                <Box
                    component="span"
                    sx={{
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 0,
                    }}
                />
            )}
        </Box>
    );
};

export default CustomCheckbox; 