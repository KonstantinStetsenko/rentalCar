import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import * as React from 'react';

const ButtonsLoadMore = React.forwardRef(({ onClick }, ref) => {
  return (
    <Stack spacing={2} direction="row">
      <Button
        ref={ref} // Привязываем реф к кнопке
        onClick={onClick}
        id="loadMoreButton"
        sx={{
          display: 'flex',
          marginTop: '80px',
          padding: '12px 51px',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '12px',
          border: '1px solid var(--button, #3470FF)',
          background: 'none',
          color: '#101828',
        }}
        variant="contained"
      >
        Read more
      </Button>
    </Stack>
  );
});

export default ButtonsLoadMore;
