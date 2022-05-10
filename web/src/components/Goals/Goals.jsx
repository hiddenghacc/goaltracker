import React, { useEffect, useState } from "react"
import goalsApi from "../../services/goalsApi"
import Goal from "./Goal"
import GoalForm from "./GoalForm"
import { Container, Typography } from "@mui/material"

function Goals(props) {
  const [goals, setGoals] = useState([])

  const refetch = async () => {
    const { data } = await goalsApi.get()
    console.log({ data })
    setGoals(data)
  }

  const createGoal = async (name, note) => {
    await goalsApi.post(name, note)
  }

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div>
      <Typography variant="h5">Add new goal</Typography>
      <GoalForm refetch={refetch} action={createGoal} />
      {goals.map((goal) => (
        <Goal {...goal} key={goal.id} refetch={refetch} />
      ))}
    </div>
  )
}

export default Goals
