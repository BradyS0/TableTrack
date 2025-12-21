import { floatToTime } from "../logic/format-utils.js";
import  '../../css/components/schedule.css';
import { generateTemplate } from "../utils.js"

export const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

// Creates the full schedule card
export function createScheduleCard(scheduleData) {
  
  const card = generateTemplate(`<div class="schedule-card">
    <h3>Weekly Schedule</h3></div>`)

  const list = generateTemplate(`<ul class="schedule-list"/>`)

  DAYS.forEach(day => {
    const open = scheduleData[day]?.open;
    const close = scheduleData[day]?.close;

    const item = generateTemplate(`<li class="schedule-item">
      <span class="schedule-day">${day.slice(0,3)}</span>
      ${(open<0 || close<0 || open===close) ?
        `<span class="schedule-time closed">closed</span>` :
        `<span class="schedule-time">${floatToTime(open)} - ${floatToTime(close)}</span>`
      }
      </li>`)

    list.appendChild(item);
  });

  const title = card.querySelector('h3')
  title.onclick = ()=>{
    title.classList.toggle('active')
    list.classList.toggle('active')
  }

  card.appendChild(list);
  card.schedule = scheduleData;
  return card;
}