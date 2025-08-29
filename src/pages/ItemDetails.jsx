import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {

  const { id } = useParams(); //authorId
  const [loading, setLoading] = useState(true);
  const [nft, setNft] = useState();

  async function fetchNftDetails(id) {
    setLoading(true);
    const { data } = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`);
    setNft(data);
    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchNftDetails(id);
  }, [id]);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {
                loading ?
                  (
                    <>
                      {/* Image */}
                      <div className="col-md-6 text-center" >
                        <div
                          style={{
                            aspectRatio: "1 / 1", 
                            width: "100%",
                            maxWidth: "500px",
                            margin: "0 auto 16px", // centers on smaller screens
                          }}
                        >
                          <Skeleton width="100%" height="100%" borderRadius="3px" />
                        </div>
                      </div>

                      {/* Text & info placeholders */}
                      <div className="col-md-6">
                        <div className="item_info">
                          {/* Title */}
                          <div style={{ marginBottom: "15px" }}>
                            <Skeleton width="80%" height="46px" />
                          </div>

                          {/* Views & Likes */}
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "10px",
                              marginBottom: "20px",
                            }}
                          >
                            <Skeleton
                              width="100px"
                              height="30px"
                              borderRadius="3px"
                              style={{ flex: "1 0 auto", maxWidth: "120px" }}
                            />
                            <Skeleton
                              width="100px"
                              height="30px"
                              borderRadius="3px"
                              style={{ flex: "1 0 auto", maxWidth: "120px" }}
                            />
                          </div>

                          {/* Description */}
                          <Skeleton width="100%" height="100px" />

                          {/* Owner & Creator placeholders */}
                          <div style={{ 
                            marginTop: "20px", 
                            display: "flex", 
                            flexDirection: "column", 
                            flexWrap: "wrap", 
                            gap: "20px" 
                          }}>

                            {/* Owner */}
                            <Skeleton
                              width="60px"
                              height="16px"
                            />
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <Skeleton width="50px" height="50px" borderRadius="50%" />
                              <Skeleton width="120px" height="16px" />
                            </div>

                            {/* Creator */}
                            <Skeleton
                              width="60px"
                              height="16px"
                            />
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <Skeleton width="50px" height="50px" borderRadius="50%" />
                              <Skeleton width="120px" height="16px" />
                            </div>

                            {/* Price */}
                            <Skeleton
                              width="60px"
                              height="16px"
                            />
                            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                              <Skeleton width="26px" height="26px" borderRadius="50%" />
                              <Skeleton width="70px" height="36px" />
                            </div>

                          </div>
                        </div>
                      </div>
                    </>

                  )
                  :
                  (
                    nft && (
                      <>
                        <div className="col-md-6 text-center">
                          <img
                            src={nft.nftImage}
                            className="img-fluid img-rounded mb-sm-30 nft-image"
                            alt=""
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="item_info">
                            <h2>{nft.title} #{nft.tag}</h2>

                            <div className="item_info_counts">
                              <div className="item_info_views">
                                <i className="fa fa-eye"></i>
                                {nft.views}
                              </div>
                              <div className="item_info_like">
                                <i className="fa fa-heart"></i>
                                {nft.likes}
                              </div>
                            </div>
                            <p>
                              {nft.description}
                            </p>
                            <div className="d-flex flex-row">
                              <div className="mr40">
                                <h6>Owner</h6>
                                <div className="item_author">
                                  <div className="author_list_pp">
                                    <Link to={`/author/${nft.ownerId}`}>
                                      <img className="lazy" src={nft.ownerImage} alt="" />
                                      <i className="fa fa-check"></i>
                                    </Link>
                                  </div>
                                  <div className="author_list_info">
                                    <Link to={`/author/${nft.ownerId}`}>{nft.ownerName}</Link>
                                  </div>
                                </div>
                              </div>
                              <div></div>
                            </div>
                            <div className="de_tab tab_simple">
                              <div className="de_tab_content">
                                <h6>Creator</h6>
                                <div className="item_author">
                                  <div className="author_list_pp">
                                    <Link to={`/author/${nft.creatorId}`}>
                                      <img className="lazy" src={nft.creatorImage} alt="" />
                                      <i className="fa fa-check"></i>
                                    </Link>
                                  </div>
                                  <div className="author_list_info">
                                    <Link to="/author">{nft.creatorName}</Link>
                                  </div>
                                </div>
                              </div>
                              <div className="spacer-40"></div>
                              <h6>Price</h6>
                              <div className="nft-item-price">
                                <img src={EthImage} alt="" />
                                <span>{nft.price}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>

                    )
                  )
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
