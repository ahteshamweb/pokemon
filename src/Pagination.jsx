import React from 'react'
import Button from '@mui/material/Button';
export default function Pagination({ gotoNextPage, gotoPrevPage }) {
  return (
    <div style={{ marginTop:'20px', textAlign: 'center', marginLeft:'10px' }}>
      {gotoPrevPage && <Button onClick={gotoPrevPage} variant="contained" style={{marginRight:'10px'}}>Previous</Button>}
      {gotoNextPage && <Button onClick={gotoNextPage} variant="contained">Next</Button>}
    </div>
  )
}