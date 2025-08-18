import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './HotCollections.css';
import Skeleton from "../../UI/Skeleton";


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

const HotCollections = () => {
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
      { breakpoint: 992,  settings: { slidesToShow: 2 } },
      { breakpoint: 576,  settings: { slidesToShow: 1 } },
    ],
  };

  async function fetchCollection(userId) {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections?userId=${userId || id}`);
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
    <section id="section-collections" className="no-bottom position-relative">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h2>Hot Collections</h2>
            <div className="small-border bg-color-2"></div>
          </div>

          <div className="slider-container">
            {
              loading ?
                (
                  <div className="skeleton-wrapper">
                    {Array.from({ length: slidesToShow }).map((_, idx) => (
                      <div key={idx} className="slider-item">
                        <div className="nft_coll">
                          <Skeleton
                            width="100%"
                            height="200px"
                            borderRadius="12px"
                          />
                          <div
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              gap: "8px",
                            }}
                          >
                            <Skeleton
                              width="60px"
                              height="60px"
                              borderRadius="50%"
                            />
                            <Skeleton
                              width="100px"
                              height="14px"
                              borderRadius="4px"
                            />
                            <Skeleton
                              width="60px"
                              height="12px"
                              borderRadius="4px"
                            />
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
                      <div key={idx} className="slider-item">
                        <div className="nft_coll">
                          <div className="nft_wrap">
                            <Link to={`/item-details/${item.nftId}`}>
                              <img
                                src={item.nftImage}
                                className="lazy img-fluid"
                                alt={item.title || "NFT"}
                                loading="lazy"
                              />
                            </Link>
                          </div>

                          <div className="nft_coll_pp">
                            <Link to={`/author/${item.authorId}`}>
                              <img
                                className="lazy pp-coll"
                                src={item.authorImage}
                                alt={item.authorName || "Author"}
                                loading="lazy"
                              />
                            </Link>
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </div>

                          <div className="nft_coll_info">
                            <Link to="/explore">
                              <h4>{item.title}</h4>
                            </Link>
                            <span>ERC-{item.code}</span>
                            {item.authorName && (
                              <p className="nft_coll_by">
                                By <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                              </p>
                            )}
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
    </section>
  );
};

export default HotCollections;