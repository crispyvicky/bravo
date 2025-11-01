import React, { useRef } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const chipImg = "/apple/chip.jpeg";
const frameImg = "/apple/frame.png";
const frameVideo = "/apple/frame.mp4";
import { animateWithGsap } from "../../utils/animations";

const HowItWorks = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
        <div id="chip" className="flex-center my-20 w-full">
          <img src={chipImg} alt="Tech Chip" width={180} height={180} />
        </div>

        {/* Title + Subtitle */}
        <div className="flex flex-col items-center text-center">
          <h2 className="hiw-title">
            Powering the Future.<br />Crafted for Impact.
          </h2>
          {/* <p className="hiw-subtitle max-w-2xl">
            I design platforms that combine bleeding-edge tech with user-first experiences. From blazing speed to visual delight — everything just works.
          </p> */}
        </div>

        {/* Video Showcase */}
        <div className=" mt-10 ">
          <div className="flex-center relative h-full">
            <div className="overflow-hidden">
              <img
                src={frameImg}
                alt="Showcase Frame"
                className="relative z-10 bg-transparent"
              />
            </div>
            <div className="hiw-video">
              <video
                className="pointer-events-none"
                playsInline
                preload="none"
                muted
                loop
                autoPlay
                ref={videoRef}
              >
                <source src={frameVideo} type="video/mp4" />
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
