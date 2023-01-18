import parseDocX from "./parse_docx"

const parseFuncMapping = {
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": parseDocX
//text/rtf
//application/pdf
}


const parse = async (file) => {
  console.log(file)
  
  const parseFunc = parseFuncMapping[file.mimetype]
  
  if(parseFunc) {
    const data = await parseFunc(file)
    console.log(data)
  }
}

const FileParser = {
  parse
}

export default FileParser
