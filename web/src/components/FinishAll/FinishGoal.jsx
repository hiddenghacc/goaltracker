import React, { useEffect } from "react"
import { Checkbox, FormControlLabel } from "@mui/material"

const FinishGoal = ({ goal, checked, toggleChecked }) => {
  useEffect(() => {
    console.log(checked)
  }, [checked])

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox checked={checked} onChange={() => toggleChecked(goal.id)} />
        }
        label={goal.name}
      />
    </div>
  )
}

export default FinishGoal
