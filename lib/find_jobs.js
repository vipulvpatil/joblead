
import getUserLocale from "get-user-locale"

const findJobsByKeywords = async(keywordsList, city) => {
  const url = "/api/search_job?"
  const query = {
    localeCode: getUserLocale().replace(/-/,"_"),
    affid: "95a5757afc5d25b39970d6d5e368f5d3",
    userAgent: window.navigator.userAgent,
    keywords : keywordsList.join(","),
    location : city,
  }
  try{
    const requestUrl = url + new URLSearchParams(query)
    const response = await fetch(requestUrl)
    const responseJson = await response.json()
    if(responseJson) {
      return {
        error: responseJson["error"],
        result: responseJson["result"]?responseJson["result"]["jobs"]:null
      } 
    }
    return {
      error: "API failed for URL: " + requestUrl,
      result: null
    }
  } catch (err) {
    console.log(err)
    return {
      error: err,
      result: null
    }
  }
}

const findJobsForPersona = async(persona) => {
  if (!persona) {
    return {
      error: "Persona not found. Please begin by uploading a resume.",
      status: "complete",
      result: null
    }
  }
  try{
    const jobs = await findJobsByKeywords(
        [persona["technical"][0], persona["jobs"][0]], 
        persona["city"]
      )
    return Object.assign({status: "complete"}, jobs)
  } catch(err) {
    console.log(err)
    return {
      error: "error searching",
      status: "complete",
      result: null
    }
  }
}

export default findJobsForPersona
