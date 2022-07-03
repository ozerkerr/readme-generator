// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

//  An array of questions for user input
const questions = [
  {
    type: 'input',
    message: 'What is your project title?',
    name: 'title'
  },
  {
    type: 'input',
    message: "Please enter project description.",
    name: 'description'
  },
  {
    type: 'input',
    message: "Please enter installation instructions.",
    name: 'installation'
  },
  {
    type: 'input',
    message: "Please enter usage information.",
    name: 'usage'
  },
  {
    type: 'input',
    message: "Please enter contribution guidelines.",
    name: 'contributing'
  },
  {
    type: 'input',
    message: "Please enter test instructions.",
    name: 'tests'
  },
  {
    type: 'list',
    message: "Please choose license you want to have.",
    name: 'license',
    choices: ['Mozilla', 'MIT', 'ISC', 'Apache', 'IBM']
  }
];

// Function that calls inquirer with questions
const promptUser = () => {
  return inquirer.prompt(questions)
}

const generateLicenseLink = (license) => {
  switch (license) {
    case 'Mozilla':
      return `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
    case 'MIT':
      return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
    case 'ISC':
      return `[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)`;
    case 'Apache':
      return `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
    case 'IBM':
      return `[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)`;
  }
}

// Function that generates readme file
const generateHTML = ({
  title,
  description,
  installation,
  usage,
  contributing,
  tests,
  license
}) =>
  `# ${title} ${license}

  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [Tests](#tests)


  ## Description
    ${description}
  --------------
  ## Installation
    ${installation}
  --------------
  ## Usage
    ${usage}
  --------------
  ## Contributing
    ${contributing}
  --------------
  ## Tests
    ${tests}
  `;



// Function that writes README file
function writeToFile(fileName, data) {
  console.log(data)
  fs.writeFileSync(fileName, generateHTML(data))
}
/*
code generator
code generator creates cod
npm install codegen
you can use to create template
download play and open pr
npm run test
*/

// TODO: Create a function to initialize app
function init() {
  promptUser()
    .then((answers) => {
      const generatedLink = generateLicenseLink(answers.license);
      answers.license = generatedLink;
      writeToFile('generatedREADME.md', answers);
    })
    .then(() => console.log('Successfully wrote to generatedREADME.md'))
    .catch((err) => console.error(err));
}

// Function call to initialize app
init();
