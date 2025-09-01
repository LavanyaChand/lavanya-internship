import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  const { id } = useParams();
  const [seller, setSeller] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchTopSellers(userId) {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers?userId=${userId || id}`)
    setSeller(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchTopSellers(id);
  }, [id])

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div data-aos="fade"
            data-aos-easing="ease-in-out"
            data-aos-duration="1000"
          >
            {loading ? (
              <div className="skeleton-wrapper">
                <div className="col-md-12">
                  <ol className="author_list">
                    {new Array(12).fill(0).map((_, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </div>
                        <div
                          style={{
                            paddingLeft: "70px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                          }}
                        >
                          <Skeleton width="80px" height="14px" />
                          <Skeleton width="30px" height="14px" />
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div

                className="col-md-12">
                <ol className="author_list">
                  {Array.isArray(seller) &&
                    seller.map((item, index) => (
                      <li key={index}>
                        <div className="author_list_pp">
                          <Link to={`/author/${item.authorId}`}>
                            <img
                              className="lazy pp-author"
                              src={item.authorImage}
                              alt={item.authorName}
                            />
                            <i className="fa fa-check"></i>
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${item.authorId}`}>
                            {item.authorName}
                          </Link>
                          <span>{item.price} ETH</span>
                        </div>
                      </li>
                    ))}
                </ol>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};


export default TopSellers;
