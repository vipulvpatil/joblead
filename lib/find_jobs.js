const findJobs = async(persona) => {
  if (!persona) {
    return {
      error: "Persona not found. Please begin by uploading a resume.",
      status: "complete",
      result: null
    }
  }
  const url = "/api/search_job?"
  try{
    const query = {
      localeCode: "en_US",
      affid: "95a5757afc5d25b39970d6d5e368f5d3",
      userIp: "49.37.168.142",
      userAgent: window.navigator.userAgent,
      keywords : persona["technical"][0],
      location : persona["city"],
    }
    const response = await fetch(url+ new URLSearchParams(query))
    const responseJson = await response.json()
    console.log(responseJson)
    return {
      error: responseJson["error"],
      status: "complete",
      result: responseJson["result"]["jobs"]
    }
  } catch(err) {
    console.log(err)
    return {
      error: "error searching",
      status: "complete",
      result: null
    }
  }
}

export default findJobs
