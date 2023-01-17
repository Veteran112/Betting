const availableUsersData = {
  totalUsers: 6,
  totalPages: 2,
  usersData: [
    {
      id: 1,
      fname: 'user1',
      lname: 'user11',
      email: 'user1.test.io',
      status: 'active'
    },
    {
      id: 2,
      fname: 'user2',
      lname: 'user21',
      email: 'user2.test.io',
      status: 'active'
    },
    {
      id: 3,
      fname: 'user3',
      lname: 'user31',
      email: 'user3.test.io',
      status: 'active'
    },
    {
      id: 4,
      fname: 'user4',
      lname: 'user41',
      email: 'user4.test.io',
      status: 'active'
    },
    {
      id: 5,
      fname: 'user4',
      lname: 'user41',
      email: 'user4.test.io',
      status: 'active'
    },
    {
      id: 6,
      fname: 'user4',
      lname: 'user41',
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
      id: 2,
      percent: 1.4,
      date: '09-02-22 08:45AM',
      event: 'BASEBALL xxx vs. xxx',
      books: [+110, +110, +110, -140, -140, -140],
      market: 'fffff'
    },
    {
      id: 3,
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
      id: 2,
      books: [-104, -104, 120]
    }
  ]
}

const betHistoryData = {
  total: 3,
  totalPages: 1,
  data: [
    {
      id: 1,
      date: '09-02-22 08:45AM',
      event: 'BASEBALL xxx vs. xxx',
      odds: [-250, 290],
      stake: [900.0, 323.08],
      payout: [1260.0, 1260.0],
      profit: 36.92
    },
    {
      id: 2,
      date: '09-02-22 08:45AM',
      event: 'BASEBALL xxx vs. xxx',
      odds: [-250, 290],
      stake: [900.0, 323.08],
      payout: [1260.0, 1260.0],
      profit: 36.92
    },
    {
      id: 3,
      date: '09-02-22 08:45AM',
      event: 'BASEBALL xxx vs. xxx',
      odds: [-250, 290],
      stake: [900.0, 323.08],
      payout: [1260.0, 1260.0],
      profit: 36.92
    }
  ]
}

export {
  availableUsersData,
  bettingProvidersData,
  providersData,
  betsData,
  betDetailData,
  betHistoryData
}
