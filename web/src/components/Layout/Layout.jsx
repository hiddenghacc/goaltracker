import React, { useState } from "react"
import { ThemeProvider } from "@emotion/react"
import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography
} from "@mui/material"
import { Outlet } from "react-router-dom"
import RestoreIcon from "@mui/icons-material/Restore"
import FavoriteIcon from "@mui/icons-material/Favorite"
import LocationOnIcon from "@mui/icons-material/LocationOn"
import { useNavigate } from "react-router"

/*
*
*
      <Link to="/finished">finished</Link>
      <br />
      <Link to="/goals">goals</Link>
      <br />
      <Link to="/all">all</Link>
* */

function Layout(props) {
  const [value, setValue] = useState(0)
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={{}}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Goal Tracker
          </Typography>
        </Toolbar>
      </AppBar>
      <main style={{ marginBottom: 100 }}>
        <Container maxWidth="sm" sx={{ mb: 1, mt: 5 }}>
          <Outlet />
        </Container>
      </main>
      {/* Footer */}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
            navigate(newValue)
          }}
        >
          <BottomNavigationAction
            label="Record All"
            value="all"
            icon={<RestoreIcon />}
          />
          <BottomNavigationAction
            label="Finished"
            value="finished"
            icon={<FavoriteIcon />}
          />
          <BottomNavigationAction
            label="Goals"
            value="goals"
            icon={<LocationOnIcon />}
          />
        </BottomNavigation>
      </Paper>
      {/* End footer */}
    </ThemeProvider>
  )
}

export default Layout
