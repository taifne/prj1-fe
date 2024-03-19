import { useRef, useEffect } from "react";
import { gsap } from "gsap";

import img1 from "../../../../public/assets/images/hsoc-login/siem.png";
import img2 from "../../../../public/assets/images/hsoc-login/log-collection.png";
import img3 from "../../../../public/assets/images/hsoc-login/ticketing.png";
import img4 from "../../../../public/assets/images/hsoc-login/aggregation1.png";
import img5 from "../../../../public/assets/images/hsoc-login/report2.png";
import img6 from "../../../../public/assets/images/hsoc-login/knowledge.png";
import img7 from "../../../../public/assets/images/hsoc-login/threat.jpeg";
import img8 from "../../../../public/assets/images/hsoc-login/r&d.png";

import "./carousel.css";

const Carousel = () => {
    const ring = useRef<HTMLDivElement>(null);
    const images = [img1, img2, img3, img4, img5, img6, img7, img8];
    const texts = [
        "SIEM",
        "Log Collection",
        "Ticketing",
        "Aggregation",
        "Report",
        "Knowledge",
        "Threat",
        "R&D",
    ];

    useEffect(() => {
        const rotateCarousel = (index: number) => {
            gsap.to(ring.current, {
                rotationY: `-=${360 / images.length}`,
                ease: "power1.inOut",
                duration: 1.5,
                delay: 5,
                onComplete: () => rotateCarousel((index + 1) % images.length),
            });
        };
        gsap.timeline()
            // .set(".ring", { rotationY: 180, cursor: "grab" }) //set initial rotationY so the parallax jump happens off screen
            .set(".img", {
                rotateY: (i) => i * -(360 / images.length),
                transformOrigin: "50% 50% 1250px",
                z: -1250,
                backgroundImage: (i) => `url(${images[i]})`,
                backgroundPosition: "center",
                backfaceVisibility: "hidden",
                backgroundSize: "1250px 500px",
            })
            .from(".img", {
                duration: 1.5,
                y: 200,
                opacity: 0,
                stagger: 0,
                ease: "expo",
            })
            .add(() => {
                rotateCarousel(0);
                document.querySelectorAll(".img").forEach((img) => {
                    img.addEventListener("mouseenter", handleMouseEnter);
                    img.addEventListener("mouseleave", handleMouseLeave);
                });
            }, "-=0.5");

        // Event listeners for drag functionality
        // window.addEventListener("mousedown", dragStart);
        // window.addEventListener("touchstart", dragStart);
        // window.addEventListener("mouseup", dragEnd);
        // window.addEventListener("touchend", dragEnd);

        // Clean up event listeners on component unmount
        return () => {
            // window.removeEventListener("mousedown", dragStart);
            // window.removeEventListener("touchstart", dragStart);
            // window.removeEventListener("mouseup", dragEnd);
            // window.removeEventListener("touchend", dragEnd);
            document.querySelectorAll(".img").forEach((img) => {
                img.removeEventListener("mouseenter", handleMouseEnter);
                img.removeEventListener("mouseleave", handleMouseLeave);
            });
        };
    }, []);

    // Drag functions
    let xPos = 0;

    function dragStart(e) {
        if (e.touches) e.clientX = e.touches[0].clientX;
        xPos = Math.round(e.clientX);
        gsap.set(".ring", { cursor: "grabbing" });
        window.addEventListener("mousemove", drag);
        window.addEventListener("touchmove", drag);
    }

    function drag(e) {
        if (e.touches) e.clientX = e.touches[0].clientX;
        gsap.to(".ring", {
            rotationY: "-=" + ((Math.round(e.clientX) - xPos) % 360),
            onUpdate: () => {
                gsap.set(".img", { backgroundPosition: (i) => getBgPos(i) });
            },
        });
        xPos = Math.round(e.clientX);
    }

    function dragEnd() {
        window.removeEventListener("mousemove", drag);
        window.removeEventListener("touchmove", drag);
        gsap.set(".ring", { cursor: "grab" });
    }

    function getBgPos(i) {
        //returns the background-position string to create parallax movement in each image
        return (
            100 -
            (gsap.utils.wrap(
                0,
                360,
                (gsap.getProperty(".ring", "rotationY") as number) -
                    180 -
                    i * 45
            ) /
                360) *
                500 +
            "px 0px"
        );
    }
    const handleMouseEnter = (e: MouseEvent) => {
        const current = e.currentTarget as HTMLElement;
        gsap.to(".img", {
            opacity: (i, t) => (t === current ? 1 : 0.5),
            ease: "power3",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(".img", { opacity: 1, ease: "power2.inOut" });
    };

    return (
        <div className="stage ">
            <div className=" containerSlide  ">
                <div className="ring ring-0  " ref={ring}>
                    {images.map((img, index) => (
                        <div key={index} className="img ">
                            <div className="img-overlay bg-transparent text-6xl p-2 text-white pointer-events-none">
                                {texts[index]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carousel;
