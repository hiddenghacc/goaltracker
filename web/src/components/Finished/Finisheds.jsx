import React, { useEffect, useState } from "react"
import finishedApi from "../../services/finishedApi"
import Finished from "./Finished"
import FinishedForm from "./FinishedForm"
import { Typography } from "@mui/material"

function Finisheds(props) {
  const [finished, setFinished] = useState([])

  const refetch = async () => {
    const { data } = await finishedApi.get()
    console.log({ data })
    setFinished(data)
  }

  const createFinished = async (date, note, goalId) => {
    await finishedApi.post(date, note, goalId)
  }

  useEffect(() => {
    refetch()
  }, [])

  return (
    <div>
      <Typography variant="h5">Add new finished</Typography>
      <FinishedForm refetch={refetch} action={createFinished} />
      {finished.map((finished) => (
        <Finished finished={finished} key={finished.id} refetch={refetch} />
      ))}
    </div>
  )
}

export default Finisheds
