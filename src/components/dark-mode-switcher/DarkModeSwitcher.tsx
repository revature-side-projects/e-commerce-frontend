import Button from '@mui/material/Button'; // KHENAN TERRY: Import Button
import React from "react";
import styled from "styled-components";

export default function DarkModeSwitcher(){
  return(
      <>
          <Button
            color='primary'
            variant='contained'
            sx={{ mt: 0.30, mb: 0 }}
            onClick={() => {}}>

            Dark/Light Mode
          </Button>
      </>
  );

}
