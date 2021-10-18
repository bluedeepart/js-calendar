const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

class StClass {
  static startDate(y, m) {
    return new Date(y, m, 1);
  }

  static endDate(y, m) {
    return new Date(y, m + 1, 0);
  }

  static dayWordLimit() {
    let dayWorldLimit;
    dayWorldLimit = 1;
    if (window.screen.width >= 768) {
      dayWorldLimit = 3;
    }
    return dayWorldLimit;
  }

  static createNode(root, tag, ...cssClass) {
    const tagName = document.createElement(tag);
    cssClass = cssClass.join(" ");
    tagName.className = cssClass;
    root.appendChild(tagName);
    return tagName;
  }

  static checkInputValue = (y, m, d) => {
    return (y, m, d) ? new Date(y, m, d) : new Date();
  };
}

export default class Calender {
  constructor() {
    this.d = new Date();
    this.curYear = this.d.getFullYear();
    this.curMonth = this.d.getMonth();
    this.curDate = this.d.getDate();

    this.cY = this.d.getFullYear();
    this.cM = this.d.getMonth();

    this.today = StClass.checkInputValue(
      this.gsCurrentYear,
      this.gsCurrentMonth,
      this.curDate
    );
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.day = this.today.getDay();
    this.date = this.today.getDate();
    this.startDate = StClass.startDate(this.year, this.month);
    this.endDate = StClass.endDate(this.year, this.month);
    this.prevEndDate = StClass.endDate(this.year, this.month - 1);
    this.nextStartDate = StClass.startDate(this.year, this.month + 1);

    this.dayWordLimit = StClass.dayWordLimit();
    this.updateDate(this.gsCurrentYear, this.gsCurrentMonth);
  }

  get gsCurrentMonth() {
    return this.curMonth;
  }
  get gsCurrentYear() {
    return this.curYear;
  }

  /* getter setter for next month */
  set gsNextMonth(prevMonth) {
    this.curMonth = prevMonth;
  }

  get gsNextMonth() {
    return this.curMonth++;
  }

  set gsNextYear(prevYear) {
    this.curYear = prevYear;
  }

  get gsNextYear() {
    return this.curYear++;
  }

  /* getter setter for previus month */
  set gsPrevMonth(nextMonth) {
    this.curMonth = nextMonth;
  }

  get gsPrevMonth() {
    return this.curMonth--;
  }

  set gsPrevYear(nextYear) {
    this.curYear = nextYear;
  }

  get gsPrevYear() {
    return this.curYear--;
  }

  showPrevMonth() {
    if (this.gsPrevMonth === 0) {
      this.gsPrevMonth = months.length - 1;
      this.gsPrevYear;
    }
    this.gsPrevMonth = this.gsCurrentMonth;
    this.updateMonthAndYear(this.gsCurrentYear, this.gsCurrentMonth);
    this.updateDate(this.gsCurrentYear, this.gsCurrentMonth);
    this.addHoliday();
  }

  showNextMonth() {
    if (this.gsNextMonth >= months.length - 1) {
      this.gsNextMonth = 0;
      this.gsNextYear;
    }
    this.gsNextMonth = this.gsCurrentMonth;
    this.updateMonthAndYear(this.gsCurrentYear, this.gsCurrentMonth);
    this.updateDate(this.gsCurrentYear, this.gsCurrentMonth);
    this.addHoliday();
  }

  updateMonthAndYear(y = null, m = null) {
    const monthYear = document.querySelector(".month-and-year");
    const heading = monthYear.querySelector("h4");
    heading.innerHTML = `${months[m]} ${y}`;
    const dayListItem = document.querySelectorAll(".day-list-item");

    const headYear = heading.textContent.split(" ").join("").indexOf(this.cY);
    const headMonth = heading.textContent
      .split(" ")
      .join("")
      .indexOf(months[this.cM]);

    if (headYear !== -1 && headMonth !== -1) {
      dayListItem.forEach((d, index) => {
        if (index === this.day) {
          d.classList.add("active");
        }
      });
    } else {
      dayListItem.forEach((d) => {
        d.classList.remove("active");
      });
    }
  }

  updateDate(year, month) {
    const dateList = document.querySelector(".date-list");

    const startDate = StClass.startDate(year, month);
    const endDate = StClass.endDate(year, month);
    const prevEnd = StClass.endDate(year, month - 1);
    const nextStart = StClass.startDate(year, month + 1);

    let firstDay = startDate.getDay();
    let lastDay = days.length - endDate.getDay();
    let lastDate = endDate.getDate();
    let prevEndDate = prevEnd.getDate();
    let nextStartDate = nextStart.getDate();

    if (dateList) {
      dateList.innerHTML = "";
      for (let prev = prevEndDate - firstDay + 1; prev <= prevEndDate; prev++) {
        const dateListItem = StClass.createNode(
          dateList,
          "li",
          "date-list-item",
          "prev-month"
        );
        dateListItem.innerHTML = `<span>${prev}</span>`;
      }

      for (let i = 1; i <= lastDate; i++) {
        const monthYear = document.querySelector(".month-and-year");
        const heading = monthYear.querySelector("h4");
        const headYear = heading.textContent.indexOf(this.cY);
        const headMonth = heading.textContent.indexOf(months[this.cM]);

        const dateListItem = StClass.createNode(
          dateList,
          "li",
          "date-list-item"
        );
        dateListItem.innerHTML = `<span>${i}</span>`;
        if (headYear !== -1 && headMonth !== -1) {
          if (parseInt(dateListItem.textContent) === this.curDate) {
            dateListItem.classList.add("active");
          }
        }
      }

      for (let next = nextStartDate; next < lastDay; next++) {
        const dateListItem = StClass.createNode(
          dateList,
          "li",
          "date-list-item",
          "next-month"
        );
        dateListItem.innerHTML = `<span>${next}</span>`;
      }
    }
  }

  addHoliday() {
    const dayListItem = document.querySelectorAll(".day-list-item");
    const dateListItem = document.querySelectorAll(".date-list-item");

    dayListItem.forEach((d, i, dy) => {
      dy[0].classList.add("holiday");
      dy[days.length - 1].classList.add("holiday");
    });

    dateListItem.forEach((d, i, dt) => {
      dt[0].classList.add("holiday");
      for (let j = 0; j < dateListItem.length; j = j + days.length) {
        dt[j].classList.add("holiday");
      }
      for (
        let j = days.length - 1;
        j < dateListItem.length;
        j = j + days.length
      ) {
        dt[j].classList.add("holiday");
      }
    });
  }

  init(root, eventRoot) {
    // console.log(
    //   `${this.day} ${this.date}-${this.gsCurrentMonth}-${this.gsCurrentYear}`
    // );
    const ui = new UI(root);
    ui.createMonthAndYear();
    ui.createDays();
    ui.createDate();

    const eventsUI = new EventsUI(eventRoot);
    eventsUI.createPopup();
    eventsUI.previewDate();
    eventsUI.showAllEvents();

    this.updateMonthAndYear(this.gsCurrentYear, this.gsCurrentMonth);
    this.addHoliday();
  }
}

class UI extends Calender {
  constructor(root) {
    super();
    this.rootNode = document.getElementById(root);
  }

  createMonthAndYear() {
    const monthYear = StClass.createNode(
      this.rootNode,
      "div",
      "month-and-year"
    );
    monthYear.innerHTML = `
      <button class="cal-nav cal-nav-prev">&lt;</button>
      <h4>${months[this.gsCurrentMonth]} ${this.gsCurrentYear}</h4>
      <button class="cal-nav cal-nav-next">&gt;</button>
    `;
    const calNavPrev = monthYear.querySelector(".cal-nav-prev");
    const calNavNext = monthYear.querySelector(".cal-nav-next");
    calNavPrev.addEventListener("click", this.showPrevMonth.bind(this));
    calNavNext.addEventListener("click", this.showNextMonth.bind(this));
  }

  createDays() {
    const dayList = StClass.createNode(this.rootNode, "ul", "day-list");
    dayList.id = "day_list";

    days.map((day, index) => {
      const d = day.slice(0, this.dayWordLimit);
      const dayListItem = StClass.createNode(dayList, "li", "day-list-item");
      dayListItem.dataset.day = d;
      dayListItem.textContent = d;
    });
  }

  createDate() {
    const dateList = StClass.createNode(this.rootNode, "ul", "date-list");
    dateList.id = "date_list";
    this.updateDate(this.gsCurrentYear, this.gsCurrentMonth);
  }
}

class Event {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
}

class Events {
  constructor() {
    this.curDate = new Date().getDate();
    this.curMonth = new Date().getMonth();
    this.root = document.querySelector("body");
    this.events = LocalSt.getEventsFromLocalSt();
    // this.events = [];
  }

  get gsNewEventAdd() {
    return this.events;
  }

  set gsRemoveEvent(parentEl) {
    const id = parentEl.id;
    return this.gsRemoveEvent.splice(id, 1);
  }

  get gsRemoveEvent() {
    return this.gsNewEventAdd;
  }

  addEventHandler(e) {
    e.preventDefault();
    let evTitle = document.getElementById("event_title").value;
    let evDate = document.getElementById("event_date").value;
    const eventList = document.querySelector(".event-list");

    if (evTitle.trim() !== "" && evDate.trim() !== "") {
      const newEv = new Event(evTitle, evDate);
      this.gsNewEventAdd.push(newEv);
      LocalSt.addEventsFromLocalSt(newEv);
      this.togglePopup();
      this.checkEventList(eventList);
    }
  }

  removeEventHandler(e) {
    const eventList = document.querySelector(".event-list");
    const btn = e.target;
    const parentEl = btn.parentElement;
    this.gsRemoveEvent = parentEl;
    LocalSt.removeEventsFromLocalSt(parentEl.id);
    parentEl.remove();
    this.checkEventList(eventList);
  }

  checkEventList(eventList) {
    if (this.gsCheckEventLength === 0) {
      this.noEventMessage(eventList);
    } else {
      this.gsUpdateAllEvents = eventList;
    }
  }

  get gsCheckEventLength() {
    return this.gsNewEventAdd.length;
  }

  noEventMessage(eventList) {
    const noEvent = StClass.createNode(eventList, "li", "no-event");
    noEvent.innerHTML = `<li>No Event Added.</li>`;
    return noEvent;
  }

  set gsUpdateAllEvents(eventList) {
    if (this.gsCheckEventLength === 0) {
      this.noEventMessage(eventList);
    } else {
      eventList.innerHTML = "";
      this.gsNewEventAdd.map((event, index) => {
        this.createEventListItem(eventList, event, index);
      });
    }
  }

  createEventListItem(eventList, event, index) {
    const d = new Date(event.date).getDate();
    const m = months[new Date(event.date).getMonth()].slice(0, 3);
    const evDate = `${d} ${m}`;

    const eventListItem = StClass.createNode(
      eventList,
      "li",
      "event-list-item"
    );
    eventListItem.id = index;
    eventListItem.innerHTML = `
    <div class="event-title">${event.title}</div>
    <div class="event-des">${evDate} </div>
    <div class="cancel">&times;</div>
    `;
    eventListItem
      .querySelector(".cancel")
      .addEventListener("click", this.removeEventHandler.bind(this));
  }

  createPopup() {
    const addEventWrapper = StClass.createNode(
      this.root,
      "div",
      "add-event-wrapper"
    );
    const overlay = StClass.createNode(this.root, "div", "overlay");
    const addEventForm = StClass.createNode(
      addEventWrapper,
      // "form",
      "div",
      "add-event-form"
    );
    // addEventForm.setAttribute("method", "POST");
    const popupHeader = StClass.createNode(
      addEventForm,
      "div",
      "add-event-header"
    );
    const popupbody = StClass.createNode(addEventForm, "div", "add-event-body");
    const popupFooter = StClass.createNode(
      addEventForm,
      "div",
      "add-event-footer"
    );
    const popupTitle = StClass.createNode(popupHeader, "h3", "add-event-title");
    const closeBtn = StClass.createNode(popupHeader, "div", "cancel");
    const formGroup1 = StClass.createNode(popupbody, "div", "form-group");
    const formGroup2 = StClass.createNode(popupbody, "div", "form-group");
    const label1 = StClass.createNode(formGroup1, "label", "form-label");
    const label2 = StClass.createNode(formGroup2, "label", "form-label");
    const titleInput = StClass.createNode(formGroup1, "input", "form-control");
    const dateInput = StClass.createNode(formGroup2, "input", "form-control");

    const cancelBtn = StClass.createNode(
      popupFooter,
      "button",
      "btn",
      "btn-secondary"
    );
    const submitBtn = StClass.createNode(
      popupFooter,
      "button",
      "btn",
      "btn-info",
      "ml-3"
    );

    cancelBtn.innerHTML = "Cancel";
    submitBtn.innerHTML = "Add Event";
    // submitBtn.setAttribute("type", "submit");
    popupTitle.innerHTML = "Add Event";
    closeBtn.innerHTML = "&times;";
    label1.innerHTML = "Event Title";
    label2.innerHTML = "Event Date";
    titleInput.setAttribute("type", "text");
    titleInput.id = "event_title";
    dateInput.setAttribute("type", "date");
    dateInput.id = "event_date";

    addEventForm.addEventListener("submit", this.addEventHandler.bind(this));
    overlay.addEventListener("click", this.togglePopup.bind(this));
    cancelBtn.addEventListener("click", this.togglePopup.bind(this));
    closeBtn.addEventListener("click", this.togglePopup.bind(this));
    submitBtn.addEventListener("click", this.addEventHandler.bind(this));

    return addEventWrapper, overlay;
  }
}

class EventsUI extends Events {
  constructor(eventRoot) {
    super();
    this.rootNode = document.getElementById(eventRoot);
  }

  previewDate() {
    const currentDate = StClass.createNode(this.rootNode, "h2", "current-date");
    currentDate.innerHTML = `${this.curDate} ${months[this.curMonth].slice(
      0,
      3
    )}`;
    return currentDate;
  }

  showAllEvents() {
    const eventWrapper = StClass.createNode(
      this.rootNode,
      "div",
      "event-wrapper"
    );
    const eventHeader = StClass.createNode(eventWrapper, "div", "event-header");
    eventHeader.innerHTML = `
    <h5>All Events</h5>
    <button><span>&plus;</span></button>
    `;
    eventHeader
      .querySelector("button")
      .addEventListener("click", this.togglePopup.bind(this));
    const eventBody = StClass.createNode(eventWrapper, "div", "event-body");
    const eventList = StClass.createNode(eventBody, "ul", "event-list");

    this.gsUpdateAllEvents = eventList;

    return eventWrapper;
  }

  togglePopup() {
    const popup = document.querySelector(".add-event-wrapper").classList;
    const overlay = document.querySelector(".overlay").classList;
    let evTitle = document.getElementById("event_title");
    let evDate = document.getElementById("event_date");

    if (popup.contains("show") && overlay.contains("show")) {
      popup.remove("show");
      overlay.remove("show");
    } else {
      popup.add("show");
      overlay.add("show");
    }
    evTitle.value = "";
    evDate.value = "";
  }
}

class LocalSt extends Events {
  //get events from local storage
  static getEventsFromLocalSt() {
    let events = "";
    if (localStorage.getItem("events") === null) {
      events = [];
    } else {
      events = JSON.parse(localStorage.getItem("events"));
    }
    return events;
  }

  //set events to local storage
  static addEventsFromLocalSt(ev) {
    const events = LocalSt.getEventsFromLocalSt();
    events.push(ev);
    localStorage.setItem("events", JSON.stringify(events));
  }

  //remove events from local storage
  static removeEventsFromLocalSt(id) {
    const events = LocalSt.getEventsFromLocalSt();
    console.log(id);
    events.splice(id, 1);
    localStorage.setItem("events", JSON.stringify(events));
  }
}
