import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";

const AuthorItems = ({ items, authorImage, loading }) => {
    return (
      <div className="de_tab_content">
        <div className="tab-1">
          <div className="row">
            {loading ? (
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

                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
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
            ) : (
              items.map((item, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="nft__item_wrap">
                      <Link to={`/item-details/${item.nftId}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt={item.title}
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
              ))
            )}
          </div>
        </div>
      </div>
    );
};

export default AuthorItems;