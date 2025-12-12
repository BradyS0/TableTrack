import {generateTemplate} from "../utils.js"

export function display_popup_msg(heading,msg, redirect=()=>{}){
   const body = document.querySelector('body')

   const popup = generateTemplate(`<div class="popup">
    <div class="popup-content">
      <h2>${heading}</h2>
      <p>${msg.trim()}</p>
      <button class="btn">OK</button>
    </div>
    </div>`)

  //Ok button
  const okBtn = popup.querySelector("button")
  
  body.appendChild(popup)

  okBtn.addEventListener("click",()=>{
    body.removeChild(popup)
    redirect()
  })
}