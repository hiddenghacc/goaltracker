import React, { useState } from "react"
import { Button, Container, Grid, Paper, TextField } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"

function GoalForm({ refetch, action, defaultName = "", defaultNote = "" }) {
  const [name, setName] = useState(defaultName)
  const [note, setNote] = useState(defaultNote)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await action(name, note)
    refetch()
  }

  return (
    <Container maxWidth="sm" sx={{ mb: 1 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 4 }}>
        <Grid container>
          <TextField
            required
            // id="name"
            // name="name"
            label="name"
            variant="standard"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            // id="note"
            // name="note"
            label="note"
            variant="standard"
            fullWidth
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Save
          </Button>
        </Grid>
      </Paper>
    </Container>
  )
}

export default GoalForm
