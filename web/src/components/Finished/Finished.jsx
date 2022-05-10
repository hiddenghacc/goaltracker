import React, { useState } from "react"
import finishedApi from "../../services/finishedApi"
import FinishedForm from "./FinishedForm"
import { Button, Typography } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from "@mui/icons-material/Edit"

function Finished({ finished, refetch }) {
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = async () => {
    await finishedApi.delete(finished.id)
    refetch()
  }

  const handleUpdate = async (date, note, goalId) => {
    await finishedApi.update(finished.id, date, note, goalId)
    setShowEdit(false)
  }

  return (
    <div>
      <Typography variant="h5">{finished.note}</Typography>
      <Typography variant="h5">{finished.date}</Typography>
      <Button
        variant="contained"
        size="small"
        color="error"
        onClick={handleDelete}
      >
        <DeleteIcon fontSize="small" />
        delet this
      </Button>
      <Button
        variant="contained"
        size="small"
        color="secondary"
        onClick={() => setShowEdit((prev) => !prev)}
      >
        {showEdit ? (
          <>
            <CloseIcon />
            close edit
          </>
        ) : (
          <>
            <EditIcon fontSize="small" />
            edit this
          </>
        )}
      </Button>
      {showEdit && (
        <FinishedForm
          refetch={refetch}
          action={handleUpdate}
          defaultNote={finished.note}
          defaultDate={finished.date}
          defaultGoalId={finished.goalId}
        />
      )}
    </div>
  )
}

export default Finished
