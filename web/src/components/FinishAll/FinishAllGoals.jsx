import React, {useEffect, useState} from "react"
import goalsApi from "../../services/goalsApi"

import FinishGoal from "./FinishGoal"

import finishedApi from "../../services/finishedApi"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns"
import {StaticDatePicker} from "@mui/x-date-pickers/StaticDatePicker"
import {Button, TextField, Typography} from "@mui/material"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'

const FinishAllGoals = (props) => {
  const [goals, setGoals] = useState([])
  const [date, setDate] = useState(new Date())
  const [finisheds, setFinisheds] = useState([])

  const mapGoalsToFinishedAndSetState = () => {
    (async () => {
      const {data: newGoals} = await goalsApi.get()
      setGoals(newGoals)
      const {data: newFinished} = await finishedApi.get(date)
      const finishedsMapped = newGoals.map((goal) => {
        if (newFinished.some((finished) => finished.goalId === goal.id)) {
          return {
            ...newFinished.find((finished) => finished.goalId === goal.id),
            checked: true
          }
        }
        return {goalId: goal.id, date: date, checked: false}
      })
      setFinisheds(finishedsMapped)
    })()
  }

  useEffect(() => {
    mapGoalsToFinishedAndSetState()
  }, [date])

  useEffect(() => {
    console.log("finisheds changed: ", {finisheds})
  }, [finisheds])

  useEffect(() => {
    console.log("date changed: ", {date})
  }, [date])

  const toggleChecked = (goalId) => {
    setFinisheds((oldFinisheds) => {
      return oldFinisheds.map((finished) => {
        if (finished.goalId === goalId) {
          return {...finished, checked: !finished.checked}
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
              date,
              newFinished.note,
              newFinished.goalId
            )
          }
        } else if (newFinished.checked) {
          finishedApi.post(
            date,
            newFinished.note,
            newFinished.goalId
          )
        }
        mapGoalsToFinishedAndSetState()
        toast.success("Saved finished! :)", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      } catch (e) {
        toast.error("Error while saving finished! :(", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        console.error(e)
      }
    })
  }

  return (
    <>
      <Typography variant="h5">Record finished goals</Typography>
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
      <ToastContainer/>
    </>
  )
}

export default FinishAllGoals
