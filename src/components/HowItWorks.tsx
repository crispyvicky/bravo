import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const chipImg = "/apple/chip.webp";
const frameImg = "/apple/frame.webp";
const frameVideo = "/apple/frame.webm";
import { animateWithGsap } from "../../utils/animations";

const HowItWorks = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    console.error('Video load error:', e);
    // Optionally, you can set a fallback image or handle the error
  };

  useGSAP(() => {
    gsap.from("#chip", {
      scrollTrigger: {
        trigger: "#chip",
        start: "20% bottom",
      },
      opacity: 0,
      scale: 0,
      duration: 2,
      ease: "power2.inOut",
    });

    animateWithGsap(".g_fadeIn", {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        {/* Animated Chip */}
        <div id="chip" className="flex-center my-4 w-full rounded-full ">
          <img src={chipImg} alt="Tech Chip" width={100} height={100} />
        </div>

        {/* Title + Subtitle */}
        <div className="flex flex-col items-center text-center">
          <h2 className="hiw-title font-sixtyfour text-xl w-full">
            Powering the Future.<br />Crafted for Impact.
          </h2>
          {/* <p className="hiw-subtitle max-w-2xl">
            I design platforms that combine bleeding-edge tech with user-first experiences. From blazing speed to visual delight — everything just works.
          </p> */}
        </div>

        {/* Video Showcase */}
        <div className=" mt-1 ">
          <div className="hiw-stage">
            <div className="hiw-frame z-10">
              <img
                src={frameImg}
                alt="Showcase Frame"
              />
            </div>
            <div className="hiw-video">
              <video
                className="w-full h-full object-cover pointer-events-none"
                playsInline
                preload="metadata"
                muted
                loop
                autoPlay
                poster={frameImg}
                disablePictureInPicture
                controls={false}
                ref={videoRef}
                onError={handleVideoError}
              >
                <source src={frameVideo} type="video/webm" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* <p className="text-gray mt-3 text-center font-semibold">
            Explore  my work in Action
          </p> */}
        </div>

        {/* Text Section */}
        <div className="hiw-text-container">
          {/* Left Block */}


          {/* Right Block */}

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
