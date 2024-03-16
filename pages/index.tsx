import Layout from 'components/layout/IndexLayout';
import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

const Home: NextPage = () => {

  return (<>
    <link rel="stylesheet" href="/plugins/swiper/swiper.min.css" />
	  <link rel="stylesheet" href="/plugins/carouselTicker/carouselTicker.css" />
    <link rel="stylesheet" href="/css/style.css" />
    <Head>
      <title>Battlemon</title>
    </Head>
    <Layout>
      <svg width="0" height="0" className="hidden" style={{display: 'none'}}>
        <symbol viewBox="0 0 18 14" xmlns="http://www.w3.org/2000/svg" id="steam">
          <path
            d="M9.99046 4.17792L9.99145 4.23L7.4106 7.97932C6.99265 7.9602 6.57339 8.0337 6.17522 8.19752C6.00189 8.26796 5.8364 8.35634 5.68146 8.46121L0.0138026 6.12526C0.0138026 6.12526 -0.117382 8.28289 0.429112 9.89073L4.43586 11.5441C4.63363 12.4432 5.25329 13.2317 6.16368 13.6107C6.87991 13.9083 7.68497 13.9095 8.40205 13.6139C9.11913 13.3184 9.68959 12.7503 9.98815 12.0345C10.1474 11.6532 10.2243 11.2426 10.2136 10.8295L13.9029 8.19093L13.9936 8.19258C16.2036 8.19258 18 6.39093 18 4.17792C18 1.96491 16.2069 0.169852 13.9936 0.165237C11.7845 0.165237 9.98716 1.96491 9.98716 4.17792H9.99046ZM9.37079 11.7754C8.89154 12.9291 7.56914 13.472 6.41979 12.993C5.90975 12.7787 5.49634 12.3843 5.25824 11.8849L6.56251 12.4254C6.76399 12.5093 6.98003 12.5527 7.19827 12.553C7.41651 12.5533 7.63268 12.5107 7.83443 12.4275C8.03618 12.3442 8.21955 12.2221 8.37407 12.0679C8.52859 11.9138 8.65123 11.7308 8.73497 11.5292C8.90455 11.122 8.90556 10.6641 8.73776 10.2562C8.56997 9.8482 8.2471 9.52353 7.84008 9.35347L6.48868 8.79478C7.0088 8.59701 7.60012 8.59042 8.15321 8.82016C8.71355 9.05187 9.14204 9.48828 9.37145 10.0463C9.60086 10.6043 9.59954 11.2197 9.36815 11.7754M13.9972 6.85271C13.289 6.85079 12.6105 6.56828 12.1102 6.06706C11.6099 5.56583 11.3286 4.88676 11.328 4.17858C11.3288 3.47051 11.6101 2.79161 12.1104 2.29052C12.6107 1.78944 13.2891 1.50702 13.9972 1.50511C14.7054 1.50685 15.384 1.78919 15.8844 2.29029C16.3848 2.79139 16.6663 3.4704 16.6671 4.17858C16.6664 4.88687 16.3851 5.56605 15.8847 6.06729C15.3842 6.56853 14.7055 6.85096 13.9972 6.85271ZM11.9971 4.17429C11.9967 3.6422 12.2075 3.1317 12.5833 2.755C12.9591 2.37829 13.4691 2.16619 14.0012 2.16532C15.107 2.16532 16.0065 3.06515 16.0065 4.17429C16.0068 4.7065 15.7957 5.21703 15.4196 5.59363C15.0436 5.97023 14.5334 6.18209 14.0012 6.18261C13.4691 6.18183 12.9592 5.96986 12.5833 5.59328C12.2075 5.2167 11.9969 4.70633 11.9971 4.17429Z" />
        </symbol>
        <symbol viewBox="0 0 35 27" xmlns="http://www.w3.org/2000/svg" id="discord">
          <path
            d="M29.6483 2.26124C27.3827 1.20487 24.9602 0.43715 22.4276 0C22.1165 0.56041 21.7531 1.31417 21.5026 1.91379C18.8103 1.5103 16.1428 1.5103 13.5 1.91379C13.2495 1.31417 12.8779 0.56041 12.5641 0C10.0287 0.43715 7.60339 1.2077 5.33778 2.26684C0.768021 9.14854 -0.470766 15.8593 0.148628 22.4748C3.17953 24.7304 6.11685 26.1006 9.00459 26.9972C9.71759 26.0193 10.3535 24.9798 10.9013 23.8842C9.85797 23.4891 8.85869 23.0016 7.91448 22.4356C8.16498 22.2506 8.41 22.0573 8.64672 21.8583C14.4057 24.5427 20.663 24.5427 26.3532 21.8583C26.5927 22.0573 26.8376 22.2506 27.0854 22.4356C26.1384 23.0044 25.1364 23.4919 24.0931 23.887C24.6409 24.9798 25.274 26.0221 25.9898 27C28.8803 26.1034 31.8203 24.7332 34.8512 22.4748C35.578 14.8058 33.6097 8.15662 29.6483 2.26124ZM11.6859 18.4063C9.95709 18.4063 8.53935 16.798 8.53935 14.8394C8.53935 12.8808 9.92682 11.2696 11.6859 11.2696C13.445 11.2696 14.8627 12.878 14.8324 14.8394C14.8351 16.798 13.445 18.4063 11.6859 18.4063ZM23.314 18.4063C21.5852 18.4063 20.1675 16.798 20.1675 14.8394C20.1675 12.8808 21.5549 11.2696 23.314 11.2696C25.0731 11.2696 26.4908 12.878 26.4605 14.8394C26.4605 16.798 25.0731 18.4063 23.314 18.4063Z" />
        </symbol>
        <symbol viewBox="0 0 22 20" xmlns="http://www.w3.org/2000/svg" id="telegram">
          <path
            d="M21.1607 1.47935L17.3004 17.3902C17.1187 18.1395 16.2785 18.5256 15.5897 18.1698L10.7074 15.6492L8.39879 19.4263C7.77054 20.4558 6.18097 20.0092 6.18097 18.8056V14.5971C6.18097 14.2716 6.31722 13.9612 6.55187 13.7342L16.0666 4.65091C16.059 4.53737 15.9379 4.43897 15.8168 4.52223L4.46272 12.4247L0.64776 10.4566C-0.245425 9.99489 -0.207578 8.70053 0.715885 8.29935L19.5258 0.101724C20.4265 -0.291883 21.3954 0.518039 21.1607 1.47935Z" />
        </symbol>
        <symbol viewBox="0 0 24 18" xmlns="http://www.w3.org/2000/svg" id="twitter">
          <path
            d="M21.543 4.48105C21.5576 4.67634 21.5576 4.87163 21.5576 5.06872C21.5576 11.074 16.6045 18 7.54759 18V17.9964C4.87215 18 2.25229 17.2926 0 15.9589C0.389031 16.0021 0.780012 16.0237 1.17197 16.0246C3.38915 16.0264 5.54296 15.3398 7.28726 14.0753C5.18026 14.0384 3.3326 12.7704 2.68714 10.9192C3.42523 11.0506 4.18574 11.0236 4.91018 10.841C2.61304 10.4126 0.96039 8.5497 0.96039 6.38623V6.32864C1.64485 6.68051 2.41121 6.8758 3.19512 6.8974C1.03157 5.56279 0.364656 2.90615 1.67118 0.829084C4.17112 3.6684 7.8596 5.3945 11.8191 5.57718C11.4223 3.99868 11.9644 2.34459 13.2436 1.23496C15.2268 -0.485733 18.3459 -0.397539 20.2101 1.43205C21.3129 1.23136 22.3698 0.857882 23.337 0.328715C22.9694 1.38075 22.2001 2.27439 21.1725 2.84226C22.1484 2.73606 23.102 2.49488 24 2.1268C23.3389 3.04114 22.5063 3.83759 21.543 4.48105Z" />
        </symbol>
        <symbol viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" id="user">
          <path
            d="M19.0811 16.7388C19.0798 17.8685 18.6304 18.9516 17.8316 19.7505C17.0327 20.5494 15.9496 20.9987 14.8198 21H6.16219C5.04929 20.9735 3.99088 20.5128 3.21313 19.7163C2.43539 18.9199 2 17.8508 2 16.7376C2 15.6243 2.43539 14.5553 3.21313 13.7588C3.99088 12.9623 5.04929 12.5016 6.16219 12.4751H14.8198C15.95 12.4764 17.0335 12.9261 17.8324 13.7255C18.6314 14.5249 19.0804 15.6086 19.0811 16.7388Z"
            fill="var(--color-yellow)" />
          <path
            d="M13.2971 10.2502C12.4666 10.8052 11.4901 11.1014 10.4911 11.1014C9.15199 11.1001 7.86807 10.5676 6.92116 9.62068C5.97424 8.67376 5.44171 7.38984 5.44043 6.0507C5.44043 5.05177 5.73665 4.07527 6.29163 3.24468C6.8466 2.4141 7.63542 1.76674 8.55831 1.38446C9.4812 1.00219 10.4967 0.902168 11.4765 1.09705C12.4562 1.29193 13.3562 1.77296 14.0625 2.47932C14.7689 3.18567 15.2499 4.08562 15.4448 5.06536C15.6397 6.0451 15.5396 7.06063 15.1574 7.98352C14.7751 8.90642 14.1277 9.69523 13.2971 10.2502Z" />
        </symbol>
        <symbol viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg" id="close">
          <path
            d="M10.0439 8.49924L16.6801 1.86378C17.1066 1.43731 17.1066 0.746324 16.6801 0.319853C16.2537 -0.106618 15.5627 -0.106618 15.1362 0.319853L8.5 6.95532L1.86378 0.319853C1.43731 -0.106618 0.746324 -0.106618 0.319853 0.319853C-0.106618 0.746324 -0.106618 1.43731 0.319853 1.86378L6.95608 8.49924L0.319853 15.1355C-0.106618 15.5619 -0.106618 16.2529 0.319853 16.6794C0.746324 17.1059 1.43731 17.1059 1.86378 16.6794L8.5 10.0432L15.1362 16.6794C15.3496 16.8928 15.6289 16.9991 15.9082 16.9991C16.1875 16.9991 16.4667 16.8924 16.6801 16.6794C17.1066 16.2529 17.1066 15.5619 16.6801 15.1355L10.0439 8.49924Z" />
        </symbol>
        <symbol viewBox="0 0 21 16" xmlns="http://www.w3.org/2000/svg" id="basket">
          <path
            d="M5.02381 15.5051H15.9762L18.2381 6.93367H20.0238C20.2857 6.93367 20.5 6.71939 20.5 6.45748C20.5 6.19558 20.2857 5.98129 20.0238 5.98129H16.2143L12.5476 0.719389C12.4048 0.505104 12.0952 0.457485 11.881 0.600342C11.6667 0.743199 11.619 1.05272 11.7619 1.26701L15.0714 5.98129H5.92857L9.21429 1.2432C9.35714 1.02891 9.30952 0.719389 9.09524 0.576532C8.88095 0.433675 8.57143 0.481294 8.42857 0.69558L4.78571 5.98129H0.97619C0.714286 5.98129 0.5 6.19558 0.5 6.45748C0.5 6.71939 0.714286 6.93367 0.97619 6.93367H2.7619L5.02381 15.5051ZM8.35714 13.3622C8.35714 13.6242 8.14286 13.8384 7.88095 13.8384C7.61905 13.8384 7.40476 13.6242 7.40476 13.3622V8.60034C7.40476 8.33844 7.61905 8.12415 7.88095 8.12415C8.14286 8.12415 8.35714 8.33844 8.35714 8.60034V13.3622ZM10.9762 13.3622C10.9762 13.6242 10.7619 13.8384 10.5 13.8384C10.2381 13.8384 10.0238 13.6242 10.0238 13.3622V8.60034C10.0238 8.33844 10.2381 8.12415 10.5 8.12415C10.7619 8.12415 10.9762 8.33844 10.9762 8.60034V13.3622ZM13.5952 13.3622C13.5952 13.6242 13.381 13.8384 13.119 13.8384C12.8571 13.8384 12.6429 13.6242 12.6429 13.3622V8.60034C12.6429 8.33844 12.8571 8.12415 13.119 8.12415C13.381 8.12415 13.5952 8.33844 13.5952 8.60034V13.3622Z" />
        </symbol>
      </svg>

      <div className="wrapper">
        <div className="main-social">
          <a href="https://twitter.com/BATTLEM0N" className="main-social__item" target="_blank">
            <svg>
              <use xlinkHref="#twitter"></use>
            </svg>
          </a>
          <a href="https://discord.gg/vsrKEqZc7D" className="main-social__item" target="_blank">
            <svg>
              <use xlinkHref="#discord"></use>
            </svg>
          </a>
          <a href="https://t.me/Battlemon" className="main-social__item" target="_blank">
            <svg>
              <use xlinkHref="#telegram"></use>
            </svg>
          </a>
        </div>
        <header className="header">
          <div className='container'>
            <div className="header__row">
              <div className="header__left">
                <Link href="/" className="logo">
                  <img src="img/logo.svg" alt="#" />
                </Link>
              </div>
              <div className="header__center">
                <div className="menu js-menu">
                  <nav className="menu__body js-menu__body">
                    <div className="menu__top">
                      <div className="menu__close js-menu__close">
                        <svg>
                          <use xlinkHref="#close"></use>
                        </svg>
                      </div>
                    </div>
                    <div className="menu__box">
                      <ul className="menu__list">
                        <li className="menu__item">
                          <Link href="/hub/lemons" className="menu__link">NFT Hub</Link>
                        </li>
                        <li className="menu__item">
                          <Link href="/game" className="menu__link">Game Hub</Link>
                        </li>
                        <li className="menu__item">
                          <Link href="/claim" className="menu__link">Claim</Link>
                        </li>
                        <li className="menu__item">
                          <Link href="/referral" className="menu__link">Referral</Link>
                        </li>
                      </ul>
                      <div className="menu__bottom">
                        <a href="https://store.steampowered.com/app/2206160/Battlemon/" target='_blank' className="btn btn-outline-white btn-small">
                          Steam
                          <svg>
                            <use xlinkHref="#steam"></use>
                          </svg>
                        </a>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
              <div className="header__right">
                <div className="header__actions">
                  <div className="header__profile">
                    <div className="header__profile-icon d-none">
                      <svg>
                        <use xlinkHref="#user"></use>
                      </svg>
                    </div>
                    <Link href="/hub/lemons" className="btn btn-outline-white btn-small">
                      App
                    </Link>
                  </div>
                  <div className="header__menu-icon">
                    <div className="icon-menu js-menu__btn">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="main">

          <div className="offer">
            <div className="offer__star-1">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-2">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-3">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-4">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-5">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-6">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-7">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-8">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-9">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__star-10">
              <img src="img/star.svg" alt="#" />
            </div>
            <div className="offer__bg">
              <img src="img/offer-bg.png" alt="#" />
            </div>
            <div className="offer__logo-1">
              <img src="img/offer-logo-1.svg" alt="#" />
            </div>
            <div className="offer__logo-2">
              <img src="img/offer-logo-2.svg" alt="#" />
            </div>
            <div className="offer__logo-3">
              <img src="img/offer-logo-3.svg" alt="#" />
            </div>
            <div className="offer__logo-4">
              <img src="img/offer-logo-4.svg" alt="#" />
            </div>
            <div className="offer__content">

              <div className='container'>
                <div className="offer__body">
                  <div className="offer__box">
                    <div className="offer__title">
                      <h1>
                        Cross-chain&nbsp;
                        <span>Dynamic NFT</span>&nbsp;
                        With Game
                      </h1>
                    </div>
                    <div className="offer__text">
                      To the last drop of juice
                    </div>
                    <div className="offer__buttons">
                      <Link href="/game" className="btn btn-yellow">
                        Buy Box
                        <svg>
                          <use xlinkHref="#basket"></use>
                        </svg>
                      </Link>
                      <a href="https://store.steampowered.com/app/2206160/Battlemon/" target='_blank' className="btn btn-yellow">
                        Steam
                        <svg>
                          <use xlinkHref="#steam"></use>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div className="offer__slider">
                    <div className="offer-slider swiper-container swiper-no-swiping">
                      <div className="offer-slider__wrapper swiper-wrapper">
                        <div className="offer-slider__slide swiper-slide">
                          <div className="offer-slider__img">
                            <img src="img/offer-4.png" alt="#" />
                          </div>
                        </div>
                        <div className="offer-slider__slide swiper-slide">
                          <div className="offer-slider__img">
                            <img src="img/offer-3.png" alt="#" />
                          </div>
                        </div>
                        <div className="offer-slider__slide swiper-slide">
                          <div className="offer-slider__img">
                            <img src="img/offer-1.png" alt="#" />
                          </div>
                        </div>
                        <div className="offer-slider__slide swiper-slide">
                          <div className="offer-slider__img">
                            <img src="img/offer-2.png" alt="#" />
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="block-animation">
            <div className="block-animation__top">
              <div className="block-animation__img parallax" data-from-x-parallax="75" data-to-x-parallax="-75">
                <img src="img/element-1.svg" alt="#" />
              </div>
            </div>
            <div className="block-animation__bottom">
              <div className="block-animation__img parallax" data-from-x-parallax="-75" data-to-x-parallax="75">
                <img src="img/element-2.svg" alt="#" />
              </div>
            </div>
          </div>

          <div className="partners">
            <div className='container'>
              <div className="partners__title">
                <h2>
                  Partners
                </h2>
              </div>
            </div>
            <div className="partners__slider carouselTicker">
              <ul className="partners__row carouselTicker__list">
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/1.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/2.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/3.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/4.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/5.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/6.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/7.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/8.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/1.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/2.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/3.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/4.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/5.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/6.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/7.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/8.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/1.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/2.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/3.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/4.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/5.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/6.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/7.svg" alt="#" />
                  </div>
                </li>
                <li className="partners__col carouselTicker__list">
                  <div className="partners__img">
                    <img src="img/partners/8.svg" alt="#" />
                  </div>
                </li>
              </ul>
            </div>

          </div>

          <div className="block-home" id="block-home">
            <div className="block-home__bg">
              <img src="img/bg.png" alt="#" />
            </div>
            <canvas className="block-home__animation" id="block-home__animation"></canvas>
            <div className="block-home__content">

              <div className="mechanics">
                <div className='container'>
                  <div className="mechanics__title">
                    <h2>
                      <span>GameFi</span> on-chain <span>mechanics</span>
                    </h2>
                  </div>
                  <div className="mechanics-slider swiper-container">
                    <div className="mechanics-slider__wrapper swiper-wrapper">
                      <div className="mechanics-slider__slide swiper-slide">
                        <div className="item-mechanics">
                          <div className="item-mechanics__top">
                            <div className="item-mechanics__icon">
                              <img src="img/mechanics-icon-1.svg" alt="#" />
                            </div>
                          </div>
                          <div className="item-mechanics__title">
                            Crafting
                          </div>
                          <div className="item-mechanics__text">
                            Use 2 items plus EVM native token to get one with a higher level
                          </div>
                        </div>
                      </div>
                      <div className="mechanics-slider__slide swiper-slide">
                        <div className="item-mechanics">
                          <div className="item-mechanics__top">
                            <div className="item-mechanics__icon">
                              <img src="img/mechanics-icon-2.svg" alt="#" />
                            </div>
                          </div>
                          <div className="item-mechanics__title">
                            Mint
                          </div>
                          <div className="item-mechanics__text">
                            As a result of crossing two guns and added EVM native token, Player gets Hybrid one
                          </div>
                        </div>
                      </div>
                      <div className="mechanics-slider__slide swiper-slide">
                        <div className="item-mechanics">
                          <div className="item-mechanics__top">
                            <div className="item-mechanics__icon">
                              <img src="img/mechanics-icon-3.svg" alt="#" />
                            </div>
                          </div>
                          <div className="item-mechanics__title">
                            Level up
                          </div>
                          <div className="item-mechanics__text">
                            Pay to win mechanics in on-chain games for EVM native token
                          </div>
                        </div>
                      </div>
                      <div className="mechanics-slider__slide swiper-slide">
                        <div className="item-mechanics">
                          <div className="item-mechanics__top">
                            <div className="item-mechanics__icon">
                              <img src="img/mechanics-icon-4.svg" alt="#" />
                            </div>
                          </div>
                          <div className="item-mechanics__title">
                            Renting
                          </div>
                          <div className="item-mechanics__text">
                            NFT owners are able to rent their NFT’s to Players
                          </div>
                        </div>
                      </div>
                      <div className="mechanics-slider__slide swiper-slide">
                        <div className="item-mechanics">
                          <div className="item-mechanics__top">
                            <div className="item-mechanics__icon">
                              <img src="img/mechanics-icon-3.svg" alt="#" />
                            </div>
                          </div>
                          <div className="item-mechanics__title">
                            Level up
                          </div>
                          <div className="item-mechanics__text">
                            Pay to win mechanics in on-chain games for EVM native token
                          </div>
                        </div>
                      </div>
                      <div className="mechanics-slider__slide swiper-slide">
                        <div className="item-mechanics">
                          <div className="item-mechanics__top">
                            <div className="item-mechanics__icon">
                              <img src="img/mechanics-icon-1.svg" alt="#" />
                            </div>
                          </div>
                          <div className="item-mechanics__title">
                            Crafting
                          </div>
                          <div className="item-mechanics__text">
                            Use 2 items plus EVM native token to get one with a higher level
                          </div>
                        </div>
                      </div>
                      <div className="mechanics-slider__slide swiper-slide">
                        <div className="item-mechanics">
                          <div className="item-mechanics__top">
                            <div className="item-mechanics__icon">
                              <img src="img/mechanics-icon-2.svg" alt="#" />
                            </div>
                          </div>
                          <div className="item-mechanics__title">
                            Mint
                          </div>
                          <div className="item-mechanics__text">
                            As a result of crossing two guns and added EVM native token, Player gets Hybrid one
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mechanics-slider__pagination"></div>
                  </div>
                  <div className="mechanics__btn">
                    <a href="#" className="btn btn-outline-white btn-small">Загрузить ещё</a>
                  </div>
                </div>
              </div>

              <div className="marketplaces">
                <div className='container'>
                  <div className="marketplaces__title">
                    <h2>
                      Marketplaces
                    </h2>
                  </div>
                  <div className="marketplaces__row">
                    <div className="marketplaces__col">
                      <div className="item-marketplaces">
                        <div className="item-marketplaces__top">
                          <div className="item-marketplaces__icon">
                            <img src="img/marketplaces-icon-2.svg" alt="#" />
                          </div>
                        </div>
                        <div className="item-marketplaces__title">
                          Element
                        </div>
                        <div className="item-marketplaces__links">
                          <Link href={`https://element.market/assets/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS}`} className="item-marketplaces__link" target='_blank'>
                            Lemons
                          </Link>
                          <Link href={`https://element.market/assets/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS}`} className="item-marketplaces__link" target='_blank'>
                            Items
                          </Link>
                          <Link href={`https://element.market/assets/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_STICKERS}`} className="item-marketplaces__link" target='_blank'>
                            Stickers
                          </Link>
                          <Link href={`https://element.market/assets/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_GEMS}`} className="item-marketplaces__link" target='_blank'>
                            Gems
                          </Link>
                          <Link href={`https://element.market/assets/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_PICKAXES}`} className="item-marketplaces__link" target='_blank'>
                            Pickaxes
                          </Link>
                          <Link href="#" className="item-marketplaces__link disabled" target='_blank'>
                            Keys
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="marketplaces__col">
                      <div className="item-marketplaces">
                        <div className="item-marketplaces__top">
                          <div className="item-marketplaces__icon">
                            <img src="img/marketplaces-icon-1.svg" alt="#" />
                          </div>
                        </div>
                        <div className="item-marketplaces__title">
                          Dew.gg
                        </div>
                        <div className="item-marketplaces__links">
                          <Link href={`https://dew.gg/sell?contract=${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS}`} className="item-marketplaces__link" target='_blank'>
                            Lemons
                          </Link>
                          <Link href={`https://dew.gg/sell?contract=${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS}`} className="item-marketplaces__link" target='_blank'>
                            Items
                          </Link>
                          <Link href={`https://dew.gg/sell?contract=${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_STICKERS}`} className="item-marketplaces__link" target='_blank'>
                            Stickers
                          </Link>
                          <Link href={`https://dew.gg/sell?contract=${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_GEMS}`} className="item-marketplaces__link" target='_blank'>
                            Gems
                          </Link>
                          <Link href={`https://dew.gg/sell?contract=${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_PICKAXES}`} className="item-marketplaces__link" target='_blank'>
                            Pickaxes
                          </Link>
                          <Link href="#" className="item-marketplaces__link disabled" target='_blank'>
                            Keys
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="marketplaces__col">
                      <div className="item-marketplaces">
                        <div className="item-marketplaces__top">
                          <div className="item-marketplaces__icon">
                            <img src="img/marketplaces-icon-3.svg" alt="#" />
                          </div>
                        </div>
                        <div className="item-marketplaces__title">
                          OpenSea
                        </div>
                        <div className="item-marketplaces__links">
                          <Link href={`https://opensea.io/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS}`} className="item-marketplaces__link" target='_blank'>
                            Lemons
                          </Link>
                          <Link href={`https://opensea.io/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS}`} className="item-marketplaces__link" target='_blank'>
                            Items
                          </Link>
                          <Link href={`https://opensea.io/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_STICKERS}`} className="item-marketplaces__link" target='_blank'>
                            Stickers
                          </Link>
                          <Link href={`https://opensea.io/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_GEMS}`} className="item-marketplaces__link" target='_blank'>
                            Gems
                          </Link>
                          <Link href={`https://opensea.io/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_PICKAXES}`} className="item-marketplaces__link" target='_blank'>
                            Pickaxes
                          </Link>
                          <Link href="#" className="item-marketplaces__link disabled" target='_blank'>
                            Keys
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="marketplaces__col">
                      <div className="item-marketplaces">
                        <div className="item-marketplaces__top">
                          <div className="item-marketplaces__icon">
                            <img src="img/marketplaces-icon-4.svg" alt="#" />
                          </div>
                        </div>
                        <div className="item-marketplaces__title">
                          OKX
                        </div>
                        <div className="item-marketplaces__links">
                          <Link href={`https://www.okx.com/web3/marketplace/nft/collection/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_LEMONS}`} className="item-marketplaces__link" target='_blank'>
                            Lemons
                          </Link>
                          <Link href={`https://www.okx.com/web3/marketplace/nft/collection/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_ITEMS}`} className="item-marketplaces__link" target='_blank'>
                            Items
                          </Link>
                          <Link href={`https://www.okx.com/web3/marketplace/nft/collection/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_STICKERS}`} className="item-marketplaces__link" target='_blank'>
                            Stickers
                          </Link>
                          <Link href={`https://www.okx.com/web3/marketplace/nft/collection/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_GEMS}`} className="item-marketplaces__link" target='_blank'>
                            Gems
                          </Link>
                          <Link href={`https://www.okx.com/web3/marketplace/nft/collection/polygon/${process.env.NEXT_PUBLIC_CONTRACT_POLYGON_PICKAXES}`} className="item-marketplaces__link" target='_blank'>
                            Pickaxes
                          </Link>
                          <Link href="#" className="item-marketplaces__link disabled" target='_blank'>
                            Keys
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="mystery-box">
            <div className="mystery-box__bg">
              <img src="img/bg2.png" alt="#" />
            </div>
            <div className='container'>
              <div className="mystery-box__top">
                <div className="mystery-box__title">
                  <h2>Mystery Box
                  </h2>
                </div>
                <div className="mystery-box__text">
                  Purchasing a Mystery Box is the first step in the Undeads Metaverse. Each Mystery Box gives you
                  a
                  chance to receive a random potion. There are five types of potions consisting of in-game NFTs.
                  The
                  higher the grade, the more rare and valuable the asset can be found inside.
                </div>
              </div>
            </div>
            <div className="mystery-box__content">

              <div className="mystery-box__anim"></div>
              <div className="mystery-box__body">

                <div className='container'>
                  <div className="mystery-box-items">
                    <div className="mystery-box-items__element-1" data-depth="0.2">
                      <img src="img/box-element-1.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__element-2" data-depth="-0.4">
                      <img src="img/box-element-2.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__element-3" data-depth="0.55">
                      <img src="img/box-element-3.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__element-4" data-depth="-0.16">
                      <img src="img/box-element-4.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__element-5" data-depth="-0.35">
                      <img src="img/box-element-5.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__element-6" data-depth="0.35">
                      <img src="img/box-element-6.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__element-7" data-depth="0.2">
                      <img src="img/box-element-7.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__element-8" data-depth="-0.2">
                      <img src="img/box-element-8.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__box">
                      <img src="img/box.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__img-1">
                      <img src="img/lemon-1.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__img-2">
                      <img src="img/lemon-2.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__img-3">
                      <img src="img/lemon-3.png" alt="#" />
                    </div>
                    <div className="mystery-box-items__img-4">
                      <img src="img/lemon-4.png" alt="#" />
                    </div>
                  </div>
                  <div className="mystery-box__btn">
                    <Link href="/game" className="btn btn-yellow btn-large">
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>

        <footer className="footer">
          <div className='container'>
            <div className="footer__row">
              <div className="footer__left">
                <div className="footer__logo">
                  <Link href="/" className="logo">
                    <img src="img/logo.svg" alt="#" />
                  </Link>
                </div>
              </div>
              <div className="footer__center">
                <ul className="footer-menu">
                  <li>
                    <Link href="/hub/lemons" className="menu__link">NFT Hub</Link>
                  </li>
                  <li>
                    <Link href="/game" className="menu__link">Game Hub</Link>
                  </li>
                  <li>
                    <Link href="/claim" className="menu__link">Claim</Link>
                  </li>
                  <li>
                    <Link href="/referral" className="menu__link">Referral</Link>
                  </li>
                </ul>
              </div>
              <div className="footer__right">
                <a href="https://store.steampowered.com/app/2206160/Battlemon/" target='_blank' className="btn btn-outline-white btn-small">
                  Steam
                  <svg>
                    <use xlinkHref="#steam"></use>
                  </svg>
                </a>
              </div>
            </div>
            <div className="social-block">
              <a href="https://twitter.com/BATTLEM0N" className="social-block__item" target="_blank">
                <svg>
                  <use xlinkHref="#twitter"></use>
                </svg>
              </a>
              <a href="https://discord.gg/vsrKEqZc7D" className="social-block__item" target="_blank">
                <svg>
                  <use xlinkHref="#discord"></use>
                </svg>
              </a>
              <a href="https://t.me/Battlemon" className="social-block__item" target="_blank">
                <svg>
                  <use xlinkHref="#telegram"></use>
                </svg>
              </a>
            </div>
          </div>
        </footer>

        <Script  src="/js/jquery-3.6.0.min.js" defer={true} />
        <Script  src="/plugins/swiper/swiper.min.js" defer={true} />
        <Script  src="/plugins/carouselTicker/jquery.carouselTicker.min.js" defer={true} />
        <Script  src="/plugins/parallax/parallax.js" defer={true} />
        <Script  src="/js/script.js" defer={true} />
      </div>
    </Layout>
  </>);
};

export default Home;
