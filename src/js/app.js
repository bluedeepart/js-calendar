"use strict";

import Calender from "./deepart-calender.js";

window.addEventListener("DOMContentLoaded", function () {
  const calender = new Calender();
  calender.init("calender", "events");
});
