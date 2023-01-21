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
        <PersonaDataItemLine personaDataValue={personaData["Name"]}/>
        <PersonaDataItemLine personaDataValue={personaData["Email"]}/>
        <PersonaDataItemLine personaDataValue={personaData["Mobile"]}/>
        <PersonaDataItemLine personaDataValue={personaData["City"]}/>
        <PersonaDataItemLine personaDataValue={personaData["State"]}/>
        <PersonaDataItemLine personaDataValue={personaData["Top 5 technical skills that are not in this profile"]}/>
        <PersonaDataItemLine personaDataValue={personaData["Top 5 technical skills present in this profile"]}/>
        <PersonaDataItemLine personaDataValue={personaData["Top 5 soft skills present in this profile"]}/>
        <PersonaDataItemLine personaDataValue={personaData["Top 5 suitable designations when applying for a job"]}/>
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
