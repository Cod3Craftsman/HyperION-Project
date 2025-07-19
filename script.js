const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
  lerp: 0.08 
});

function firstPageAnimation() {
  const tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    ease: "expo.inOut",
    duration: 2, 
  });

  tl.to(".boundingelem", {
    y: 0,
    ease: "expo.inOut",
    stagger: 0.3,
    duration: 2.5, 
    delay: -1.5,
  });

  tl.from("#herofooter", {
    y: -10,
    opacity: 0,
    duration: 2,
    delay: -1.5,
    ease: "expo.inOut",
  });
}

function circleMouseFollower(xscale = 1, yscale = 1) {
  const minicircle = document.querySelector("#minicicle");
  window.addEventListener("mousemove", function (e) {
    gsap.to(minicircle, {
      x: e.clientX,
      y: e.clientY,
      scaleX: xscale,
      scaleY: yscale,
      duration: 0.2,
      ease: "power2.out"
    });
  });
}

function circleChaptaKaro() {
  let xprev = 0;
  let yprev = 0;
  let timeout;

  window.addEventListener("mousemove", function (e) {
    clearTimeout(timeout);

    const xscale = gsap.utils.clamp(0.9, 1.1, (e.clientX - xprev) * 0.01);
    const yscale = gsap.utils.clamp(0.9, 1.1, (e.clientY - yprev) * 0.01);

    xprev = e.clientX;
    yprev = e.clientY;

    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(() => {
      const minicircle = document.querySelector("#minicicle");
      gsap.to(minicircle, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }, 150);
  });
}

function setupHoverImageEffects() {
  document.querySelectorAll(".elem").forEach(function (elem) {
    let rotate = 0;
    let diffrot = 0;
    const image = elem.querySelector("img");

    elem.addEventListener("mouseleave", () => {
      gsap.to(image, {
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    });

    elem.addEventListener("mousemove", function (e) {
      const bounds = elem.getBoundingClientRect();
      const diff = e.clientY - bounds.top;
      diffrot = e.clientX - rotate;
      rotate = e.clientX;

      gsap.to(image, {
        opacity: 1,
        top: `${diff}px`,
        left: `${e.clientX}px`,
        rotate: gsap.utils.clamp(-15, 15, diffrot * 0.3),
        ease: "power2.out",
        duration: 0.3
      });
    });
  });
}


firstPageAnimation();
circleMouseFollower();
circleChaptaKaro();
setupHoverImageEffects();
