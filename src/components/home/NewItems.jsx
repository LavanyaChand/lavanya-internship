import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './HotCollections/HotCollections.css';
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Timer from "../UI/Timer";
import Skeleton from "../UI/Skeleton";

// Custom arrow components
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow slick-next" onClick={onClick}>
      <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="custom-arrow slick-prev" onClick={onClick}>
      <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
    </div>
  );
}


const NewItems = () => {

  const { id } = useParams();
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState();
  const [slidesToShow, setSlidesToShow] = useState(4);


  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 400,
    slidesToShow,
    slidesToScroll: 1,
    swipeToSlide: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  async function fetchCollection(userId) {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems?userId=${userId || id}`);
    setCollection(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchCollection(id);
  }, [id]);

  useEffect(() => {
    const updateSlides = () => {
      if (window.innerWidth <= 576) setSlidesToShow(1);
      else if (window.innerWidth <= 992) setSlidesToShow(2);
      else if (window.innerWidth <= 1200) setSlidesToShow(3);
      else setSlidesToShow(4);
    };

    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);



  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div 
          data-aos="custom-fadeIn"
          className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="slider-container">
            {
              loading ?
                (
                  <div className="skeleton-wrapper">
                    {Array.from({ length: slidesToShow }).map((_, idx) => (
                      <div key={idx} className="slider-item">
                        <div className="nft__item">

                          <div className="author_list_pp">
                            <Skeleton
                              width="50px"
                              height="50px"
                              borderRadius="50%"
                            />
                          </div>

                          <div className="nft__item_wrap">
                            <Skeleton
                              width="100%"
                              height="100%"
                              borderRadius="15px"
                            />
                          </div>

                          <div
                            style={{
                              marginTop: "5px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "8px",
                            }}
                          >
                            <Skeleton
                              width="100px"
                              height="14px"
                              borderRadius="4px"
                            />

                            <div style={{
                              display: "flex",
                              justifyContent: "space-between"
                            }}>
                              <Skeleton
                                width="60px"
                                height="12px"
                                borderRadius="4px"
                              />
                              <Skeleton
                                width="40px"
                                height="12px"
                                borderRadius="4px"
                              />
                            </div>

                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
                :
                (
                  <Slider {...settings}>
                    {Array.isArray(collection) && collection.map((item, idx) => (
                      <div className="slider-item" key={idx}>
                        <div className="nft__item">
                          <div className="author_list_pp">
                            <Link
                              to={`/author/${item.authorId}`}
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Creator: Monica Lucas"
                            >
                              <img className="lazy" src={item.authorImage} alt="" />
                              <i className="fa fa-check"></i>
                            </Link>
                          </div>

                          {
                            item.expiryDate && (
                              <Timer expiryDate={item.expiryDate} />
                            )
                          }

                          <div className="nft__item_wrap">
                            <div className="nft__item_extra">
                              <div className="nft__item_buttons">
                                <button>Buy Now</button>
                                <div className="nft__item_share">
                                  <h4>Share</h4>
                                  <a href="" target="_blank" rel="noreferrer">
                                    <i className="fa fa-facebook fa-lg"></i>
                                  </a>
                                  <a href="" target="_blank" rel="noreferrer">
                                    <i className="fa fa-twitter fa-lg"></i>
                                  </a>
                                  <a href="">
                                    <i className="fa fa-envelope fa-lg"></i>
                                  </a>
                                </div>
                              </div>
                            </div>

                            <Link to={`/item-details/${item.nftId}`}>
                              <img
                                src={item.nftImage}
                                className="lazy nft__item_preview"
                                alt=""
                              />
                            </Link>
                          </div>
                          <div className="nft__item_info">
                            <Link to={`/item-details/${item.nftId}`}>
                              <h4>{item.title}</h4>
                            </Link>
                            <div className="nft__item_price">{item.price} ETH</div>
                            <div className="nft__item_like">
                              <i className="fa fa-heart"></i>
                              <span>{item.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Slider>
                )
            }
          </div>
        </div>
      </div>
    </section >
  );
};

export default NewItems;
