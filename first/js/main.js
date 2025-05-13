const hoursInput = document.getElementById("hours");

// 숫자 이외 입력 실시간 차단
hoursInput.addEventListener("input", function () {
  // 숫자가 아닌 문자 제거
  this.value = this.value.replace(/[^0-9]/g, "");

  // 세 자리 이상 입력 제한
  if (this.value.length > 2) {
    this.value = this.value.slice(0, 2);
  }
  // 24보다 큰 값은 24로 자동 변경
  if (Number(this.value) > 24) {
    this.value = 24;
  }
  // 0 이하 입력 시 1로 변경
  if (Number(this.value) < 1 && this.value !== "") {
    this.value = 1;
  }
});

// 폼 제출 시 결과 출력
document.getElementById("planForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const field = document.getElementById("field").value;
  const hours = Number(document.getElementById("hours").value);
  const days = hours > 0 ? Math.ceil(10000 / hours) : 0;
  document.getElementById(
    "result-topic"
  ).innerHTML = `당신은 <em class="highlight">${field}</em> 전문가가 되기 위해서 <br>`;

  document.getElementById(
    "result-hours"
  ).innerHTML = `대략 <em class="highlight">${days}</em>일 이상 훈련하셔야 합니다! :)`;

  document.getElementById("button-group").classList.remove("hidden");
  document.getElementById("result-group").classList.remove("hidden");
});

// 훈련하러가기 모달 열기/닫기
const trainBtn = document.getElementById("train-btn");
const trainModal = document.getElementById("train-modal");
const closeTrainModal = document.getElementById("close-train-modal");

trainBtn.addEventListener("click", function () {
  trainModal.style.display = "flex";
});

closeTrainModal.addEventListener("click", function () {
  trainModal.style.display = "none";
});

trainModal.addEventListener("click", function (e) {
  if (e.target === trainModal) trainModal.style.display = "none";
});

// 공유하기 버튼
const shareBtn = document.getElementById("share-btn");
const shareModal = document.getElementById("share-modal");
const closeModal = document.getElementById("close-modal");
const copyBtn = document.getElementById("copy-link");
const copyAlert = document.getElementById("copy-alert");
const twitterShare = document.getElementById("twitter-share");

// 1. Web Share API 우선 사용
shareBtn.addEventListener("click", function () {
  if (navigator.share) {
    navigator.share({
      title: document.title,
      text: "1만 시간의 법칙을 함께 도전해보세요!",
      url: window.location.href,
    });
  } else {
    // 지원하지 않으면 커스텀 모달 오픈
    shareModal.style.display = "flex";
  }
});

// 2. 모달 닫기
closeModal.addEventListener("click", function () {
  shareModal.style.display = "none";
});
shareModal.addEventListener("click", function (e) {
  if (e.target === shareModal) shareModal.style.display = "none";
});

// 3. 링크 복사
copyBtn.addEventListener("click", function () {
  navigator.clipboard.writeText(window.location.href).then(() => {
    copyAlert.style.display = "inline";
    setTimeout(() => {
      copyAlert.style.display = "none";
    }, 1500);
  });
});

// 4. 트위터 공유 링크
twitterShare.addEventListener("click", function (e) {
  e.preventDefault();
  const text = encodeURIComponent("1만 시간의 법칙을 함께 도전해보세요!");
  const url = encodeURIComponent(window.location.href);
  window.open(
    `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
    "_blank"
  );
});
