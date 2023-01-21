import {textCompletion} from "@/lib/openai"

export const analyseResume = async (resume) => {
  const resumeAnalysisPrompt = `
Given a person's profile, provide the following details about them.\n\n${resume}\n\nName:\nEmail:\nMobile: \nCity:\nState:\nCountry:\nTop 5 technical skills that are not in this profile:\nTop 5 technical skills present in this profile:\nTop 5 soft skills present in this profile:\nTop 5 suitable designations when applying for a job:\n`

  const result = await textCompletion(resumeAnalysisPrompt)
  return result
}

export const buildPersona = (analysedResume) => {
  const parts = analysedResume.split("\n")
  
  const blankSkippedParts = parts.filter((part) => {
    return part != ""
  })

  const listOfKeyValuePair = convertToKeyValuePairsIncludingMultilineValues(blankSkippedParts)
  
  const personaObject = Object.fromEntries(listOfKeyValuePair)

  return personaObject
}

const hasOnlyKey = (partsSplitByColon) => {
  if(partsSplitByColon.length == 2 && partsSplitByColon[1] === " ") {
    return true
  }
  return false
}

const accumulateValuesAsListFromIndex = (list, index) => {
  const accumulator = []
  while(index < list.length) {
    const element = list[index]
    if(!element.includes(":")) {
      accumulator.push(element.replace(/^\d*. /, ""))
    } else {
      break
    }
    index++
  }
  return accumulator
}

const convertToKeyValuePairsIncludingMultilineValues = (list) => {
  const keyValuePairs = []
  let index = 0
  while (index < list.length) {
    const element = list[index]
    const partsSplitByColon = element.split(":")
    if(hasOnlyKey(partsSplitByColon)){
      const accumulatedValues = accumulateValuesAsListFromIndex(list, index+1)
      if(accumulatedValues.length == 0) {
        keyValuePairs.push([partsSplitByColon[0], ""])
      } else {
        keyValuePairs.push([partsSplitByColon[0], accumulatedValues])
      }
      index += accumulatedValues.length + 1
    } else {
      const key = partsSplitByColon[0].trim()
      const valuesSplitByCommas = partsSplitByColon[1].split(",")
      const values = valuesSplitByCommas.map((value) => {
        return value.trim()
      })
      if(values.length === 1) {
        keyValuePairs.push([key, values[0]])
      } else {
        keyValuePairs.push([key, values])
      }
      index++
    }
  }
  return keyValuePairs
}
