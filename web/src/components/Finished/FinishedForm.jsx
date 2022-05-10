import React, { useEffect, useState } from "react"
import goalsApi from "../../services/goalsApi"
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField
} from "@mui/material"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"

function FinishedForm({
  refetch,
  action,
  defaultDate,
  defaultNote,
  defaultGoalId
}) {
  const [date, setDate] = useState(defaultDate || new Date())
  const [note, setNote] = useState(defaultNote || "")
  const [goalId, setGoalId] = useState(defaultGoalId || 0)
  const [goals, setGoals] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data } = await goalsApi.get()
      setGoals(data)
    })()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await action(date, note, goalId)
    refetch()
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ mb: 1 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: 4 }}>
          <Grid container>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                onChange={(date) => setDate(new Date(date))}
                value={date}
                autoOk
                orientation="landscape"
                variant="static"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
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
            <FormControl fullWidth sx={{ m: 2 }}>
              <InputLabel id="goal-id-label">Goal</InputLabel>
              <Select
                labelId="goal-id-label"
                id="select-goal-id"
                value={goalId}
                label="Goal"
                onChange={(e) => setGoalId(e.target.value)}
              >
                {goals.map((goal) => (
                  <MenuItem key={goal.id} value={goal.id}>
                    {goal.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
    </>
  )
}

export default FinishedForm
