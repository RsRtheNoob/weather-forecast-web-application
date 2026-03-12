document.querySelectorAll(".today-week-element").forEach(el => {
  el.addEventListener("mousedown", () => {
    if (el.classList.contains("selected")) return;

    document
      .querySelector(".today-week-element.selected")
      .classList.remove("selected");

    el.classList.add("selected");
    
    const x = document.querySelector(".today-week-sub.visible");
    const y = document.querySelector(".today-week-sub.hidden");
    x.classList.add("hidden");
    x.classList.remove("visible");
    y.classList.add("visible");
    y.classList.remove("hidden");
  });
});