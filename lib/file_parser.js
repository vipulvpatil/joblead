import mammoth from "mammoth"

const identifyFileType = async (file) => {
  console.log(file)
  
  const data = await mammoth.extractRawText({path: file.filepath})
  console.log(data)
}

const FileParser = {
  identifyFileType
}

export default FileParser
