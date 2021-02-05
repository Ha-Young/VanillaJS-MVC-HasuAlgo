export default class Controller {
  constructor(view, model) {
    this._temp = {};
    this.view = view;
    this.model = model;

    view.addEvent(
      "$inputNumber",
      "input",
      this.handleEventForUserTypingValue.bind(this)
    );
    view.addEvent(
      "$selectSort",
      "input",
      this.handleEventForUserSortType.bind(this)
    );
    view.addEvent(
      "$buttonRun",
      "click",
      this.handleEventForUserRunClick.bind(this)
    );
  }

  handleEventForUserTypingValue(event) {
    const typedValue = event.target.value;
    const isValid = this.checkValidTypedValue(typedValue);

    if (isValid) {
      this.writeInstantValue("value", typedValue);
      return;
    }

    event.target.value = typedValue.slice(0, typedValue.length - 1);
  }

  handleEventForUserSortType(event) {
    this.writeInstantValue("sortType", event.target.value);
  }

  handleEventForUserRunClick(event) {
    try {
      this.checkValidInputLength();
      this.checkSortType();
    } catch (error) {
      alert(error.message);
      return;
    }

    const sortType = this._temp.sortType;
    const isRunning = !!this.model.getProperty(sortType, "isRunning");

    if (isRunning) {
      this.view.render("clear", sortType);
      this.model.clearProperty(sortType);
      clearTimeout(this.model.getProperty(sortType, "timeoutId"));
      const TIME_TO_AVOID_COLLISION = 800;
      setTimeout(() => this.handleEventForUserRunClick(), TIME_TO_AVOID_COLLISION);
      return;
    }

    this.model.setProperty(sortType, "value", this._temp.value);
    this.model.setProperty(sortType, "isRunning", true);
    this.model.setProperty(
      sortType,
      "collection",
      this.model.convertValueToCollection(sortType));

    const sortedCollection = this.model
      .getProperty(sortType, "collection")
      .slice()
      .sort((a, b) => a.value - b.value);

    const stickElements = [];

    for (let i = 0; i < sortedCollection.length; i++) {
      const stick = this.view.makeElement("div", "stick");
      stickElements.push(
        this.view.manufactureStick(sortType, stick, i, sortedCollection)
      );
    }

    const $article = this.view.makeElement("article", "article-" + sortType, "article-" + sortType);

    this.view.appendChild("$mainAnimationContainer", $article);

    stickElements
    .sort((a, b) => Number(a.getAttribute("data-index")) - Number(b.getAttribute("data-index")))
    .forEach(stick => this.view.appendChild("$article-" + sortType, stick));

    this.view.setCaches(sortType, stickElements);
    this.initiateAnimation(sortType);
  }

  initiateAnimation(sortType) {
    const ARTICLE_TRANSITION_TIME = 500;
    setTimeout(() => {
      this.view.render("init", sortType);
      this.handleAnimation(sortType);
    }, ARTICLE_TRANSITION_TIME);
  }

  handleAnimation(sortType) {
    const STICK_TRANSITION_TIME = 1000;
    this.model[sortType]((act, sortType, index) => {
      const timeoutId = setTimeout(() => {
        this.view.render(act, sortType, index);
        if (act === "finished") return;
        this.handleAnimation(sortType);
        }, STICK_TRANSITION_TIME);
      this.model.setProperty(sortType, "timeoutId", timeoutId);
      }
    );
  }

  checkValidTypedValue(value) {
    const typedValue = value.slice(-1);
    const isNumber = typeof +typedValue === "number" && !Number.isNaN(+typedValue);
    const isCommaOrSpace = typedValue === "," || typedValue === " ";

    if (isNumber || isCommaOrSpace) return true;
    return false;
  }

  checkValidInputLength() {
    const userValue = this._temp.value + ",";
    let shouldBeDivided = false;
    let count = 0;
    for (const character of userValue) {
      if (!shouldBeDivided && typeof Number(character) === "number") {
        shouldBeDivided = true;
        continue;
      }

      if (shouldBeDivided && character === "," || character === " ") {
        count++;
        shouldBeDivided = false;
      }
    }

    if (count < 5 || 10 < count) {
      throw new Error("should input over than 5 or less than 10.");
    }
  }

  checkSortType() {
    const hasSortType = !!this._temp.sortType;
    if (!hasSortType) throw new Error("should select sort type.");
  }

  writeInstantValue(category, value) {
    this._temp[category] = value;
  }
}
