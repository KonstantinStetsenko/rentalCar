import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ButtonsCart() {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('handleClick called');
    navigate('/catalog');
  };

  return (
    <Stack spacing={2} direction="row">
      <Button
        onClick={handleClick}
        sx={{
          display: 'flex',
          width: '100%',
          //   padding: '12px 51px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          backgroundColor: '#3470FF',
        }}
        variant="contained"
      >
        Read more
      </Button>
    </Stack>
  );
}
