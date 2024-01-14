import React from 'react';
import { Container, Grid, TextField, Button, Typography } from '@mui/material';

function Category() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" marginTop="20px" gutterBottom>
        Category
      </Typography>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            placeholder=""
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Button variant="contained" color="primary">
            Add
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Category;
