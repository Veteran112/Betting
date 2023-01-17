const availableUsersData = {
  totalUsers: 6,
  totalPages: 2,
  usersData: [
    {
      id: 1,
      firstName: 'user1',
      lastName: 'user11',
      email: 'user1.test.io',
      status: 'active'
    },
    {
      id: 2,
      firstName: 'user2',
      lastName: 'user21',
      email: 'user2.test.io',
      status: 'active'
    },
    {
      id: 3,
      firstName: 'user3',
      lastName: 'user31',
      email: 'user3.test.io',
      status: 'active'
    },
    {
      id: 4,
      firstName: 'user4',
      lastName: 'user41',
      email: 'user4.test.io',
      status: 'active'
    },
    {
      id: 5,
      firstName: 'user4',
      lastName: 'user41',
      email: 'user4.test.io',
      status: 'active'
    },
    {
      id: 6,
      firstName: 'user4',
      lastName: 'user41',
      email: 'user4.test.io',
      status: 'active'
    }
  ]
}

const bettingProvidersData = {
  total: 3,
  totalPages: 1,
  data: [
    {
      id: 1,
      name: 'xxx',
      url: 'aaaaaa'
    },
    {
      id: 2,
      name: 'yyyxxx',
      url: 'bbbaaaaaa'
    }
  ]
}

const providersData = {
  total: 4,
  totalPages: 1,
  data: [
    {
      id: 1,
      command: '[NAVIGATE] https://bet123/login'
    },
    {
      id: 2,
      command: '[USERNAME] FFFFFFFFFF'
    },
    {
      id: 3,
      command: '[PASSWORD] FFFFFFFFFF'
    },
    {
      id: 4,
      command: '[NAVIGATE] https://bet123/quotes'
    }
  ]
}

const betsData = {
  total: 3,
  totalPages: 1,
  data: [
    {
      id: 1,
      percent: 1.5,
      date: '09-02-22 08:45AM',
      event: 'BASEBALL xxx vs. xxx',
      books: [+110, +110, +110, -140, -140, -140],
      market: 'fffff'
    },
    {
      id: 1,
      percent: 1.4,
      date: '09-02-22 08:45AM',
      event: 'BASEBALL xxx vs. xxx',
      books: [+110, +110, +110, -140, -140, -140],
      market: 'fffff'
    },
    {
      id: 1,
      percent: 1.2,
      date: '09-02-22 08:45AM',
      event: 'BASEBALL xxx vs. xxx',
      books: [+110, +110, +110, -140, -140, -140],
      market: 'fffff'
    }
  ]
}

const betDetailData = {
  total: 2,
  totalPages: 1,
  data: [
    {
      id: 1,
      books: [+110, +110, +110]
    },
    {
      id: 1,
      books: [-104, -104, 120]
    }
  ]
}

export {
  availableUsersData,
  bettingProvidersData,
  providersData,
  betsData,
  betDetailData
}
