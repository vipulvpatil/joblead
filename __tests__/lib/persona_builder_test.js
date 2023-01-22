import {buildPersona} from "../../lib/persona_builder"

describe("buildPersona", () => {
  it("correctly parses persona data if each key value pair is only one line", () => {
    const personaData = "\n\nName: Vipul Patil\nEmail: vipulvpatil@gmail.com\nMobile:9876543210\nCity:Metropolis\nState:New York\nCountry:Canada\nImprovements: React, Javascript, Coffeescript, Python, Django\nTechnical: Go, NodeJS, Ruby on Rails, Xcode, ObjC\nSoft: Problem-solving, Communication, Teamwork, Time Management, Leadership\nJobs: Senior Software Engineer, Backend Developer, iOS Developer, Flash Programmer, Game Programmer"
    const persona = buildPersona(personaData)
    expect(persona["Name"]).toBe("Vipul Patil")
    expect(persona["Email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["Mobile"]).toBe("9876543210")
    expect(persona["City"]).toBe("Metropolis")
    expect(persona["State"]).toBe("New York")
    expect(persona["Country"]).toBe("Canada")
    expect(persona["Improvements"]).toStrictEqual(["React", "Javascript", "Coffeescript", "Python", "Django"])
    expect(persona["Technical"]).toStrictEqual(["Go", "NodeJS", "Ruby on Rails", "Xcode", "ObjC"])
    expect(persona["Soft"]).toStrictEqual(["Problem-solving", "Communication", "Teamwork", "Time Management", "Leadership"])
    expect(persona["Jobs"]).toStrictEqual(["Senior Software Engineer", "Backend Developer", "iOS Developer", "Flash Programmer", "Game Programmer"])
  })

  it("correctly parses persona data if some values are empty", () => {
    const personaData = "\n\nName: Vipul Patil\nEmail: vipulvpatil@gmail.com\nMobile:\nCity:\nState:\nCountry:\nImprovements: React, Javascript, Coffeescript, Python, Django\nTechnical: Go, NodeJS, Ruby on Rails, Xcode, ObjC\nSoft: Problem-solving, Communication, Teamwork, Time Management, Leadership\nJobs: Senior Software Engineer, Backend Developer, iOS Developer, Flash Programmer, Game Programmer"
    const persona = buildPersona(personaData)

    expect(persona["Name"]).toBe("Vipul Patil")
    expect(persona["Email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["Mobile"]).toBe("")
    expect(persona["City"]).toBe("")
    expect(persona["State"]).toBe("")
    expect(persona["Country"]).toBe("")
    expect(persona["Improvements"]).toStrictEqual(["React", "Javascript", "Coffeescript", "Python", "Django"])
    expect(persona["Technical"]).toStrictEqual(["Go", "NodeJS", "Ruby on Rails", "Xcode", "ObjC"])
    expect(persona["Soft"]).toStrictEqual(["Problem-solving", "Communication", "Teamwork", "Time Management", "Leadership"])
    expect(persona["Jobs"]).toStrictEqual(["Senior Software Engineer", "Backend Developer", "iOS Developer", "Flash Programmer", "Game Programmer"])
  })

  it("correctly parses persona data while skipping new lines", () => {
    const personaData = "\n\nName: Vipul Patil\n\n\nEmail: vipulvpatil@gmail.com\nMobile:\nCity:\n\n\nState:\nCountry:\nImprovements: React, Javascript, Coffeescript, Python, Django\n\n\nTechnical: Go, NodeJS, Ruby on Rails, Xcode, ObjC\nSoft: Problem-solving, Communication, Teamwork, Time Management, Leadership\nJobs: Senior Software Engineer, Backend Developer, iOS Developer, Flash Programmer, Game Programmer"
    const persona = buildPersona(personaData)

    expect(persona["Name"]).toBe("Vipul Patil")
    expect(persona["Email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["Mobile"]).toBe("")
    expect(persona["City"]).toBe("")
    expect(persona["State"]).toBe("")
    expect(persona["Country"]).toBe("")
    expect(persona["Improvements"]).toStrictEqual(["React", "Javascript", "Coffeescript", "Python", "Django"])
    expect(persona["Technical"]).toStrictEqual(["Go", "NodeJS", "Ruby on Rails", "Xcode", "ObjC"])
    expect(persona["Soft"]).toStrictEqual(["Problem-solving", "Communication", "Teamwork", "Time Management", "Leadership"])
    expect(persona["Jobs"]).toStrictEqual(["Senior Software Engineer", "Backend Developer", "iOS Developer", "Flash Programmer", "Game Programmer"])
  })

  it("correctly parses persona data if some key value pairs are spread across multiple lines", () => {
    const personaData = "\nName: Vipul Patil\nEmail: vipulvpatil@gmail.com\nMobile:\nCity:\nState:\nCountry:\nImprovements: \n1. Machine Learning\n2. Cloud Computing\n3. Data Science\n4. Artificial Intelligence\n5. Blockchain\n\nTechnical: \n1. Go\n2. NodeJS\n3. Ruby on Rails\n4. Xcode\n5. ObjC\n\nSoft: \n1. Communication\n2. Problem Solving\n3. Teamwork\n4. Leadership\n5. Time Management\n\nJobs: \n1. Senior Software Engineer\n2. Software Architect\n3. Software Developer\n4. Technical Lead\n5. Software Consultant"
    const persona = buildPersona(personaData)

    expect(persona["Name"]).toBe("Vipul Patil")
    expect(persona["Email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["Mobile"]).toBe("")
    expect(persona["City"]).toBe("")
    expect(persona["State"]).toBe("")
    expect(persona["Country"]).toBe("")
    expect(persona["Improvements"]).toStrictEqual(["Machine Learning","Cloud Computing","Data Science","Artificial Intelligence","Blockchain"])
    expect(persona["Technical"]).toStrictEqual(["Go","NodeJS","Ruby on Rails","Xcode","ObjC"])
    expect(persona["Soft"]).toStrictEqual(["Communication","Problem Solving","Teamwork","Leadership","Time Management"])
    expect(persona["Jobs"]).toStrictEqual(["Senior Software Engineer","Software Architect","Software Developer","Technical Lead","Software Consultant"])
  })
})
