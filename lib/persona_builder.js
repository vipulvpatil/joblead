export const buildPersona = (personaData) => {
  const parts = personaData.split("\n")
  
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
