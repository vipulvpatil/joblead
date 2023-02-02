import {buildPersona} from "../../lib/persona_builder"

describe("buildPersona", () => {
  it("correctly parses persona data if each key value pair is only one line", () => {
    const personaData = "\n\nName: Vipul Patil\nEmail: vipulvpatil@gmail.com\nPhone:9876543210\nCity:Metropolis\nState:New York\nCountry:Canada\nTop 5 technical skills that are not in this profile: React, Javascript, Coffeescript, Python, Django\nTop 5 technical skills present in this profile: Go, NodeJS, Ruby on Rails, Xcode, ObjC\nTop 5 soft skills present in this profile: Problem-solving, Communication, Teamwork, Time Management, Leadership\nTop 5 suitable designations when applying for a job: Senior Software Engineer, Backend Developer, iOS Developer, Flash Programmer, Game Programmer"
    const persona = buildPersona(personaData)
    expect(persona["name"]).toBe("Vipul Patil")
    expect(persona["email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["phone"]).toBe("9876543210")
    expect(persona["city"]).toBe("Metropolis")
    expect(persona["state"]).toBe("New York")
    expect(persona["country"]).toBe("Canada")
    expect(persona["missing"]).toStrictEqual(["React", "Javascript", "Coffeescript", "Python", "Django"])
    expect(persona["technical"]).toStrictEqual(["Go", "NodeJS", "Ruby on Rails", "Xcode", "ObjC"])
    expect(persona["soft"]).toStrictEqual(["Problem-solving", "Communication", "Teamwork", "Time Management", "Leadership"])
    expect(persona["jobs"]).toStrictEqual(["Senior Software Engineer", "Backend Developer", "iOS Developer", "Flash Programmer", "Game Programmer"])
  })

  it("correctly parses persona data if some values are empty", () => {
    const personaData = "\n\nName: Vipul Patil\nEmail: vipulvpatil@gmail.com\nPhone:\nCity:\nState:\nCountry:\nTop 5 technical skills that are not in this profile: React, Javascript, Coffeescript, Python, Django\nTop 5 technical skills present in this profile: Go, NodeJS, Ruby on Rails, Xcode, ObjC\nTop 5 soft skills present in this profile: Problem-solving, Communication, Teamwork, Time Management, Leadership\nTop 5 suitable designations when applying for a job: Senior Software Engineer, Backend Developer, iOS Developer, Flash Programmer, Game Programmer"
    const persona = buildPersona(personaData)

    expect(persona["name"]).toBe("Vipul Patil")
    expect(persona["email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["phone"]).toBe("")
    expect(persona["city"]).toBe("")
    expect(persona["state"]).toBe("")
    expect(persona["country"]).toBe("")
    expect(persona["missing"]).toStrictEqual(["React", "Javascript", "Coffeescript", "Python", "Django"])
    expect(persona["technical"]).toStrictEqual(["Go", "NodeJS", "Ruby on Rails", "Xcode", "ObjC"])
    expect(persona["soft"]).toStrictEqual(["Problem-solving", "Communication", "Teamwork", "Time Management", "Leadership"])
    expect(persona["jobs"]).toStrictEqual(["Senior Software Engineer", "Backend Developer", "iOS Developer", "Flash Programmer", "Game Programmer"])
  })

  it("correctly parses persona data while skipping new lines", () => {
    const personaData = "\n\nName: Vipul Patil\n\n\nEmail: vipulvpatil@gmail.com\nPhone:\nCity:\n\n\nState:\nCountry:\nTop 5 technical skills that are not in this profile: React, Javascript, Coffeescript, Python, Django\n\n\nTop 5 technical skills present in this profile: Go, NodeJS, Ruby on Rails, Xcode, ObjC\nTop 5 soft skills present in this profile: Problem-solving, Communication, Teamwork, Time Management, Leadership\nTop 5 suitable designations when applying for a job: Senior Software Engineer, Backend Developer, iOS Developer, Flash Programmer, Game Programmer"
    const persona = buildPersona(personaData)

    expect(persona["name"]).toBe("Vipul Patil")
    expect(persona["email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["phone"]).toBe("")
    expect(persona["city"]).toBe("")
    expect(persona["state"]).toBe("")
    expect(persona["country"]).toBe("")
    expect(persona["missing"]).toStrictEqual(["React", "Javascript", "Coffeescript", "Python", "Django"])
    expect(persona["technical"]).toStrictEqual(["Go", "NodeJS", "Ruby on Rails", "Xcode", "ObjC"])
    expect(persona["soft"]).toStrictEqual(["Problem-solving", "Communication", "Teamwork", "Time Management", "Leadership"])
    expect(persona["jobs"]).toStrictEqual(["Senior Software Engineer", "Backend Developer", "iOS Developer", "Flash Programmer", "Game Programmer"])
  })

  it("correctly parses persona data if some key value pairs are spread across multiple lines", () => {
    const personaData = "\nName: Vipul Patil\nEmail: vipulvpatil@gmail.com\nPhone:\nCity:\nState:\nCountry:\nTop 5 technical skills that are not in this profile: \n1. Machine Learning\n2. Cloud Computing\n3. Data Science\n4. Artificial Intelligence\n5. Blockchain\n\nTop 5 technical skills present in this profile: \n1. Go\n2. NodeJS\n3. Ruby on Rails\n4. Xcode\n5. ObjC\n\nTop 5 soft skills present in this profile: \n1. Communication\n2. Problem Solving\n3. Teamwork\n4. Leadership\n5. Time Management\n\nTop 5 suitable designations when applying for a job:\n1. Senior Software Engineer\n2. Software Architect\n3. Software Developer\n4. Technical Lead\n5. Software Consultant"
    const persona = buildPersona(personaData)

    expect(persona["name"]).toBe("Vipul Patil")
    expect(persona["email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["phone"]).toBe("")
    expect(persona["city"]).toBe("")
    expect(persona["state"]).toBe("")
    expect(persona["country"]).toBe("")
    expect(persona["missing"]).toStrictEqual(["Machine Learning","Cloud Computing","Data Science","Artificial Intelligence","Blockchain"])
    expect(persona["technical"]).toStrictEqual(["Go","NodeJS","Ruby on Rails","Xcode","ObjC"])
    expect(persona["soft"]).toStrictEqual(["Communication","Problem Solving","Teamwork","Leadership","Time Management"])
    expect(persona["jobs"]).toStrictEqual(["Senior Software Engineer","Software Architect","Software Developer","Technical Lead","Software Consultant"])
  })

  it("this was a failing realworld case", () => {
    const personaData = "\nName: Vipul Patil\nEmail: vipulvpatil@gmail.com\nPhone: +91 9876543210\nCity: Dehradun\nState: Uttarakhand\nCountry: India\nTop 5 technical skills that are not in this profile:\n1. Java\n2. Python\n3. C++\n4. AWS\n5. Kubernetes\nTop 5 technical skills present in this profile:\n1. React JS\n2. React Native\n3. TypeScript\n4. Node.JS\n5. MongoDB\nTop 5 soft skills present in this profile:\n1. Collaboration\n2. Problem Solving\n3. Communication\n4. Teamwork\n5. Leadership\nTop 5 suitable designations when applying for a job:\n1. Senior Software Engineer\n2. Software Engineer II\n3. Product Engineer\n4. Lead Front End Developer\n5. Front End Developer"
    const persona = buildPersona(personaData)
    expect(persona["name"]).toBe("Vipul Patil")
    expect(persona["email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["phone"]).toBe("+91 9876543210")
    expect(persona["city"]).toBe("Dehradun")
    expect(persona["state"]).toBe("Uttarakhand")
    expect(persona["country"]).toBe("India")
    expect(persona["missing"]).toStrictEqual(["Java", "Python", "C++", "AWS", "Kubernetes"])
    expect(persona["technical"]).toStrictEqual(["React JS", "React Native", "TypeScript", "Node.JS", "MongoDB"])
    expect(persona["soft"]).toStrictEqual(["Collaboration", "Problem Solving", "Communication", "Teamwork", "Leadership"])
    expect(persona["jobs"]).toStrictEqual(["Senior Software Engineer", "Software Engineer II", "Product Engineer", "Lead Front End Developer", "Front End Developer"])
  })

  it("another realworld failing case", () => {
    const personaData = "\\nName: Vipul Patil\\nEmail: vipulvpatil@gmail.com\\nPhone: (123)-456-7890\\nCity: Fort Worth\\nState: Texas\\nCountry: USA\\nTop 5 technical skills that are not in this profile:\\n1. Programming\\n2. Networking\\n3. Database Management\\n4. Cloud Computing\\n5. Cyber Security\\nTop 5 technical skills present in this profile:\\n1. Blockchain Analysis\\n2. Bi-lingual\\n3. Crypto\\n4. Licenses: 7, 63, SIE\\n5. Data Analysis and Visualization\\nTop 5 soft skills present in this profile:\\n1. Communication\\n2. Problem Solving\\n3. Collaboration\\n4. Adaptability\\n5. Time Management\\nTop 5 suitable designations when applying for a job:\\n1. Financial Operations Analyst\\n2. Blockchain Institutional Transactional Analyst\\n3. Financial Representative\\n4. Ultra High Net Worth & High Net Worth Representative\\n5. Public Relations"
    const persona = buildPersona(personaData)
    expect(persona["name"]).toBe("Vipul Patil")
    expect(persona["email"]).toBe("vipulvpatil@gmail.com")
    expect(persona["phone"]).toBe("(123)-456-7890")
    expect(persona["city"]).toBe("Fort Worth")
    expect(persona["state"]).toBe("Texas")
    expect(persona["country"]).toBe("USA")
    expect(persona["missing"]).toStrictEqual(["Programming","Networking","Database Management","Cloud Computing","Cyber Security",])
    expect(persona["technical"]).toStrictEqual(["Blockchain Analysis","Bi-lingual","Crypto",])
    expect(persona["soft"]).toStrictEqual(["Communication", "Problem Solving","Collaboration","Adaptability","Time Management",])
    expect(persona["jobs"]).toStrictEqual(["Financial Operations Analyst","Blockchain Institutional Transactional Analyst","Financial Representative","Ultra High Net Worth & High Net Worth Representative","Public Relations",])
  })
})
