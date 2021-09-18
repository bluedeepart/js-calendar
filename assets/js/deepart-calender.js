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

  static createNode(root, tag, cssClass) {
    const tagName = document.createElement(tag);
    tagName.classList.add(cssClass);
    root.appendChild(tagName);
    return tagName;
  }

  static checkInputValue = (y, m) => {
    return (y, m) ? new Date(y, m) : new Date();
  };
}

class Calender {
  d = new Date();
  curYear = this.d.getFullYear();
  curMonth = this.d.getMonth();
  curDate = this.d.getDate();

  constructor() {
    this.today = StClass.checkInputValue();
    this.year = this.today.getFullYear();
    this.month = this.today.getMonth();
    this.day = this.today.getDay();
    this.date = this.today.getDate();
    this.startDate = StClass.startDate(this.year, this.month);
    this.endDate = StClass.endDate(this.year, this.month);
    this.prevEndDate = StClass.endDate(this.year, this.month - 1);
    this.nextStartDate = StClass.startDate(this.year, this.month + 1);
    this.dayWordLimit = StClass.dayWordLimit();
  }

  get gsCurrentMonth() {
    return this.month;
  }
  get gsCurrentYear() {
    return this.year;
  }

  /* getter setter for next month */
  set gsNextMonth(prevMonth) {
    this.month = prevMonth;
  }

  get gsNextMonth() {
    return this.month++;
  }

  set gsNextYear(prevYear) {
    this.year = prevYear;
  }

  get gsNextYear() {
    return this.year++;
  }

  /* getter setter for previus month */
  set gsPrevMonth(nextMonth) {
    this.month = nextMonth;
  }

  get gsPrevMonth() {
    return this.month--;
  }

  set gsPrevYear(nextYear) {
    this.year = nextYear;
  }

  get gsPrevYear() {
    return this.year--;
  }

  showPrevMonth() {
    if (this.gsPrevMonth === 0) {
      this.gsPrevMonth = months.length - 1;
      this.gsPrevYear;
    }
    this.gsPrevMonth = this.gsCurrentMonth;
    console.log(
      `Updated Month: ${this.gsCurrentMonth} and Updated Year ${this.gsCurrentYear}`
    );
  }

  showNextMonth() {
    if (this.gsNextMonth >= months.length - 1) {
      this.gsNextMonth = 0;
      this.gsNextYear;
    }
    this.gsNextMonth = this.gsCurrentMonth;
    console.log(
      `Updated Month: ${this.gsCurrentMonth} and Updated Year ${this.gsCurrentYear}`
    );
  }

  init(root, eventRoot) {
    console.log(
      `${this.day} ${this.date}-${this.gsCurrentMonth}-${this.gsCurrentYear}`
    );
    const ui = new UI(root);
    ui.createMonthAndYear();
    ui.createDays();
    ui.createDate();

    const eventsUI = new EventsUI(eventRoot);
    eventsUI.previewDate();
    eventsUI.showAllEvents();
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
      if (index === this.day) {
        dayListItem.classList.add("active");
      }
    });
  }

  createDate() {
    const dateList = StClass.createNode(this.rootNode, "ul", "date-list");
    dateList.id = "date_list";
    let firstDay = this.startDate.getDay();
    let lastDay = days.length - this.endDate.getDay();
    let lastDate = this.endDate.getDate();
    let prevEndDate = this.prevEndDate.getDate();
    let nextStartDate = this.nextStartDate.getDate();

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
      const dateListItem = StClass.createNode(dateList, "li", "date-list-item");
      dateListItem.innerHTML = `<span>${i}</span>`;
      if (i === this.date) {
        dateListItem.classList.add("active");
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

class Events {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
}

class EventsUI extends Calender {
  constructor(eventRoot) {
    super();
    this.rootNode = document.getElementById(eventRoot);
  }

  addEvent() {
    console.log("Event Added");
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
    let events = [
      new Events("Yashvi's Birthday", "10 Aug", "8:00 AM"),
      new Events("Divisha's Birthday", "18 May", "6:00 PM"),
    ];
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
      .addEventListener("click", this.addEvent);

    const eventBody = StClass.createNode(eventWrapper, "div", "event-body");

    if (events.length === 0) {
      eventBody.innerHTML = `<p>No Event</p>`;
    } else {
      const eventList = StClass.createNode(eventBody, "ul", "event-list");
      events.map((event) => {
        const eventListItem = StClass.createNode(
          eventList,
          "li",
          "event-list-item"
        );
        eventListItem.innerHTML = `
        <div class="event-title">${event.title}</div>
        <div class="event-des">${event.date} </div>
        `;
      });
    }

    return eventWrapper;
  }
}
