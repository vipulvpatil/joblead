import {Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const PersonaDataItemLine = ({personaDataValue}) => {
  if(personaDataValue){
    return <Typography variant="body2">{personaDataValue}</Typography>
  }
  return null
}

const PersonaDiv = ({personaData}) => {
  let displayJsx = <Typography variant="body2">Persona not found. Please begin by uploading a resume.</Typography>

  if(personaData) {
    displayJsx = (
      <>
        <PersonaDataItemLine personaDataValue={personaData["name"]}/>
        <PersonaDataItemLine personaDataValue={personaData["email"]}/>
        <PersonaDataItemLine personaDataValue={personaData["mobile"]}/>
        <PersonaDataItemLine personaDataValue={personaData["city"]}/>
        <PersonaDataItemLine personaDataValue={personaData["state"]}/>
        <PersonaDataItemLine personaDataValue={personaData["country"]}/>
        <PersonaDataItemLine personaDataValue={personaData["missing"]}/>
        <PersonaDataItemLine personaDataValue={personaData["technical"]}/>
        <PersonaDataItemLine personaDataValue={personaData["soft"]}/>
        <PersonaDataItemLine personaDataValue={personaData["jobs"]}/>
      </>
    )
  }

  return (
    <Stack direction="column" className={styles.personaStack} spacing={2}>
      {displayJsx}
    </Stack>
  )
}

export default PersonaDiv
