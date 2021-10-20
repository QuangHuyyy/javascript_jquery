window.addEventListener("load", function () {
  const slider = document.querySelector(".slider");
  const sliderMain = document.querySelector(".slider-main");
  const sliderItems = document.querySelectorAll(".slider-item");
  const btnNext = document.querySelector(".slider-right");
  const btnPrev = document.querySelector(".slider-left");
  const dotItems = document.querySelectorAll(".slider-dot-item");
  const sliderItemWidth = sliderItems[0].offsetWidth;
  const sliderLength = sliderItems.length;
  let translateX = 0;
  let index = 0;

  btnNext.addEventListener("click", function () {
    handleChangeSlider(1);
  });
  btnPrev.addEventListener("click", function () {
    handleChangeSlider(-1);
  });

  dotItems.forEach((item, indexDot) => {
    item.onclick = function () {
      handleEnable(indexDot);

      document
        .querySelector(".slider-dot-item.active")
        .classList.remove("active");

      this.classList.add("active");

      index = indexDot;
      translateX = -1 * indexDot * sliderItemWidth;
      sliderMain.style.transform = `translateX(${translateX}px)`;
    };
  });

  function handleChangeSlider(direction) {
    if (direction === 1) {
      if (index < sliderLength - 1) {
        translateX -= sliderItemWidth;
        sliderMain.style.transform = `translateX(${translateX}px)`;
        index++;
      } else return;
    } else if (direction === -1) {
      if (index > 0) {
        translateX += sliderItemWidth;
        sliderMain.style.transform = `translateX(${translateX}px)`;
        index--;
      } else return;
    }
    handleEnable(index);
    document
      .querySelector(".slider-dot-item.active")
      .classList.remove("active");
    dotItems[index].classList.add("active");
  }

  function handleEnable(i) {
    if (i === 0) {
      btnPrev.classList.add("enabled");
    } else if (i === sliderLength - 1) {
      btnNext.classList.add("enabled");
    } else {
      btnNext.classList.remove("enabled");
      btnPrev.classList.remove("enabled");
    }
  }
});
