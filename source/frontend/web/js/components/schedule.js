// Converts float (e.g. 2.5 -> "2:30am", 14.5 -> "2:30pm")
function formatFloatTime(timeFloat) {
  if (timeFloat === "" || timeFloat == null) return "";
  const hour = Math.floor(timeFloat);
  const minute = (timeFloat % 1) * 60;
  const period = hour >= 12 ? "pm" : "am";
  const adjustedHour = ((hour + 11) % 12) + 1;
  const minuteStr = minute === 0 ? "" : ":" + String(minute).padStart(2, "0");
  return `${adjustedHour}${minuteStr}${period}`;
}

// Creates the full schedule card
function createScheduleCard(scheduleData) {
const head = document.querySelector('head');
  if(!head.innerHTML.includes('schedule.css'))
    head.innerHTML+='<link rel="stylesheet" href="css/components/schedule.css">'

  const card = document.createElement("div");
  card.className = "schedule-card";

  const title = document.createElement("h3");
  title.textContent = "Weekly Schedule";
  card.appendChild(title);

  const list = document.createElement("ul");
  list.className = "schedule-list";

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  days.forEach(day => {
    const item = document.createElement("li");
    item.className = "schedule-item";

    const dayLabel = document.createElement("span");
    dayLabel.className = "schedule-day";
    dayLabel.textContent = day.slice(0, 3);

    const timeLabel = document.createElement("span");
    timeLabel.className = "schedule-time";

    const open = scheduleData[day]?.open;
    const close = scheduleData[day]?.close;

    if (!open || !close) {
      timeLabel.textContent = "closed";
      timeLabel.classList.add("closed");
    } else {
      timeLabel.textContent = `${formatFloatTime(open)} - ${formatFloatTime(close)}`;
    }

    item.append(dayLabel,timeLabel);
    list.appendChild(item);
  });

  card.appendChild(list);
  return card;
}

// Example usage:
const schedule = {
  Sunday: { open: 8, close: 21 },
  Monday: { open: "", close: "" },
  Tuesday: { open: 10, close: 22 },
  Wednesday: { open: 10, close: 22 },
  Thursday: { open: 10, close: 22 },
  Friday: { open: 10, close: 22 },
  Saturday: { open: 10, close: 22 },
};

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("app");
  const scheduleCard = createScheduleCard(schedule);
  container.append(scheduleCard);
});