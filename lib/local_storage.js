const savePersona = (personaData) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("persona", JSON.stringify(personaData))
  }
}

const loadPersona = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem("persona"))
  }
  return null
}

export {savePersona, loadPersona}
