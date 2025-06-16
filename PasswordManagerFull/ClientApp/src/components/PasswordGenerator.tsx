import React from 'react';
import {
  Box,
  Slider,
  Typography,
  FormControlLabel,
  Paper,
  Grid,
  Checkbox
} from '@mui/material';
import CustomButton from './CustomButton';

interface PasswordGeneratorProps {
  passwordLength: number;
  setPasswordLength: (length: number) => void;
  includeLowercase: boolean;
  setIncludeLowercase: (include: boolean) => void;
  includeUppercase: boolean;
  setIncludeUppercase: (include: boolean) => void;
  includeNumbers: boolean;
  setIncludeNumbers: (include: boolean) => void;
  includeSymbols: boolean;
  setIncludeSymbols: (include: boolean) => void;
}

const PasswordGenerator: React.FC<PasswordGeneratorProps> = ({
  passwordLength,
  setPasswordLength,
  includeLowercase,
  setIncludeLowercase,
  includeUppercase,
  setIncludeUppercase,
  includeNumbers,
  setIncludeNumbers,
  includeSymbols,
  setIncludeSymbols,
}) => {
  return (
    <div>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ px: 1 }}>
          <Slider
            value={passwordLength}
            onChange={(_, value) => setPasswordLength(value as number)}
            min={6}
            max={32}
            valueLabelDisplay="on"
            valueLabelFormat={(value) => `${value}`}
            sx={{
              color: '#BD787D',
              '& .MuiSlider-rail': {
                backgroundColor: '#BD787D',
              },
              '& .MuiSlider-track': {
                backgroundColor: '#BD787D',
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                color: '#E0ACBE',
                '&::before': {
                  boxShadow: 'none',
                },
                '&::after': {
                  display: 'none',
                },
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#833D3B',
                fontFamily: 'var(--font-tomorrow)',
                fontSize: '14px',
                padding: '0px 12px',
                borderRadius: '0',
                '&::before': {
                  display: 'none',
                },
                color: '#8F8483',
              },
            }}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Grid container spacing={0}>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  sx={{
                    color: '#BD787D',
                    '&.Mui-checked': {
                      color: '#BD787D',
                    },
                  }}
                />
              }
              label="Lowercase letters"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: 'var(--font-tomorrow)',
                  color: '#833D3B'
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  sx={{
                    color: '#BD787D',
                    '&.Mui-checked': {
                      color: '#BD787D',
                    },
                  }}
                />
              }
              label="Uppercase letters"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: 'var(--font-tomorrow)',
                  color: '#833D3B'
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  sx={{
                    color: '#BD787D',
                    '&.Mui-checked': {
                      color: '#BD787D',
                    },
                  }}
                />
              }
              label="Numbers"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: 'var(--font-tomorrow)',
                  color: '#833D3B'
                }
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  sx={{
                    color: '#BD787D',
                    '&.Mui-checked': {
                      color: '#BD787D',
                    },
                  }}
                />
              }
              label="Symbols"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontFamily: 'var(--font-tomorrow)',
                  color: '#833D3B'
                }
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default PasswordGenerator; 