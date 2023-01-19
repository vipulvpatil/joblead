import parseDocX from "./parse_docx"
import parsePdf from "./parse_pdf"

const parseFuncMapping = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": parseDocX,
  "application/pdf": parsePdf,
}


const parse = async (file) => {
  const parseFunc = parseFuncMapping[file.mimetype]
  const result = {}

  if(parseFunc) {
    try {
      const data = await parseFunc(file.filepath)
      result["data"] = data  
    } catch (err) {
      result["err"] = err.toString()
    }
  } else {
    result["err"] = `Unknown file type: ${file.mimetype}. Please try pdf or docx.`
  }
  return result
}

const FileParser = {
  parse
}

export default FileParser
