import pkg from 'lodash';
import fs from 'fs';

const { intersection, split, toLower, trim } = pkg;

// Function to read the JSON file
const readContactsFromFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// Function to calculate similarity score between two strings
const calculateSimilarity = (a, b) => {
  a = toLower(trim(a));
  b = toLower(trim(b));

  const maxLength = Math.max(a.length, b.length);
  const matches = intersection(split(a, ''), split(b, '')).length;
  return matches / maxLength;
};

// Function to identify potential duplicate contacts
function findDuplicates(contacts) {
  const duplicates = [];

  for (let i = 0; i < contacts.length; i++) {
    for (let j = i + 1; j < contacts.length; j++) {
      const contactA = contacts[i];
      const contactB = contacts[j];

      const nameA = toLower(trim(contactA.name));
      const nameB = toLower(trim(contactB.name));
      const emailA = toLower(trim(contactA.email));
      const emailB = toLower(trim(contactB.email));

      // Check if names are identical, contain one another, or if emails are identical
      const isNameSimilar =
        nameA === nameB || nameA.includes(nameB) || nameB.includes(nameA);
      const isEmailSimilar = emailA === emailB;

      if (isNameSimilar || isEmailSimilar) {
        duplicates.push({
          contacts: [contactA, contactB],
          score: calculateScore(contactA, contactB),
        });
      }
    }
  }

  return duplicates;
}

// Basic function to calculate the similarity score between two contacts
function calculateScore(contactA, contactB) {
  let score = 0;
  if (toLower(contactA.name) === toLower(contactB.name)) score += 0.5;
  if (toLower(contactA.email) === toLower(contactB.email)) score += 0.5;
  return score;
}

// Read contacts from JSON file and find duplicates
const contacts = readContactsFromFile('./contacts.json');
const duplicates = findDuplicates(contacts);
console.log('Potential Duplicates:', duplicates);

export default findDuplicates;
