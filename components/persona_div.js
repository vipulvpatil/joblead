import {Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const PersonaDiv = () => {
  return (
    <Stack direction="column" className={styles.personaStack} spacing={2}>
      <Typography variant="body2">Persona not found. Please begin by uploading a resume.</Typography>
    </Stack>
  )
}

export default PersonaDiv
