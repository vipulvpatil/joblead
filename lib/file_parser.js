import parseDocX from "./parse_docx"

const parseFuncMapping = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": parseDocX
//text/rtf
//application/pdf
}


const parse = async (file) => {
  console.log(file)
  const parseFunc = parseFuncMapping[file.mimetype]
  const result = {}

  if(parseFunc) {
    try {
      const data = await parseFunc(file)
      result["data"] = data  
    } catch (err) {
      result["err"] = err
    }
  } else {
    result["err"] = `Unable to parse file of mime type: ${file.mimetype}`
  }
  return result
}

const FileParser = {
  parse
}

export default FileParser
