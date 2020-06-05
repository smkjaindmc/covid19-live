var firstDots = ["#dot1", "#dot1-2", "#dot1-3", "#dot1-4"],
  secondDots = ["#dot2", "#dot2-2", "#dot2-3", "#dot2-4"],
  map = document.getElementById("map"),
  group2 = ["#outlines", ".hotspot"];

//repeating the hotspots
function revolveOne() {
  var tl = new TimelineMax({
    repeat: -1
  });

  tl.add("begin1");
  tl.fromTo(
    firstDots,
    1,
    {
      opacity: 0,
      scale: 0,
      transformOrigin: "50% 50%"
    },
    {
      transformOrigin: "50% 50%",
      opacity: 1,
      scale: 10,
      ease: Sine.easeOut
    },
    "begin1"
  );
  tl.to(
    firstDots,
    0.5,
    {
      opacity: 0,
      transformOrigin: "50% 50%",
      scale: 12.5,
      ease: Sine.easeOut
    },
    "begin1+=1"
  );

  return tl;
}

function revolveTwo() {
  var tl = new TimelineMax({
    repeat: -1
  });

  tl.add("begin2");
  tl.fromTo(
    secondDots,
    1,
    {
      opacity: 0,
      scale: 0,
      transformOrigin: "50% 50%"
    },
    {
      transformOrigin: "50% 50%",
      opacity: 1,
      scale: 10,
      ease: Sine.easeOut
    },
    "begin2+=0.5"
  );
  tl.to(
    secondDots,
    0.5,
    {
      opacity: 0,
      transformOrigin: "50% 50%",
      scale: 12.5,
      ease: Sine.easeOut
    },
    "begin2+=1.5"
  );

  return tl;
}

var repeat = new TimelineMax();
//adding a relative label becuase otherwise the first will go on forever
repeat.add("beginBase");
repeat.add(revolveOne(), "beginBase");
repeat.add(revolveTwo(), "beginBase");

//interaction
function zoomIn(country) {
  //zooming in part
  var currentCountry = document.getElementById(country),
    s = currentCountry.getBBox(),
    newView = "" + s.x + " " + s.y + " " + (s.width + 200) + " " + s.height,
    group1 = [".text-" + country, ".x-out"],
    tl = new TimelineMax({});

  tl.add("zIn");
  tl.fromTo(
    map,
    1.5,
    {
      attr: { viewBox: "0 0 1795.2 875.1" }
    },
    {
      attr: { viewBox: newView }
    },
    "zIn"
  );
  tl.to(
    ".text-" + country,
    0.1,
    {
      display: "block"
    },
    "zIn"
  );
  tl.fromTo(
    group2,
    0.25,
    {
      opacity: 1
    },
    {
      opacity: 0,
      ease: Circ.easeIn
    },
    "zIn"
  );
  tl.fromTo(
    currentCountry,
    0.35,
    {
      opacity: 0
    },
    {
      opacity: 1,
      ease: Circ.easeOut
    },
    "zIn+=0.5"
  );
  tl.fromTo(
    group1,
    0.5,
    {
      opacity: 0
    },
    {
      opacity: 0.65,
      ease: Sine.easeOut
    },
    "zIn+=1"
  );
}

function zoomOut(geo) {
  //zooming out part
  var currentArea = document.getElementById(geo),
    group3 = [".text-" + geo, ".x-out"],
    tl = new TimelineMax();

  tl.add("zOut");
  tl.to(
    group3,
    0.5,
    {
      opacity: 0,
      ease: Sine.easeIn
    },
    "zOut"
  );
  tl.to(
    map,
    1,
    {
      attr: { viewBox: "0 0 1795.2 875.1" }
    },
    "zOut"
  );
  tl.to(
    group2,
    0.25,
    {
      opacity: 1,
      ease: Sine.easeOut
    },
    "zOut+=1"
  );
  tl.to(
    ".text-" + geo,
    0.1,
    {
      display: "none"
    },
    "zOut+=2"
  );
  tl.to(
    currentArea,
    1,
    {
      opacity: 0,
      ease: Sine.easeIn
    },
    "zOut+=0.4"
  );
}

$(".hotspot").on("click", function () {
  var area = this.getAttribute("data-name");
  $(".x-out").attr("data-info", area);
  zoomIn(area);
});

$(".x-out").on("click", function () {
  var area = this.getAttribute("data-info");
  zoomOut(area);
});
