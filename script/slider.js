
/*Hero Carousel*/

TweenMax.to(".background", 2, {
    width: "100%",
    ease: Expo.easeInOut
})

TweenMax.from(".nav", 1.5, {
    delay: 1.2,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
})

TweenMax.from(".blocks", 1.5, {
    delay: 1.6,
    opacity: 0,
    x: -60,
    ease: Expo.easeInOut
})

TweenMax.from(".hero", 2, {
    delay: 2.5,
    opacity: 0,
    x: 600,
    ease: Expo.easeInOut
})

TweenMax.staggerFrom(".title-container > div", 3, {
    delay: 4.4,
    y: "500",
    ease: Elastic.easeOut.config(2, 0.4)
}, 0.2)


TweenMax.from(".content p", 2, {
    delay: 6.5,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
})

TweenMax.from(".content .button-header", 2, {
    delay: 5.8,
    opacity: 0,
    y: 20,
    ease: Expo.easeInOut
})

TweenMax.staggerFrom(".media ul li", 1.5, {
    delay: 7,
    opacity: 0,
    x: -30,
    ease: Expo.easeInOut
}, 0.08)
