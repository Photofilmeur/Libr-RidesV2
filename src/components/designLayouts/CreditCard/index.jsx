import React, { useState } from 'react'
import './style.css'
import ReturnLogo from '../../../assets/icons/return-svg.svg'
import ReturnLogoRed from '../../../assets/icons/return-svg-red.svg'

const CreditCardV2 = () => {
  const [number, setNumber] = useState(null)
  const [code, setCode] = useState(null)
  const [date, setDate] = useState(null)
  const [name, setName] = useState(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)


  const handleReturnClick = () => {
    setIsFlipped(!isFlipped) // Inverser l'état lors du clic sur le bouton
  }

  const handleCodeChange = (e) => {
    setCode(e.target.value)
  }

  // Formatted Code
  const handleKeyDown = (e) => {
    const isNumber = /^\d$/.test(e.key)
    const isControlKey = [
      'Backspace',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'Delete',
    ].includes(e.key)

    if (!isNumber && !isControlKey) {
      e.preventDefault()
    }
  }

  const handleNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '') // Supprime tout ce qui n'est pas un chiffre

    // Vérifie si l'entrée dépasse 16 chiffres
    if (value.length > 16) {
      return
    }

    // Formate le numéro en groupes de 4 chiffres
    const formattedValue = value.replace(/(.{4})/g, '$1 ').trim()

    setNumber(formattedValue)
  }

  const handleDateChange = (e) => {
    // Supprime tous les caractères non numériques
    let value = e.target.value.replace(/\D/g, '')

    // Limite la longueur de l'entrée à 4 chiffres pour MMYY
    if (value.length > 4) {
      value = value.slice(0, 4)
    }

    // Vérifie que les deux premiers chiffres représentent un mois valide
    if (value.length >= 2) {
      let month = parseInt(value.slice(0, 2), 10)

      if (month < 1 || month > 12) {
        return
      }

      // Formate la date avec un espace avant et après le slash
      value = value.slice(0, 2) + ' / ' + value.slice(2)
    }

    setDate(value)
  }

  const handleNameChange = (e) => {
    // Supprime tous les caractères non alphabétiques et les espaces multiples
    let value = e.target.value.replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, ' ')

    // Met tout le texte en majuscules
    value = value.toUpperCase()

    setName(value)
  }

  return (
    <div
      className={`card-container relative  max-w-xs ${
        isFlipped ? 'flipped' : ''
      } `}
    >
      <div
        className={`card-container-inner shadow-md rounded-2xl ${
          isFlipped ? 'flipped' : ''
        }`}
      >
        {/*                          FRONT                           */}

        <div className="card-container-front flex flex-col justify-around p-4 rounded-2xl">
        <img
            className="absolute top-[5px] left-[10px] h-[1em]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleReturnClick}
            src={isHovered ? ReturnLogoRed : ReturnLogo }
            alt="Return logo"
          />
          <div className="flex flex-row items-center justify-between ">
            <svg
              version="1.1"
              className="w-auto h-auto border-none outline-none pl-4 pt-7 "
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="35px"
              height="35px"
              viewBox="0 0 50 50"
            >
              {' '}
              <image
                id="image0"
                width="50"
                height="50"
                x="0"
                y="0"
                href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB6VBMVEUAAACNcTiVeUKVeUOY
              fEaafEeUeUSYfEWZfEaykleyklaXe0SWekSZZjOYfEWYe0WXfUWXe0WcgEicfkiXe0SVekSXekSW
              ekKYe0a9nF67m12ZfUWUeEaXfESVekOdgEmVeUWWekSniU+VeUKVeUOrjFKYfEWliE6WeESZe0GS
              e0WYfES7ml2Xe0WXeESUeEOWfEWcf0eWfESXe0SXfEWYekSVeUKXfEWxklawkVaZfEWWekOUekOW
              ekSYfESZe0eXekWYfEWZe0WZe0eVeUSWeETAnmDCoWLJpmbxy4P1zoXwyoLIpWbjvXjivnjgu3bf
              u3beunWvkFWxkle/nmDivXiWekTnwXvkwHrCoWOuj1SXe0TEo2TDo2PlwHratnKZfEbQrWvPrWua
              fUfbt3PJp2agg0v0zYX0zYSfgkvKp2frxX7mwHrlv3rsxn/yzIPgvHfduXWXe0XuyIDzzISsjVO1
              lVm0lFitjVPzzIPqxX7duna0lVncuHTLqGjvyIHeuXXxyYGZfUayk1iyk1e2lln1zYTEomO2llrb
              tnOafkjFpGSbfkfZtXLhvHfkv3nqxH3mwXujhU3KqWizlFilh06khk2fgkqsjlPHpWXJp2erjVOh
              g0yWe0SliE+XekShhEvAn2D///+gx8TWAAAARnRSTlMACVCTtsRl7Pv7+vxkBab7pZv5+ZlL/UnU
              /f3SJCVe+Fx39naA9/75XSMh0/3SSkia+pil/KRj7Pr662JPkrbP7OLQ0JFOijI1MwAAAAFiS0dE
              orDd34wAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IDx2lsiuJAAACLElEQVRIx2Ng
              GAXkAUYmZhZWPICFmYkRVQcbOwenmzse4MbFzc6DpIGXj8PD04sA8PbhF+CFaxEU8iWkAQT8hEVg
              OkTF/InR4eUVICYO1SIhCRMLDAoKDvFDVhUaEhwUFAjjSUlDdMiEhcOEItzdI6OiYxA6YqODIt3d
              I2DcuDBZsBY5eVTr4xMSYcyk5BRUOXkFsBZFJTQnp6alQxgZmVloUkrKYC0qqmji2WE5EEZuWB6a
              lKoKdi35YQUQRkFYPpFaCouKIYzi6EDitJSUlsGY5RWVRGjJLyxNy4ZxqtIqqvOxaVELQwZFZdkI
              JVU1RSiSalAt6rUwUBdWG1CP6pT6gNqwOrgCdQyHNYR5YQFhDXj8MiK1IAeyN6aORiyBjByVTc0F
              qBoKWpqwRCVSgilOaY2OaUPw29qjOzqLvTAchpos47u6EZyYnngUSRwpuTe6D+6qaFQdOPNLRzOM
              1dzhRZyW+CZouHk3dWLXglFcFIflQhj9YWjJGlZcaKAVSvjyPrRQ0oQVKDAQHlYFYUwIm4gqExGm
              BSkutaVQJeomwViTJqPK6OhCy2Q9sQBk8cY0DxjTJw0lAQWK6cOKfgNhpKK7ZMpUeF3jPa28BCET
              amiEqJKM+X1gxvWXpoUjVIVPnwErw71nmpgiqiQGBjNzbgs3j1nus+fMndc+Cwm0T52/oNR9lsdC
              S24ra7Tq1cbWjpXV3sHRCb1idXZ0sGdltXNxRateRwHRAACYHutzk/2I5QAAACV0RVh0ZGF0ZTpj
              cmVhdGUAMjAyMy0wMi0xM1QwODoxNToyOSswMDowMEUnN7UAAAAldEVYdGRhdGU6bW9kaWZ5ADIw
              MjMtMDItMTNUMDg6MTU6MjkrMDA6MDA0eo8JAAAAKHRFWHRkYXRlOnRpbWVzdGFtcAAyMDIzLTAy
              LTEzVDA4OjE1OjI5KzAwOjAwY2+u1gAAAABJRU5ErkJggg=="
              ></image>
            </svg>

            <div className="flex flex-col gap-5 items-end justify-center relative w-auto h-auto ">
              <p className="tracking-widest text-xs text-white ">MASTERCARD</p>
              <svg
                version="1.1"
                className=""
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25px"
                height="25px"
                viewBox="0 0 50 50"
              >
                {' '}
                <image
                  id="image0"
                  width="50"
                  height="50"
                  x="0"
                  y="0"
                  href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAQAAAC0NkA6AAAABGdBTUEAALGPC/xhBQAAACBjSFJN
              AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZ
              cwAACxMAAAsTAQCanBgAAAAHdElNRQfnAg0IEzgIwaKTAAADDklEQVRYw+1XS0iUURQ+f5qPyjQf
              lGRFEEFK76koKGxRbWyVVLSOgsCgwjZBJJYuKogSIoOonUK4q3U0WVBWFPZYiIE6kuArG3VGzK/F
              fPeMM/MLt99/NuHdfPd888/57jn3nvsQWWj/VcMlvMMd5KRTogqx9iCdIjUUmcGR9ImUYowyP3xN
              GQJoRLVaZ2DaZf8kyjEJALhI28ELioyiwC+Rc3QZwRYyO/DH51hQgWm6DMIh10KmD4u9O16K49it
              VoPOAmcGAWWOepXIRScAoJZ2Frro8oN+EyTT6lWkkg6msZfMSR35QTJmjU0g15tIGSJ08ZZMJkJk
              HpNZgSkyXosS13TkJpZ62mPIJvOSzC1bp8vRhhCakEk7G9/o4gmZdbpsTcKu0m63FbnBP9Qrc15z
              bkbemfgNDtEOI8NO5L5O9VYyRYgmJayZ9nPaxZrSjW4+F6Uw9yQqIiIZwhp2huQTf6OIvCZyGM6g
              DJBZbyXifJXr7FZjGXsdxADxI7HUJFB6iWvsIhFpkoiIiGTJfjJfiCuJg2ZEspq9EHGVpYgzKqwJ
              qSAOEwuJQ/pxPvE3cYltJCLdxBLiSKKIE5HxJKcTRNeadxfhDiuYw44zVs1dxKwRk/uCxIiQkxKB
              sSctRVAge9g1E15EHE6yRUaJecRxcWlukdRIbGFOSZCMWQA/iWauIP3slREHXPyliqBcrrD71Amz
              Z+rD1Mt2Yr8TZc/UR4/YtFnbijnHi3UrN9vKQ9rPaJf867ZiaqDB+czeKYmd3pNa6fuI75MiC0uX
              XSR5aEMf7s7a6r/PudVXkjFb/SsrCRfROk0Fx6+H1i9kkTGn/E1vEmt1m089fh+RKdQ5O+xNJPUi
              cUIjO0Dm7HwvErEr0YxeibL1StSh37STafE4I7zcBdRq1DiOkdmlTJVnkQTBTS7X1FYyvfO4piaI
              nKbDCDaT2anLudYXCRFsQBgAcIF2/Okwgvz5+Z4tsw118dzruvIvjhTB+HOuWy8UvovEH6beitBK
              xDyxm9MmISKCWrzB7bSlaqGlsf0FC0gMjzTg6GgAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjMtMDIt
              MTNUMDg6MTk6NTYrMDA6MDCjlq7LAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIzLTAyLTEzVDA4OjE5
              OjU2KzAwOjAw0ssWdwAAACh0RVh0ZGF0ZTp0aW1lc3RhbXAAMjAyMy0wMi0xM1QwODoxOTo1Nisw
              MDowMIXeN6gAAAAASUVORK5CYII="
                ></image>
              </svg>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            <input
              type="text"
              className="w-3/4 h-8 border-none outline-none text-sm bg-black text-white font-semibold text-base caret-red-500 pl-2 mb-1"
              value={number || ''}
              onChange={handleNumberChange}
              maxLength={19}
              placeholder="0000   0000    0000    0000"
            />

            <p className="text-white text-[0.5em] ml-5">EXPIRE A FIN</p>
            <input
              type="text"
              className="w-1/4 h-5 text-xs border-none outline-none text-sm bg-black text-white font-semibold caret-red-500 ml-5 "
              value={date || ''}
              onChange={handleDateChange}
              maxLength={7}
              placeholder="MM / YY"
            />

            <input
              type="text"
              className="w-2/4 h-8 border-none outline-none text-sm bg-black text-white font-light text-base caret-red-500 pl-2 "
              value={name || ''}
              onChange={handleNameChange}
              placeholder="NOM COMPLET"
            />
          </div>
          <svg
            className="LogoCircle"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="36"
            height="36"
            viewBox="0 0 48 48"
          >
            <path
              fill="#ff9800"
              d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
            ></path>
            <path
              fill="#d50000"
              d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
            ></path>
            <path
              fill="#ff3d00"
              d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
            ></path>
          </svg>
        </div>

        {/*                          BACK                           */}
        <div
          className="card-container-back p-4 rounded-2xl"
        >
          <img
            className="absolute top-[5px] left-[270px] h-[1em] transform scale-x-[-1]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleReturnClick}
            src={isHovered ? ReturnLogoRed : ReturnLogo }
            alt="Return logo"
          />
          <div className="bande"></div>
          <div className="mbande"></div>
          <div className="sbande">
            <input
              type="text"
              className="code"
              onChange={handleCodeChange}
              maxLength={3}
              placeholder="CCV"
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreditCardV2
