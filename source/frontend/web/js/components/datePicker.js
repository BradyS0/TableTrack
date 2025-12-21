import flatpickr from "flatpickr";
import "flatpickr/dist/themes/light.css"
import "../../css/components/date-picker.css"

const MAX_DAYS_AHEAD = 28;

//container is the parent element for the date element
//invalid_days is an array from [0-6] Sun:0 - Sat:6
export function createDatePicker(container, invalid_days = []){
    const input = document.createElement('div')
    input.innerHTML = `<input type="text" class="date-fp"/>`
    input.className = "date-fp-wrapper"
    container.append(input)
    
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate()+1)
    while(invalid_days.includes(tomorrow.getDay()))
        tomorrow.setDate(tomorrow.getDate()+1)

    const datepickr = flatpickr(input.firstElementChild, {
    defaultDate : tomorrow,
    allowInput : false,
    minDate : tomorrow,
    maxDate : new Date(tomorrow).fp_incr(MAX_DAYS_AHEAD),
    appendTo : container,
    disable : [
        function(date){
            return invalid_days.includes(date.getDay())
        }
    ],
    onChange: function(selectedDates, dateStr, instance) {
        // This removes focus from the input field
        instance._input.blur();
    }
  });

// to trigger the on change behaviour of the date element
//datepickr.element.addEventListener("change",()=>{
//console.log(datepickr.element.value)
//})

return datepickr.element;
}
