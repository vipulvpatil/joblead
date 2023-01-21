import {Stack, Typography} from "@mui/material"
import styles from "@/styles/Home.module.css"

const PersonaDataItemSingleValue = ({title, personaDataValue}) => {
  if(personaDataValue){
    return (
      <>
        <Typography variant="h5" className={styles.personaDataTitle}>{title}</Typography>
        <Typography variant="body2" className={styles.personaDataValue}>{personaDataValue}</Typography>
      </>
    )
  }
  return null
}

const PersonaDataItemMultipleValues = ({title, personaDataValues}) => {
  if(personaDataValues && personaDataValues.length > 0){
    return (
      <>
        <Typography variant="h5" className={styles.personaDataTitle}>{title}</Typography>
        {
          personaDataValues.slice(0,3).map((personaDataValue, index) => {
            return <Typography variant="body2" className={styles.personaDataValue} key={index}>*{personaDataValue}</Typography>
          })
        }  
      </>
    )
  }
  return null
}

const PersonaDiv = ({personaData}) => {
  let displayJsx = <Typography variant="body2">Persona not found. Please begin by uploading a resume.</Typography>
  if(personaData) {
    displayJsx = (
      <>
        <PersonaDataItemSingleValue title="Name" personaDataValue={personaData["name"]}/>
        <PersonaDataItemSingleValue title="Email" personaDataValue={personaData["email"]}/>
        <PersonaDataItemSingleValue title="Mobile" personaDataValue={personaData["mobile"]}/>
        <PersonaDataItemSingleValue title="City" personaDataValue={personaData["city"]}/>
        <PersonaDataItemSingleValue title="State" personaDataValue={personaData["state"]}/>
        <PersonaDataItemSingleValue title="Country" personaDataValue={personaData["country"]}/>
        <PersonaDataItemMultipleValues title="Technical Skills" personaDataValues={personaData["technical"]}/>
        <PersonaDataItemMultipleValues title="Soft Skills" personaDataValues={personaData["soft"]}/>
        <PersonaDataItemMultipleValues title="Recommended job positions" personaDataValues={personaData["jobs"]}/>
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
