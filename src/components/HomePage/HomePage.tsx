import { useContext, useEffect, useRef, useState } from 'react';
import { Product } from '../../types/Propduct';

import productsFromServer from '../../api/products.json';
import phonesFromServer from '../../api/phones.json';
import tabletsFromServer from '../../api/tablets.json';
import accessoriesFromServer from '../../api/accessories.json';

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './HomePage.scss';

import { ProductCard } from '../ProductCard/ProductCard';
import { Desktop } from '../../utils/DesktopContext';
import { Tablet } from '../../utils/TabletContext';
import { Header } from '../Header/Header';
import { Menu } from '../Menu/Menu';

export const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [brandsProducts, setBrandsProduct] = useState<Product[]>([]);
  const [hotPricesProducts, setHotPricesProduct] = useState<Product[]>([]);

  const homeSwiperRef = useRef<any>(null);
  const brandsSwiperRef = useRef<any>(null);
  const hotPricesSwiperRef = useRef<any>(null);

  const onDesktop = useContext(Desktop);
  const onTablet = useContext(Tablet);

  const slidesPerVeiw = () => {
    if (onDesktop) {
      return 4;
    } else if (onTablet) {
      return 2.4;
    } else {
      return 1.4;
    }
  };

  useEffect(() => {
    setHotPricesProduct(
      productsFromServer.sort(
        (a, b) => b.fullPrice - b.price - (a.fullPrice - a.price),
      ),
    );
    setBrandsProduct(productsFromServer.sort((a, b) => b.price - a.price));
  }, []);

  return (
    <>
      <Header />
      <Menu />
      <main className="main">
        <section className="home" id="#">
          <h1 className="home__title">Welcome to Nice Gadgets store!</h1>
          <button
            className="navigation-button navigation-button--home-swiper"
            onClick={() => homeSwiperRef.current.slidePrev()}
          >
            <img src="/img/arrow-prev.svg" alt="slide prev" />
          </button>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop
            pagination={{ clickable: true }}
            className="swiper"
            autoplay={{ delay: 5000 }}
            onSwiper={swiper => {
              homeSwiperRef.current = swiper;
            }}
          >
            <SwiperSlide>
              {onTablet || onDesktop ? (
                <img
                  className="swiper-image"
                  src="/img/slider-image-tablet.png"
                  alt="slider image"
                />
              ) : (
                <img
                  className="swiper-image"
                  src="/img/slider-image.png"
                  alt="slider image"
                />
              )}
            </SwiperSlide>
            <SwiperSlide>
              {onTablet || onDesktop ? (
                <img
                  className="swiper-image"
                  src="/img/slider-image-tablet2.jpg"
                  alt="slider image"
                />
              ) : (
                <img
                  className="swiper-image"
                  src="/img/slider-image2.jpg"
                  alt="slider image"
                />
              )}
            </SwiperSlide>
            <SwiperSlide>
              {onTablet || onDesktop ? (
                <img
                  className="swiper-image"
                  src="/img/slider-image-tablet3.jpg"
                  alt="slider image"
                />
              ) : (
                <img
                  className="swiper-image"
                  src="/img/slider-image3.jpg"
                  alt="slider image"
                />
              )}
            </SwiperSlide>
          </Swiper>
          <button
            className="navigation-button navigation-button--home-swiper"
            onClick={() => homeSwiperRef.current.slideNext()}
          >
            <img src="/img/arrow-next.svg" alt="slide next" />
          </button>
        </section>
        <section className="brands">
          <h3 className="section-title brands__title">Brand new models</h3>
          <div className="navigation-buttons-box">
            <button
              className="navigation-button"
              onClick={() => brandsSwiperRef.current.slidePrev()}
            >
              <img src="/img/arrow-prev.svg" alt="slide prev" />
            </button>
            <button
              className="navigation-button"
              onClick={() => brandsSwiperRef.current.slideNext()}
            >
              {currentSlide !== 60 ? (
                <img src="/img/arrow-next.svg" alt="slide next" />
              ) : (
                <img src="/img/arrow-next-disabled.svg" alt="slide next" />
              )}
            </button>
          </div>

          <Swiper
            slidesPerView={slidesPerVeiw()}
            spaceBetween={16}
            className="brands__swiper"
            onSwiper={swiper => {
              brandsSwiperRef.current = swiper;
            }}
            onSlideChange={swiper => {
              setCurrentSlide(swiper.realIndex);
            }}
          >
            {brandsProducts.map(product => {
              if (
                ((product.category === 'tablets' ||
                  product.category === 'phones') &&
                  product.itemId.includes('256gb')) ||
                (product.category === 'accessories' &&
                  product.itemId.includes('40mm'))
              ) {
                return (
                  <SwiperSlide key={product.id}>
                    <ProductCard id={product.id} />
                  </SwiperSlide>
                );
              } else {
                return null;
              }
            })}
          </Swiper>
        </section>
        <section className="categories">
          <h3 className="section-title categories__title">Shop by category</h3>
          <article className="categories__category">
            <a href="#phones" className="categories__link">
              {/* eslint-disable-next-line max-len*/}
              <div className="categories__image-box  categories__image-box--phones">
                <img
                  className="categories__image"
                  src="img\category-phones.webp"
                  alt="phones"
                />
              </div>
              <h4 className="categories__subtitle">Mobile phones</h4>
            </a>
            <p className="categories__quantity">
              {phonesFromServer.length} models
            </p>
          </article>
          <article className="categories__category">
            <a href="#tablets" className="categories__link">
              {/* eslint-disable-next-line max-len*/}
              <div className="categories__image-box  categories__image-box--tablets">
                <img
                  className="categories__image"
                  src="img\category-tablets.webp"
                  alt="tablets"
                />
              </div>
              <h4 className="categories__subtitle">Tablets</h4>
            </a>
            <p className="categories__quantity">
              {tabletsFromServer.length} models
            </p>
          </article>
          <article className="categories__category">
            <a href="#accessories" className="categories__link">
              {/* eslint-disable-next-line max-len*/}
              <div className="categories__image-box categories__image-box--accessories">
                <img
                  className="categories__image"
                  src="\img\category-accessories.webp"
                  alt="accesories"
                />
              </div>
              <h4 className="categories__subtitle">Accessories</h4>
            </a>
            <p className="categories__quantity">
              {accessoriesFromServer.length} models
            </p>
          </article>
        </section>
        <section className="hot-prices">
          <h3 className="section-title hot-prices__title">Hot prices</h3>
          <div className="hot-prices__buttons-box navigation-buttons-box">
            <button
              className="navigation-button "
              onClick={() => hotPricesSwiperRef.current.slidePrev()}
              disabled={currentSlide === 0}
            >
              {currentSlide !== 0 ? (
                <img src="/img/arrow-prev.svg" alt="slide prev" />
              ) : (
                <img src="/img/arrow-prev-disabled.svg" alt="slide prev" />
              )}
            </button>
            <button
              className="navigation-button"
              onClick={() => hotPricesSwiperRef.current.slideNext()}
            >
              {currentSlide !== 60 ? (
                <img src="/img/arrow-next.svg" alt="slide next" />
              ) : (
                <img src="/img/arrow-next-disabled.svg" alt="slide next" />
              )}
            </button>
          </div>
          <Swiper
            slidesPerView={slidesPerVeiw()}
            spaceBetween={16}
            className="hot-prices__swiper"
            onSwiper={swiper => {
              hotPricesSwiperRef.current = swiper;
            }}
            onSlideChange={swiper => {
              setCurrentSlide(swiper.realIndex);
            }}
          >
            {hotPricesProducts.map(product => {
              if (
                ((product.category === 'tablets' ||
                  product.category === 'phones') &&
                  product.itemId.includes('256gb')) ||
                (product.category === 'accessories' &&
                  product.itemId.includes('40mm'))
              ) {
                return (
                  <SwiperSlide key={product.id}>
                    <ProductCard id={product.id} />
                  </SwiperSlide>
                );
              } else {
                return null;
              }
            })}
          </Swiper>
        </section>
      </main>
      <div className="section-line" />
      <footer className="footer">
        <a href="#" className="footer__logo" />
        <div className="footer__links-box">
          <a href="" className="footer__links">
            Github
          </a>
          <a href="" className="footer__links">
            Contacts
          </a>
          <a href="" className="footer__links">
            Rights
          </a>
        </div>
        <a href="#" className="footer__back-on-top">
          Back to top
          <button className="navigation-button footer__button">
            <img src="/img/arrow-top.svg" alt="slide top" />
          </button>
        </a>
      </footer>
    </>
  );
};
