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

const betDetailData = [
  {
    id: 1,
    book: 110,
    amount: '900,450,700',
    odds: -250
  },
  {
    id: 2,
    book: -104,
    amount: '1200,950,250',
    odds: 290
  }
]

export { betsData, betDetailData }
