/*
 SettlementCompanyTypeB/index.js
*/

export default class {
  constructor() {
    this.url = window.location.origin
    this.endPoint = `${this.url}/assets/json/settlementCompanyTypeB.json`
    this.lists = document.querySelector('.fn-lists')
    this.freeWordBox = document.querySelector('.fn-free-word')
    this.searchCheckBoxWrapper = document.querySelector('.fn-search-checkbox-wrapper')
    this.searchButton = document.querySelector('.fn-search-button')
    this.paymentMethodDictionary = {
      電子マネー: 'electronic-money',
      クレジットカード: 'credit-card',
      その他: 'other-payment',
      QRコード: 'qr-code',
      Jデビット: 'j-debit'
    }
    this.periodPaymentRateDictionary = {
      '0.00%': 'low',
      '0.50%': 'second',
      '1.00%': 'third',
      '1.50%': 'fourth',
      '2.00%': 'fifth',
      '2.50%': 'sixth',
      '3.00%': 'seventh',
      '3.25%': 'high'
    }
    this.paymentTimingDictionary = {
      複数回: 'multiple',
      毎週: 'every-week',
      月次一括: 'monthly-summing-up',
      その他: 'other-timing'
    }
    this.iconDictionary = {
      電子マネー: 'icon_pay_ic',
      クレジットカード: 'icon_pay_cc',
      その他: 'icon_pay_other',
      QRコード: 'icon_pay_qr',
      Jデビット: 'icon_pay_d'
    }
    this.checkList = {
      paymentMethod: [],
      periodPaymentRate: [],
      paymentTiming: []
    }
    this.initializeData = []
    this.processingPaymentMethodCheckBoxData = []
    this.processingPeriodPaymentCheckBoxData = []
    this.processingPaymentTimingCheckBoxData = []
    this.processingFreeWordData = []
    this.concatenateSearchData = []
    this.processingData = []
  }

  resolvedPromise(arg) {
    return new Promise(resolve => resolve(arg))
  }

  async getData() {
    try {
      const getData = await fetch(this.endPoint)
      this.initializeData = await getData.json()
    } catch (error) {
      console.error('error: ', error)
    }
  }

  initializeList() {
    // '.fn-data-list' is Virtual DOM, Don't into Constructor.
    Array.from(document.querySelectorAll('.fn-data-list'), dataList => dataList.remove())
  }

  /*
  Render CheckBox 決済手段.
  */
  renderPaymentMethodCheckBox() {
    const createEachCheckBoxWrapperElement = document.createElement('dl')
    createEachCheckBoxWrapperElement.classList.add('each-checkbox-wrapper')
    createEachCheckBoxWrapperElement.innerHTML = `
      <dt class="each-checkbox-heading">決済手段</dt>
      <dd class="each-checkbox-data fn-checkbox-payment-method"></dd>
    `
    if (this.searchCheckBoxWrapper) {
      this.searchCheckBoxWrapper.appendChild(createEachCheckBoxWrapperElement)
    }
    const processingAry = this.initializeData.map(info => {
      return info.利用可能な決済手段
    })
    const paymentMethodAry = processingAry
      .join(',')
      .split(',')
      .filter((info, index, ary) => ary.indexOf(info) === index)
      .sort((previous, current) => {
        if (previous > current) return -1
        if (previous < current) return 1
        return 0
      })
    paymentMethodAry.map(info => {
      const createEachCheckBoxElement = document.createElement('span')
      createEachCheckBoxElement.classList.add('each-checkbox')
      createEachCheckBoxElement.innerHTML = `
        <input
         type="checkbox" id="${this.paymentMethodDictionary[info]}"
         class="checkbox-input checkbox-input-payment-method fn-checkbox-input fn-checkbox-input-payment-method">
        <label for="${this.paymentMethodDictionary[info]}" class="checkbox-label">${info}</label>
      `
      if (document.querySelector('.fn-checkbox-payment-method')) {
        document.querySelector('.fn-checkbox-payment-method').appendChild(createEachCheckBoxElement)
      }
    })
  }

  /*
  Render CheckBox 入金タイミング.
  */
  renderPaymentTimingCheckBox() {
    const createEachCheckBoxWrapperElement = document.createElement('dl')
    createEachCheckBoxWrapperElement.classList.add('each-checkbox-wrapper')
    createEachCheckBoxWrapperElement.innerHTML = `
      <dt class="each-checkbox-heading">入金タイミング</dt>
      <dd class="each-checkbox-data fn-checkbox-payment-timing"></dd>
    `
    if (this.searchCheckBoxWrapper) {
      this.searchCheckBoxWrapper.appendChild(createEachCheckBoxWrapperElement)
    }
    const processingAry = this.initializeData.map(info => {
      return info.入金タイミング
    })
    const paymentTimingAry = processingAry
      .filter((info, index, ary) => ary.indexOf(info) === index)
      .sort((previous, current) => {
        if (previous > current) return -1
        if (previous < current) return 1
        return 0
      })
    paymentTimingAry.map(info => {
      const createEachCheckBoxElement = document.createElement('span')
      createEachCheckBoxElement.classList.add('each-checkbox')
      createEachCheckBoxElement.innerHTML = `
        <input
         type="checkbox" id="${this.paymentTimingDictionary[info]}"
         class="checkbox-input checkbox-input-payment-timing fn-checkbox-input fn-checkbox-input-payment-timing">
        <label for="${this.paymentTimingDictionary[info]}" class="checkbox-label">${info}</label>
      `
      if (document.querySelector('.fn-checkbox-payment-timing')) {
        document.querySelector('.fn-checkbox-payment-timing').appendChild(createEachCheckBoxElement)
      }
    })
  }

  /*
  Render CheckBox 手数料.
  */
  renderPeriodPaymentRateCheckBox() {
    const createEachCheckBoxWrapperElement = document.createElement('dl')
    createEachCheckBoxWrapperElement.classList.add('each-checkbox-wrapper')
    createEachCheckBoxWrapperElement.innerHTML = `
      <dt class="each-checkbox-heading">手数料</dt>
      <dd class="each-checkbox-data fn-checkbox-period-payment-rate"></dd>
    `
    if (this.searchCheckBoxWrapper) {
      this.searchCheckBoxWrapper.appendChild(createEachCheckBoxWrapperElement)
    }
    const processingAry = this.initializeData.map(info => {
      return info.利用料率
    })
    const periodPaymentRateAry = processingAry
      .filter((info, index, ary) => ary.indexOf(info) === index)
      .sort((previous, current) => {
        if (previous < current) return -1
        if (previous > current) return 1
        return 0
      })
    periodPaymentRateAry.map(info => {
      const createEachCheckBoxElement = document.createElement('span')
      createEachCheckBoxElement.classList.add('each-checkbox')
      createEachCheckBoxElement.innerHTML = `
        <input
         type="checkbox"
         id="${this.periodPaymentRateDictionary[info]}"
         class="checkbox-input checkbox-input-period-payment-rate fn-checkbox-input fn-checkbox-input-period-payment-rate">
        <label for="${this.periodPaymentRateDictionary[info]}" class="checkbox-label">${info}</label>
      `
      if (document.querySelector('.fn-checkbox-period-payment-rate')) {
        document.querySelector('.fn-checkbox-period-payment-rate').appendChild(createEachCheckBoxElement)
      }
    })
  }

  /*
  Render Data Table (Core)
  */
  render(addData) {
    let renderData = ''
    if (addData.length > 0) {
      addData.map(info => {
        // prettier-ignore
        renderData += `
        <a href="${this.url}/franchise/settlement-company-typeB-detail.html?dataID=${info.dataID}" class="data-list fn-data-list">
          <dl class="data-list-heading">
            <dt class="data-list-heading-logo">
              <img src="/assets/img/${info.ロゴ画像}" class="data-list-heading-logo-image" />
            </dt>
            <dd class="data-list-heading-letter">${info.決済事業者}</dd>
          </dl>
          <dl class="data-list-payment-method">
            <dt class="data-list-payment-method-heading">
              <span class="heading-cube"></span>
              <span class="heading-letter">利用可能な決済手段</span>
            </dt>
            <dd class="data-list-payment-method-icon">
              ${info.利用可能な決済手段.length > 0 ? info.利用可能な決済手段.map(paymentMethodInfo => `<span class="icon-inner"><img src="/assets/img/${this.iconDictionary[paymentMethodInfo]}.svg" class="icon-image"></span>`).toString().replace(/,/g, '') : ''}
            </dd>
          </dl>
          <div class="data-list-rate-timing">
            <dl class="data-list-rate">
              <dt class="data-list-rate-heading">
                <span class="heading-cube"></span>
                <span class="heading-letter">利用料率</span>
              </dt>
              <dd class="data-list-rate-letter">
                ${info.利用料率}
              </dd>
            </dl>
            <dl class="data-list-timing">
              <dt class="data-list-timing-heading">
                <span class="heading-cube"></span>
                <span class="heading-letter">入金<br class="display-mobile">タイミング</span>
              </dt>
              <dd class="data-list-timing-letter">
                ${info.入金タイミング}
              </dd>
            </dl>
          </div>
        </a>
      `
      })
    } else {
      renderData = `
      <div class="data-list fn-data-list no-data">
        該当データが有りません。
      </div>
    `
    }
    if (this.lists) {
      this.lists.innerHTML = renderData
    }
  }

  /*
  Searching CheckBox 決済手段.
  */
  searchPaymentMethodCheckBox() {
    if (this.searchCheckBoxWrapper) {
      const checkBoxPaymentMethodSelectors = document.querySelectorAll('.fn-checkbox-input-payment-method')
      this.processingPaymentMethodCheckBoxData = this.initializeData
      Array.from(checkBoxPaymentMethodSelectors, selector => {
        selector.addEventListener('change', () => {
          this.checkList.paymentMethod = []
          Array.from(checkBoxPaymentMethodSelectors)
            .filter(checkSelector => {
              if (checkSelector.checked) return checkSelector
            })
            .map(activeCheckBox => {
              Object.keys(this.paymentMethodDictionary).filter(keyInfo => {
                if (this.paymentMethodDictionary[keyInfo] === activeCheckBox.id) {
                  this.checkList.paymentMethod.push(keyInfo)
                }
              })
            })
          this.processingPaymentMethodCheckBoxData = this.initializeData.filter(dataInfo => {
            if (this.checkList.paymentMethod.length === 0) {
              return dataInfo
            }
            for (let i = 0; i < this.checkList.paymentMethod.length; i++) {
              if (dataInfo.利用可能な決済手段.includes(this.checkList.paymentMethod[i])) {
                return dataInfo
              }
            }
          })
        })
      })
    }
  }

  /*
  Searching CheckBox 入金タイミング.
  */
  searchPaymentTimingCheckBox() {
    if (this.searchCheckBoxWrapper) {
      const checkBoxPaymentTimingSelectors = document.querySelectorAll('.fn-checkbox-input-payment-timing')
      this.processingPaymentTimingCheckBoxData = this.initializeData
      Array.from(checkBoxPaymentTimingSelectors, selector => {
        selector.addEventListener('change', () => {
          this.checkList.paymentTiming = []
          Array.from(checkBoxPaymentTimingSelectors)
            .filter(checkSelector => {
              if (checkSelector.checked) return checkSelector
            })
            .map(activeCheckBox => {
              Object.keys(this.paymentTimingDictionary).filter(keyInfo => {
                if (this.paymentTimingDictionary[keyInfo] === activeCheckBox.id) {
                  this.checkList.paymentTiming.push(keyInfo)
                }
              })
            })
          this.processingPaymentTimingCheckBoxData = this.initializeData.filter(dataInfo => {
            if (this.checkList.paymentTiming.length === 0) {
              return dataInfo
            }
            for (let i = 0; i < this.checkList.paymentTiming.length; i++) {
              if (dataInfo.入金タイミング.includes(this.checkList.paymentTiming[i])) {
                return dataInfo
              }
            }
          })
        })
      })
    }
  }

  /*
  Searching CheckBox 利用料率.
  */
  searchPeriodPaymentRateCheckBox() {
    if (this.searchCheckBoxWrapper) {
      const checkBoxPeriodPaymentRateSelectors = document.querySelectorAll('.fn-checkbox-input-period-payment-rate')
      this.processingPeriodPaymentCheckBoxData = this.initializeData
      Array.from(checkBoxPeriodPaymentRateSelectors, selector => {
        selector.addEventListener('change', () => {
          this.checkList.periodPaymentRate = []
          Array.from(checkBoxPeriodPaymentRateSelectors)
            .filter(checkSelector => {
              if (checkSelector.checked) return checkSelector
            })
            .map(activeCheckBox => {
              Object.keys(this.periodPaymentRateDictionary).filter(keyInfo => {
                if (this.periodPaymentRateDictionary[keyInfo] === activeCheckBox.id) {
                  this.checkList.periodPaymentRate.push(keyInfo)
                }
              })
            })
          this.processingPeriodPaymentCheckBoxData = this.initializeData.filter(dataInfo => {
            if (this.checkList.periodPaymentRate.length === 0) {
              return dataInfo
            }
            for (let i = 0; i < this.checkList.periodPaymentRate.length; i++) {
              if (dataInfo.利用料率 === this.checkList.periodPaymentRate[i]) {
                return dataInfo
              }
            }
          })
        })
      })
    }
  }

  /*
  Search Free Word.
  */
  searchFreeWord() {
    if (this.freeWordBox) {
      this.processingFreeWordData = this.initializeData
      this.freeWordBox.addEventListener('keyup', event => {
        const getValue = event.currentTarget.value.toLowerCase()
        this.processingFreeWordData = this.initializeData.filter(info => {
          if (
            info.決済事業者.toLowerCase().includes(getValue) ||
            info.利用可能な決済手段.map(paymentMethodInfo => paymentMethodInfo.toLowerCase().includes(getValue)).includes(true) ||
            info.利用料率.toLowerCase().includes(getValue) ||
            info.入金タイミング.toLowerCase().includes(getValue)
          ) {
            return info
          }
        })
      })
    }
  }

  /*
  Search Core.
  */
  searchData() {
    this.searchButton.addEventListener('click', () => {
      this.concatenateSearchCheckBoxData = [
        this.processingPaymentMethodCheckBoxData,
        this.processingPeriodPaymentCheckBoxData,
        this.processingPaymentTimingCheckBoxData,
        this.processingFreeWordData
      ]
      this.processingData = this.concatenateSearchCheckBoxData.reduce((accumulator, current) => {
        return [...accumulator, ...current].filter((info, index, array) => {
          return array.indexOf(info) === index && index !== array.lastIndexOf(info)
        })
      }, this.initializeData)
      this.initializeList()
      this.render(this.processingData)
    })
  }

  /*
  Require.
  */
  async core() {
    await this.resolvedPromise(this.getData())
    this.renderPaymentMethodCheckBox()
    this.renderPeriodPaymentRateCheckBox()
    this.renderPaymentTimingCheckBox()
    this.render(this.initializeData)
    this.searchPaymentMethodCheckBox()
    this.searchPeriodPaymentRateCheckBox()
    this.searchPaymentTimingCheckBox()
    this.searchFreeWord()
    this.searchData()
  }
}
