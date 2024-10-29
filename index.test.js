import findDuplicates from './index';

describe('findDuplicates', () => {
  it('should identify duplicates based on name and email similarity', () => {
    const testContacts = [
      {
        contactID: 1,
        name: 'Alice',
        name1: 'Smith',
        email: 'alice@example.com',
        postalZip: 12345,
        address: '123 Main St.',
      },
      {
        contactID: 2,
        name: 'Alicia',
        name1: 'Smithe',
        email: 'alice@example.com',
        postalZip: 12345,
        address: '123 Main Street',
      },
      {
        contactID: 3,
        name: 'Bob',
        name1: 'Jones',
        email: 'bob@example.com',
        postalZip: 67890,
        address: '456 Park Ave',
      },
    ];

    const duplicates = findDuplicates(testContacts);
    expect(duplicates).toEqual([
      {
        contacts: [testContacts[0], testContacts[1]],
        score: expect.any(Number),
      },
    ]);
  });

  it('should return an empty array when there are no duplicates', () => {
    const testContacts = [
      {
        contactID: 1,
        name: 'Alice',
        email: 'alice@example.com',
      },
      {
        contactID: 2,
        name: 'Bob',
        email: 'bob@example.com',
      },
    ];

    const duplicates = findDuplicates(testContacts);
    expect(duplicates).toEqual([]);
  });

  it('should handle cases with different casing', () => {
    const testContacts = [
      {
        contactID: 1,
        name: 'alice',
        email: 'alice@example.com',
      },
      {
        contactID: 2,
        name: 'Alice',
        email: 'ALICE@example.com',
      },
    ];

    const duplicates = findDuplicates(testContacts);
    expect(duplicates).toEqual([
      {
        contacts: [testContacts[0], testContacts[1]],
        score: expect.any(Number),
      },
    ]);
  });

  it('should identify partial matches', () => {
    const testContacts = [
      {
        contactID: 1,
        name: 'Charlie',
        email: 'charlie@example.com',
      },
      {
        contactID: 2,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
      },
    ];

    const duplicates = findDuplicates(testContacts);
    expect(duplicates).toEqual([
      {
        contacts: [testContacts[0], testContacts[1]],
        score: expect.any(Number),
      },
    ]);
  });
});
