import { styled, TextField } from '@mui/material';

const CustomTextField = styled(TextField)({
    margin: '0',
    '& .MuiOutlinedInput-root': {
        borderRadius: '50vh',
        fontFamily: 'var(--font-tomorrow)',
        backgroundColor: 'rgba(221, 209, 220, 0.10)',

        '& fieldset': {
            borderColor: '#BD787D',
        },
        '&:hover fieldset': {
            borderColor: '#BD787D',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#BD787D',
        },
        '& input': {
            padding: '16px 24px',
            color: '#BD787D',
        },
        // Стилі для автозаповнення
        '& input:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px rgba(221, 209, 220, 0.10) inset',
            WebkitTextFillColor: '#BD787D',
            caretColor: '#BD787D',
            borderRadius: '50vh',
            transition: 'background-color 5000s ease-in-out 0s',
        },
        '& input:-webkit-autofill:hover': {
            WebkitBoxShadow: '0 0 0 1000px rgba(221, 209, 220, 0.10) inset',
        },
        '& input:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 1000px rgba(221, 209, 220, 0.10) inset',
        },
    },
    '& .MuiInputLabel-root': {
        fontFamily: 'var(--font-tomorrow)',
        color: '#BD787D',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '3.2px',
        marginLeft: '12px',
        '&.Mui-focused': {
            color: '#BD787D',
        },
        '&.MuiInputLabel-shrink': {
            transform: 'translate(14px, -9px) scale(0.75)',
            backgroundColor: '#DDD1DC',
            padding: '0 8px',
        },
    },
    '& .MuiInputBase-input': {
        fontFamily: 'var(--font-tomorrow)',
        color: '#BD787D',
        fontSize: '16px',
        fontWeight: 400,
        lineHeight: '24px',
        letterSpacing: '3.2px',
    },
});

export default CustomTextField; 