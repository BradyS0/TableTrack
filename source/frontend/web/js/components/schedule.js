import { floatToTime } from "../logic/format-utils.js ";

// Creates the full schedule card
export function createScheduleCard(scheduleData) {
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

  const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

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

    if (open<0 || close<0 || open===close) {
      timeLabel.textContent = "closed";
      timeLabel.classList.add("closed");
    } else {
      timeLabel.textContent = `${floatToTime(open)} - ${floatToTime(close)}`;
    }

    title.onclick = ()=>{
      title.classList.toggle('active')
      list.classList.toggle('active')
    }

    item.append(dayLabel,timeLabel);
    list.appendChild(item);
  });

  card.appendChild(list);
  card.schedule = scheduleData;
  return card;
}