const LS_THEME = 'theme';

export default class Model {
	constructor() {
    const localStorage = window.localStorage;
		const sortList = [];
  }

  initDatas(data) {
    if (!data && typeof data !== 'string') {
      throw new Error("Model's initDatas data parameter is not right");
    }

    const splitData = data.split(',').trim();
    splitData.map((char) => {
      const parsedInt = parseInt(char);

      if (parsedInt === NaN) {
        // Error 처리
      }

      return parsedInt;
    });

    this.sortList = splitData;
  }
}
