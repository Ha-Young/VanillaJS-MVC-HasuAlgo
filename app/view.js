// ================================
// START YOUR View HERE
//
// https://developer.mozilla.org/ko/docs/Glossary/MVC
//
// ================================

const view = (function () {
  return {
    showDate: (input) => {
      const year = input.getFullYear();
      const month = input.getMonth() + 1;
      const date = input.getDate();

      alert(`${year}년 ${month}월 ${date}일 입니다.`);
    },
  };
})();

export default view;
