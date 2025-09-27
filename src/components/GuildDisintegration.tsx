import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import html2canvas from "html2canvas";

gsap.registerPlugin(ScrollTrigger);

export default function GuildDisintegration() {
  useEffect(() => {
    const COUNT = 75;
    const REPEAT_COUNT = 3;

    // Get the image container element
    const imageContainer = document.getElementById("guild-image-container");
    if (!imageContainer) return;

    // Hide the original image initially
    imageContainer.style.opacity = "0";

    // Get the position of the image container
    const rect = imageContainer.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate the absolute position
    const absoluteTop = rect.top + scrollTop;
    const absoluteLeft = rect.left + window.pageXOffset;

    // Create capture element at the same position as the original image
    const captureEl = document.createElement("div");
    captureEl.id = "guild-capture";
    captureEl.style.width = "250px";
    captureEl.style.height = "250px";
    captureEl.style.position = "absolute";
    captureEl.style.left = `${absoluteLeft + (rect.width - 250) / 2}px`; // Center the capture element
    captureEl.style.top = `${absoluteTop + (rect.height - 250) / 2}px`; // Center the capture element
    captureEl.style.zIndex = "30";
    captureEl.style.pointerEvents = "none";

    const img = document.createElement("img");
    img.src = "/guild/download.png";
    img.style.width = "auto";
    img.style.height = "100%";

    captureEl.appendChild(img);
    document.body.appendChild(captureEl);

    html2canvas(captureEl, { backgroundColor: null }).then((canvas) => {
      const width = canvas.width;
      const height = canvas.height;
      const ctx = canvas.getContext("2d")!;
      const imageData = ctx.getImageData(0, 0, width, height);
      const dataList: ImageData[] = [];

      captureEl.style.display = "none"; // hide the original

      for (let i = 0; i < COUNT; i++) {
        dataList.push(ctx.createImageData(width, height));
      }

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          for (let l = 0; l < REPEAT_COUNT; l++) {
            const index = (x + y * width) * 4;
            const dataIndex = Math.floor(
              (COUNT * (Math.random() + (2 * x) / width)) / 3
            );
            for (let p = 0; p < 4; p++) {
              dataList[dataIndex].data[index + p] = imageData.data[index + p];
            }
          }
        }
      }

      interface ScrollTriggerConfig {
        trigger: string;
        start: string;
        end: string;
        scrub: boolean;
        onComplete?: () => void;
      }

      dataList.forEach((data, i) => {
        const clonedCanvas = canvas.cloneNode() as HTMLCanvasElement;
        clonedCanvas.getContext("2d")!.putImageData(data, 0, 0);

        // Generate random initial positions and rotation
        const randomAngle = (Math.random() - 0.5) * 2 * Math.PI;
        const randomRotationAngle = 60 * (Math.random() - 0.5);
        const initialX = 80 * Math.sin(randomAngle);
        const initialY = 80 * Math.cos(randomAngle);

        clonedCanvas.style.position = "absolute";
        clonedCanvas.style.left = `${absoluteLeft + (rect.width - 250) / 2}px`;
        clonedCanvas.style.top = `${absoluteTop + (rect.height - 250) / 2}px`;
        clonedCanvas.style.zIndex = "40";
        clonedCanvas.style.pointerEvents = "none";
        clonedCanvas.className = "capture-canvas";
        document.body.appendChild(clonedCanvas);

        // Reverse animation: particles come together to form the image
        const stVars: ScrollTriggerConfig = {
          trigger: "#guild-text-section",
          start: "top center",
          end: "bottom top",
          scrub: true,
          onComplete: () => {
            // Show the original image when animation completes
            if (imageContainer) {
              gsap.to(imageContainer, {
                opacity: 1,
                duration: 0.5,
                delay: 0.2
              });
            }
            // Hide and remove all canvas particles
            gsap.to(".capture-canvas", {
              opacity: 0,
              duration: 0.3,
              delay: 0.2,
              onComplete: () => {
                document.querySelectorAll(".capture-canvas").forEach(canvas => {
                  canvas.remove();
                });
              }
            });
          }
        };

        gsap.fromTo(
          clonedCanvas,
          {
            // Start state: scattered, transparent, rotated
            rotate: randomRotationAngle,
            x: initialX,
            y: initialY,
            opacity: 0,
            scale: 0.8,
          },
          {
            scrollTrigger: stVars,
            // End state: original position, fully visible, no rotation
            rotate: 0,
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            delay: (i / dataList.length) * 1.2, // Staggered animation
          }
        );
      });
    });

    // Cleanup function to remove appended elements and kill ScrollTriggers on unmount
    return () => {
      const captureEl = document.getElementById("guild-capture");
      if (captureEl) captureEl.remove();
      document.querySelectorAll(".capture-canvas").forEach(canvas => canvas.remove());
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return null; // no JSX
}
