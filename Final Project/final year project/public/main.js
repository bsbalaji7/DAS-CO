const tl = gsap.timeline({default: {duration:0.75,ease: "power2.in"}})
tl.fromTo('#Hammer',{y:100},{y:-30, rotation: '-30deg', yoyo:true, repeat:-1})
tl.fromTo('#plate',{y:0},{y:1,scale:1.2, yoyo:true, repeat:-1},'<')