//https://us-central1-nft-cloud-functions.cloudfunctions.net/explore

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Timer from "../UI/Timer";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {

  // const { id } = useParams();
  const [exploreItem, setExploreItem] = useState([]);
  const [loading, setLoading] = useState();
  const [visibleCount, setVisibleCount] = useState(8);

  async function fetchExplore(filterValue = "") {
    setLoading(true);
    const url = filterValue
        ? `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
        : `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore`;

    const { data } = await axios.get(url);
    setExploreItem(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchExplore();
  }, [])

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  // Filtering
  const filterItems = (e) => {
    const value = e.target.value;
    setVisibleCount(8); // reset visible count when filter changes
    fetchExplore(value);
  };


  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={filterItems}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>

      {
        loading ?
          (
            <>
              {new Array(8).fill(0).map((_, index) => (
                <div
                  key={index}
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                >
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
            </>
          )
          :
          (
            <>
              {
                Array.isArray(exploreItem) &&
                exploreItem.slice(0, visibleCount).map((item, index) => (
                  <div
                    key={index}
                    className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                    style={{ display: "block", backgroundSize: "cover" }}
                  >
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
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
                          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
            </>
          )
      }

      {/* Load More Button */}
      {visibleCount < exploreItem.length && (
        <div 
          data-aos="custom-fadeUp"
          className="col-md-12 text-center">
          <button
            onClick={handleLoadMore}
            id="loadmore"
            className="btn-main lead"
          >
            Load more
          </button>
        </div>
      )}

    </>
  );
};

export default ExploreItems;
