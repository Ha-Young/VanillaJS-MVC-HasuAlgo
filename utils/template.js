import { template } from "lodash";

export default class Template {
  /**
   * Sets up defaults for all the Template methods such as a default template
   *
   * @constructor
   */
  constructor() {
    this.defaultTemplate
      = `<div class="{{defaultClass}} {{colorState}}" style="height: {{height}}px; transform: {{transform}};">`
      + `<span class="{{numberSpan}}">{{blockNumber}}</span>`
      + `</div>`;
  }

  show(data) {
    let view = "";

    data.forEach((element) => {
      let template = this.defaultTemplate;
      template = template.replace("{{defaultClass}}", element.defaultClass);
      template = template.replace("{{colorState}}", element.colorState);
      template = template.replace("{{height}}", element.height);
      template = template.replace("{{transform}}", element.transform);
      template = template.replace("{{numberSpan}}", element.numberSpan);
      template = template.replace("{{blockNumber}}", element.blockNumber);
      view += template;
    });

    return view;
  }
}