import {Configuration, OpenAIApi} from "openai"

const newOpenaiClient = () => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })

  return new OpenAIApi(configuration)
}

const openaiClient = () => {
  if (!global.openaiClient) {
    console.log("Creating new openai client")
    
    global.openaiClient = newOpenaiClient()
  }
  return global.openaiClient
}

export const resumeAnalysis = async (resume) => {
  const response = await openaiClient().createCompletion({
    model: "text-davinci-003",
    prompt: `
      Given a person's profile, provide the following details about them.
      ${resume} 
      Name:
      Email:
      Mobile: 
      City:
      State:
      Country:
      Top 5 skills they should learn to improve their profile as Improvements:
      Top 5 technical skills as Technical:
      Top 5 soft skills as Soft:
      Top 5 suitable designations when applying for a job details as Jobs:
    `,
    temperature: 0,
    max_tokens: 750,
  })
  return response.data.choices[0].text
}
