import React, { useEffect, useState } from "react"
import goalsApi from "../../services/goalsApi"

const FinishAllGoals = (props) => {
  const [goals, setGoals] = useState([])
  const [date, setDate] = useState(new Date())
  const [finisheds, setFinisheds] = useState([])

  useEffect(() => {
    ;(async () => {
      const { data: newGoals } = await goalsApi.get()
      setGoals(newGoals)
      const { data: newFinished } = await finishedApi.get(date)
      const finishedsMapped = newGoals.map((goal) => {
        if (newFinished.some((finished) => finished.goalId === goal.id)) {
          return {
            ...newFinished.find((finished) => finished.goalId === goal.id),
            checked: true
          }
        }
        return { goalId: goal.id, date: new Date(), checked: false }
      })
      setFinisheds(finishedsMapped)
    })()
  }, [date])

  useEffect(() => {
    console.log("finisheds changed: ", { finisheds })
  }, [finisheds])

  const toggleChecked = (goalId) => {
    setFinisheds((oldFinisheds) => {
      return oldFinisheds.map((finished) => {
        if (finished.goalId === goalId) {
          return { ...finished, checked: !finished.checked }
        }
        return finished
      })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    finisheds.forEach((newFinished) => {
      try {
        if (newFinished.id) {
          if (!newFinished.checked) {
            finishedApi.delete(newFinished.id)
          } else {
            finishedApi.update(
              newFinished.id,
              newFinished.date,
              newFinished.note,
              newFinished.goalId
            )
          }
        } else if (newFinished.checked) {
          finishedApi.post(
            newFinished.date,
            newFinished.note,
            newFinished.goalId
          )
        }
      } catch (e) {
        console.log(e)
      }
    })
  }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <StaticDatePicker
          onChange={(date) => setDate(new Date(date))}
          value={date}
          autoOk
          orientation="landscape"
          variant="static"
          renderInput={(params) => <TextField {...params} />}
        />
        {goals.map((goal) => (
          <FinishGoal
            key={goal.id}
            goal={goal}
            checked={
              finisheds.find((finished) => goal.id === finished.goalId)
                ?.checked || false
            }
            toggleChecked={toggleChecked}
          />
        ))}
        <Button variant="contained" onClick={handleSubmit}>
          Save all
        </Button>
      </LocalizationProvider>
    </>
  )
}
import FinishGoal from "./FinishGoal"

import finishedApi from "../../services/finishedApi"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker"
import { Button, TextField } from "@mui/material"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"

export default FinishAllGoals
