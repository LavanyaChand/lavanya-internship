import React, { useState, useEffect, useRef } from 'react'

const Timer = ({ expiryDate }) => {

    const [timeLeft, setTimeLeft] = useState({
        hoursLeft: "0",
        minutesLeft: "0",
        secondsLeft: "0"
    });
    const startTime = useRef(null);
    const cancelId = useRef(null);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const countdown = new Date(expiryDate).getTime() - Date.now();
        const savedTime = 0;

        function updateTimer() {
            const millisElapsed = Date.now() - startTime.current + savedTime;
            let millisLeft = countdown - millisElapsed;

            if (millisLeft <= 0) {
                // Clamp at zero and mark expired
                millisLeft = 0;
                setTimeLeft({ hoursLeft: '0', minutesLeft: '0', secondsLeft: '0' });
                setStatus("EXPIRED");

                cancelAnimationFrame(cancelId.current);
                cancelId.current = null;
                return; // Exit early, we're done
            }

            const totalSeconds = Math.floor(millisLeft / 1000);
            const secondsLeft = totalSeconds % 60;
            const minutesLeft = Math.floor((totalSeconds / 60) % 60);
            const hoursLeft = Math.floor(totalSeconds / 3600);

            setTimeLeft({ hoursLeft, minutesLeft, secondsLeft });

            cancelId.current = requestAnimationFrame(updateTimer);
        }

        startTime.current = Date.now();
        cancelId.current = requestAnimationFrame(updateTimer);

        return () => cancelAnimationFrame(cancelId.current);
        // When this component is removed from the screen, 
        // or when the effect runs again, 
        // stop the animation loop so it doesn’t keep running in the background.
        // Without this cleanup, your updateTimer function could keep running endlessly and waste resources.


    }, [expiryDate])


  return (
        <>
            <div className="de_countdown">
                {
                    status === "EXPIRED" ?
                    (
                        <span>{status}</span>
                    )
                    :
                    (
                        <>
                            <span>{timeLeft.hoursLeft}h </span>
                            <span>{timeLeft.minutesLeft}m </span>
                            <span>{timeLeft.secondsLeft}s </span>
                        </>
                    )

    }
            {/* 5h 30m 32s */}
        </div >
      </>
  )
}

export default Timer




// import React, { useState, useRef, useEffect } from "react";

// const CountdownTimer = ({ expiryDate }) => {
//   // countdown: total time in milliseconds (e.g. 5 mins = 5 * 60 * 1000)

//   const [timeLeft, setTimeLeft] = useState({
//     hoursText: "00",
//     minutesText: "00",
//     secondsText: "00",
//   });

//   const [status, setStatus] = useState("");
//   const requestRef = useRef(null);
//   const startTimeRef = useRef(null);

//   const countdown = new Date(expiryDate).getTime() - Date.now();
//   const updateTimer = () => {
//     const millisElapsed = Date.now() - startTimeRef.current;
//     let millisLeft = countdown - millisElapsed;

//     if (millisLeft <= 0) {
//       // Clamp and mark expired
//       setTimeLeft({ hoursText: "00", minutesText: "00", secondsText: "00" });
//       setStatus("EXPIRED");

//       cancelAnimationFrame(requestRef.current);
//       requestRef.current = null;
//       return; // stop updating
//     }

//     const totalSeconds = Math.floor(millisLeft / 1000);
//     const hoursText = String(Math.floor(totalSeconds / 3600)).padStart(1, "0");
//     const minutesText = String(Math.floor((totalSeconds % 3600) / 60)).padStart(1, "0");
//     const secondsText = String(totalSeconds % 60).padStart(1, "0");

//     setTimeLeft({ hoursText, minutesText, secondsText });

//     requestRef.current = requestAnimationFrame(updateTimer);
//   };

//   useEffect(() => {
//     startTimeRef.current = Date.now();
//     requestRef.current = requestAnimationFrame(updateTimer);

//     // Cleanup on unmount
//     return () => {
//       if (requestRef.current) {
//         cancelAnimationFrame(requestRef.current);
//       }
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className="de_countdown">
//       {status === "EXPIRED" ? (
//         <span>{status}</span>
//       ) : (
//         <span>
//           {timeLeft.hoursText}h {timeLeft.minutesText}m {timeLeft.secondsText}s
//         </span>
//       )}
//     </div>
//   );
// };

// export default CountdownTimer;