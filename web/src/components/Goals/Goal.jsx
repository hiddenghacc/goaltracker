import React, { useState } from "react"
import goalsApi from "../../services/goalsApi"
import GoalForm from "./GoalForm"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CloseIcon from "@mui/icons-material/Close"
import { Button, Typography } from "@mui/material"

function Goal({ name, note, id, refetch }) {
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = async () => {
    await goalsApi.delete(id)
    refetch()
  }

  const handleUpdate = async (name, note) => {
    await goalsApi.update(id, name, note)
    setShowEdit(false)
  }

  return (
    <div>
      <Typography variant="h5">{name}</Typography>
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
        <>
          <GoalForm
            refetch={refetch}
            action={handleUpdate}
            defaultName={name}
            defaultNote={note}
          />
        </>
      )}
    </div>
  )
}

export default Goal
