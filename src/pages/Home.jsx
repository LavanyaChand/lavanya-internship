// import React, { useEffect } from "react";
// import BrowseByCategory from "../components/home/BrowseByCategory";
// import HotCollections from "../components/home/HotCollections/HotCollections";
// import Landing from "../components/home/Landing";
// import LandingIntro from "../components/home/LandingIntro";
// import NewItems from "../components/home/NewItems";
// import TopSellers from "../components/home/TopSellers";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import '../css/styles/animate.css'

// const Home = () => {
//   useEffect(() => {
//     window.scrollTo(0, 0);

//     // Hide AOS targets until we re-initialize
//     document.documentElement.classList.add("aos-preload");

//     const timer = setTimeout(() => {
//       AOS.refreshHard(); // refresh all AOS animations
//       document.documentElement.classList.remove("aos-preload");
//     }, 600); // 600ms delay before showing animations

//     return () => {
//       clearTimeout(timer);
//       document.documentElement.classList.remove("aos-preload");
//     };
//   }, []);

//   return (
//     <div id="wrapper">
//       <div className="no-bottom no-top" id="content">
//         <div id="top"></div>
//         <Landing />
//         <LandingIntro />
//         <HotCollections />
//         <NewItems />
//         <TopSellers />
//         <BrowseByCategory />
//       </div>
//     </div>
//   );
// };

// export default Home;


import React, { useEffect } from "react";
import BrowseByCategory from "../components/home/BrowseByCategory";
import HotCollections from "../components/home/HotCollections/HotCollections";
import Landing from "../components/home/Landing";
import LandingIntro from "../components/home/LandingIntro";
import NewItems from "../components/home/NewItems";
import TopSellers from "../components/home/TopSellers";
import AOS from "aos";
import "aos/dist/aos.css";


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Refresh AOS when Home mounts
    AOS.refresh();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <Landing />
        <LandingIntro />
        <HotCollections />
        <NewItems />
        <TopSellers />
        <BrowseByCategory />
      </div>
    </div>
  );
};

export default Home;
