const { getNumber3decimal } = require('utils/convertors')

class ExcelService {
  constructor() {}
  /**
   * Function Excel Parse Normal Program
   *
   */
  parse1 = (data) => {
    return new Promise((resolve, reject) => {
      try {
        let rlt = []
        let style = {
          inputTypeRows: [],
          LTV: 0,
          Rates: 0
        }
        let row = ['', 'LTV']
        // LTV parse
        data.LTV.map((item, index) => {
          row.push(`${item.from} — ${item.to}`)
          return index
        })
        style.LTV = data.LTV.length + 2
        style.Rates = data.InterestRate.length
        rlt.push(row)
        // Income Documentation Parse
        data.IncomeDocs.map((item, index) => {
          let rows = []
          let { IncomeDocItems, LLPA } = item
          rows.push([`IncomeDocs — ${index + 1}`])
          style.inputTypeRows.push(rlt.length)
          LLPA.map((item1, index1) => {
            if (rows[index1 + 1] === undefined) rows.push([''])
            rows[index1 + 1][1] = `${item1.Item.from} — ${item1.Item.to}`
            item1.LLPA.map((item2, index2) => {
              rows[index1 + 1][2 + index2] = item2
              return index2
            })
            if (IncomeDocItems[index1] !== undefined) {
              rows[index1 + 1][0] = IncomeDocItems[index1]
            }
            return index1
          })
          rlt = [...rlt, ...rows]
          return index
        })
        // Input Label
        data.LLPAs.map((llpa) => {
          let rows = []
          rows.push([llpa.Name])
          style.inputTypeRows.push(rlt.length)
          llpa.Values.map((item, index) => {
            let { Item, LLPA } = item
            if (rows[index + 1] === undefined) rows.push([''])
            if (Item.from !== undefined) {
              if (Item.from == null) {
                Item = `${llpa.Name}<=${getNumber3decimal(Item.to)}`
              } else if (Item.to == null) {
                Item = `${getNumber3decimal(Item.from)}+`
              } else {
                Item = `${getNumber3decimal(Item.from)} — ${getNumber3decimal(
                  Item.to
                )}`
              }
            }
            rows[index + 1][1] = Item
            LLPA.map((item1, index1) => {
              rows[index + 1][index1 + 2] = item1
              return index1
            })
            return index
          })
          rlt = [...rlt, ...rows]
          return true
        })
        // Base Price
        rlt[0] = [...rlt[0], '', 'Rate', 'Arm', 'Fixed']
        data.InterestRate.map((item, index) => {
          if (rlt[index + 1].length < style.LTV) {
            for (let i = rlt[index + 1].length; i < style.LTV; i += 1) {
              rlt[index + 1].push('')
            }
          }
          rlt[index + 1] = [
            ...rlt[index + 1],
            '',
            item,
            data.ArmBasePrice[index],
            data.FixedBasePrice[index]
          ]
        })
        resolve({
          sheet: rlt,
          style
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
   * Function Excel Parse HardMoney Program
   *
   */
  parse2 = (data) => {
    return new Promise((resolve, reject) => {
      try {
        let rlt = []
        Object.keys(data).map((key) => {
          const {
            TierPricing,
            loanAmount,
            minDscr,
            monthsReserve,
            ficos,
            purchaseLTVs,
            purchaseLTCs,
            cashOutLTVs,
            cashOutLTCs,
            TierRates
          } = data[key]
          let row = [
            key,
            '',
            '',
            '',
            '',
            'No Income',
            '',
            '',
            '',
            '',
            '',
            TierPricing[1],
            TierPricing[2],
            TierPricing[3]
          ]
          rlt.push(row)
          row = [
            '',
            '',
            '',
            '',
            '',
            'Purch-R/T-Reno',
            '',
            'Cash Out Tier I',
            '',
            'Cash Out Tier II',
            ''
          ]
          rlt.push(row)
          row = [
            'Loan Amount',
            '',
            'Reserves',
            'Min DSCR',
            'FICO',
            'LTV',
            'LTC',
            'LTV',
            'LTC',
            'LTV',
            'LTC',
            'Rates Tier I',
            'Rates Tier II',
            'Rates Tier III'
          ]
          rlt.push(row)
          ficos.map((fico, index) => {
            row = [
              '',
              '',
              '',
              '',
              fico,
              purchaseLTVs[index],
              purchaseLTCs[index],
              cashOutLTVs.Tier1[index],
              cashOutLTCs.Tier1[index],
              cashOutLTVs.Tier2[index],
              cashOutLTCs.Tier2[index],
              TierRates.Tier1[index],
              TierRates.Tier2[index],
              TierRates.Tier3[index]
            ]
            if (index === 0) {
              row[0] = loanAmount.from
              row[1] = loanAmount.to
              row[2] = monthsReserve
              row[3] = minDscr
            }
            rlt.push(row)
          })
          rlt.push([])
        })
        resolve({
          sheet: rlt
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
   * Function Excel Parse FastMoney Program
   *
   */
  parse3 = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const { Investor, PrimarySecond } = data
        let rlt = []
        let row = [
          'Investor Only',
          '',
          '',
          '',
          '',
          '',
          'No Income',
          '',
          '',
          '',
          '',
          Investor.pricing
        ]
        rlt.push(row)
        row = [
          'Loan Amount',
          '',
          'Reserves',
          'Min Fico',
          'FICO',
          '',
          'Transaction',
          'AIV-LTV',
          'ARV-LTV',
          'LTC',
          'LTP',
          'Rates'
        ]
        rlt.push(row)
        row = [
          Investor.loanAmount.from,
          Investor.loanAmount.to,
          Investor.monthsReserve,
          Investor.minFico,
          Investor.rates.purchaseFixFlip.fico.from,
          Investor.rates.purchaseFixFlip.fico.to,
          'Purchase - Fix and Flip',
          Investor.rates.purchaseFixFlip.aiv_ltv,
          Investor.rates.purchaseFixFlip.arv_ltv,
          Investor.rates.purchaseFixFlip.ltc,
          Investor.rates.purchaseFixFlip.ltp,
          Investor.rates.purchaseFixFlip.rate
        ]
        rlt.push(row)
        row = [
          '',
          '',
          '',
          '',
          Investor.rates.purchaseAcquisition.fico.from,
          Investor.rates.purchaseAcquisition.fico.to,
          'Purchase Acquisiton Only',
          Investor.rates.purchaseAcquisition.aiv_ltv,
          Investor.rates.purchaseAcquisition.arv_ltv,
          Investor.rates.purchaseAcquisition.ltc,
          Investor.rates.purchaseAcquisition.ltp,
          Investor.rates.purchaseAcquisition.rate
        ]
        rlt.push(row)
        row = [
          '',
          '',
          '',
          '',
          Investor.rates.refinanceFixFlip.fico.from,
          Investor.rates.refinanceFixFlip.fico.to,
          'Refinance - Fix and Flip',
          Investor.rates.refinanceFixFlip.aiv_ltv,
          Investor.rates.refinanceFixFlip.arv_ltv,
          Investor.rates.refinanceFixFlip.ltc,
          Investor.rates.refinanceFixFlip.ltp,
          Investor.rates.refinanceFixFlip.rate
        ]
        rlt.push(row)
        row = [
          '',
          '',
          '',
          '',
          Investor.rates.refinance.fico.from,
          Investor.rates.refinance.fico.to,
          'Refinance',
          Investor.rates.refinance.aiv_ltv,
          Investor.rates.refinance.arv_ltv,
          Investor.rates.refinance.ltc,
          Investor.rates.refinance.ltp,
          Investor.rates.refinance.rate
        ]
        rlt.push(row)
        rlt.push([])
        row = [
          'Primary / Second',
          '',
          '',
          '',
          '',
          '',
          'No Income',
          '',
          PrimarySecond.pricing
        ]
        rlt.push(row)
        row = [
          'Loan Amount',
          '',
          'Reserves',
          'Min Fico',
          'FICO',
          '',
          'Transaction',
          'AIV-LTV',
          'Rates'
        ]
        rlt.push(row)
        row = [
          PrimarySecond.loanAmount.from,
          PrimarySecond.loanAmount.to,
          PrimarySecond.monthsReserve,
          PrimarySecond.minFico,
          PrimarySecond.rates.bridge1.fico.from,
          PrimarySecond.rates.bridge1.fico.to,
          'Bridge Loan',
          PrimarySecond.rates.bridge1.aiv_ltv,
          PrimarySecond.rates.bridge1.rate
        ]
        rlt.push(row)
        row = [
          '',
          '',
          '',
          '',
          PrimarySecond.rates.bridge2.fico.from,
          PrimarySecond.rates.bridge2.fico.to,
          'Bridge Loan',
          PrimarySecond.rates.bridge2.aiv_ltv,
          PrimarySecond.rates.bridge2.rate
        ]
        rlt.push(row)
        resolve({
          sheet: rlt
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
   * Function Excel Parse SoftMoney Program
   *
   */
  parse4 = (data) => {
    return new Promise((resolve, reject) => {
      try {
        const { SecondInvestor } = data
        let rlt = []
        let row = [
          'Second & Investor',
          '',
          '',
          '',
          '',
          'No Income',
          '',
          SecondInvestor.pricing
        ]
        rlt.push(row)
        row = [
          'Loan Amount',
          '',
          'Reserves',
          'Min Fico',
          'FICO',
          'Purch-R/T',
          'Cash Out',
          'Rates'
        ]
        rlt.push(row)
        const {
          loanAmount,
          minDscr,
          monthsReserve,
          ficos,
          purchaseLTVs,
          cashOutLTVs,
          rates
        } = SecondInvestor
        ficos.map((item, index) => {
          row = [
            '',
            '',
            '',
            '',
            item,
            purchaseLTVs[index],
            cashOutLTVs[index],
            rates[index]
          ]
          if (index === 0) {
            row[0] = loanAmount.from
            row[1] = loanAmount.to
            row[2] = monthsReserve
            row[3] = minDscr
          }
          rlt.push(row)
        })
        resolve({
          sheet: rlt
        })
      } catch (error) {
        reject(error)
      }
    })
  }
  /**
   * Function Excel Parse Commercial DSCR Program
   *
   */
  parse5 = (data) => {
    return new Promise((resolve, reject) => {
      try {
        let rlt = []
        Object.keys(data).map((key) => {
          const {
            loanAmount,
            minDscr,
            monthsReserve,
            ficos,
            ltvs,
            purchaseRates,
            refinanceRates,
            purchasePrice,
            refinancePrice
          } = data[key]
          let row = [
            key,
            '',
            '',
            '',
            '',
            'No Income',
            `${purchasePrice}`,
            `${refinancePrice}`
          ]
          rlt.push(row)
          row = [
            'Loan Amount',
            '',
            'Reserves',
            'Min DSCR',
            'FICO',
            'LTV',
            'Purchase Rates',
            'Refinance Rates'
          ]
          rlt.push(row)
          ficos.map((fico, index) => {
            row = [
              '',
              '',
              '',
              '',
              fico,
              ltvs[index],
              purchaseRates[index],
              refinanceRates[index]
            ]
            if (index === 0) {
              row[0] = loanAmount.from
              row[1] = loanAmount.to
              row[2] = monthsReserve
              row[3] = minDscr
            }
            rlt.push(row)
          })
          rlt.push([])
        })
        resolve({
          sheet: rlt
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default new ExcelService()
