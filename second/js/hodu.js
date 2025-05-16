const btnTop = document.querySelector(".btn-top");
const footer = document.querySelector("footer");

// 스크롤 시 버튼 노출 및 푸터 오버랩 방지
window.addEventListener("scroll", () => {
  // 1. 스크롤 시 버튼 보이기/숨기기
  if (window.scrollY > 0) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }

  // 2. 푸터 아래로 버튼이 내려가지 않게 처리
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const footerTop = footer.offsetTop;
  if (scrollY + windowHeight > footerTop) {
    btnTop.style.position = "absolute";
    btnTop.style.bottom = windowHeight + scrollY - footerTop + 20 + "px";
  } else {
    btnTop.style.position = "fixed";
    btnTop.style.bottom = "50px";
  }
});

// 3. 부드럽게 최상단으로 스크롤
btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
