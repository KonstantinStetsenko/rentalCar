import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as React from 'react';

export default function ButtonsForm() {
  return (
    <Stack spacing={2} direction="row">
      <Button
        sx={{
          display: 'flex',
          width: '156px',
          padding: '12px 51px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          background: '#3470FF',
        }}
        variant="contained"
      >
        Send
      </Button>
    </Stack>
  );
}
