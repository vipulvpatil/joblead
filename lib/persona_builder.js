import {textCompletion} from "@/lib/openai"

const personaKeysAndPrompt = [
  {
    "key": "name",
    "prompt": "Name",
  },
  {
    "key": "email",
    "prompt": "Email",
  },
  {
    "key": "phone",
    "prompt": "Phone",
  },
  {
    "key": "city",
    "prompt": "City",
  },
  {
    "key": "state",
    "prompt": "State",
  },
  {
    "key": "country",
    "prompt": "Country",
  },
  {
    "key": "missing",
    "prompt": "Top 5 technical skills that are not in this profile",
  },
  {
    "key": "technical",
    "prompt": "Top 5 technical skills present in this profile",
  },
  {
    "key": "soft",
    "prompt": "Top 5 soft skills present in this profile",
  },
  {
    "key": "jobs",
    "prompt": "Top 5 suitable designations when applying for a job",
  },
]

const personaPromptKeyPairs = personaKeysAndPrompt.map(element => {
  return [element["prompt"], element["key"]]
})

const promptToPersonaKeyMapping = Object.fromEntries(personaPromptKeyPairs)

export const analyseResume = async (resume) => {
  const promptIntro = "Given a person's profile, provide the following details about them."

  const promptKeys = personaKeysAndPrompt.map((element) => {
    return element["prompt"]
  })

  const requestPrompt = promptKeys.join(":\n")

  const resumeAnalysisPrompt = `${promptIntro}\n\n${resume}\n\n${requestPrompt}:\n`

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

  const normalisedPersonaObject = normalisePersonaObject(personaObject)

  return normalisedPersonaObject
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

const normalisePersonaObject = (personaData) => {
  const normalisedObject = {}
  for (const key in personaData) {
    normalisedObject[promptToPersonaKeyMapping[key]] = personaData[key]
  }
  console.log(normalisedObject)
  return normalisedObject
}
