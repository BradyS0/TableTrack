
export function display_popup_msg(heading,msg, redirect=()=>{}){
   const body = document.querySelector('body')

   const popup = document.createElement('div')
   const container = document.createElement('div')
    
   popup.classList.add('popup')
   container.classList.add('popup-content')


  //Ok button
  const okBtn = document.createElement('button');
  okBtn.classList.add('btn');
  okBtn.textContent = ' OK ';

  // Header
  const head = document.createElement('h2');
  head.textContent = heading;

  // msg_body
  const msg_body = document.createElement('p');
  msg_body.textContent = msg;
 
  container.append(head,msg_body,okBtn)
  popup.append(container)
  
  body.appendChild(popup)

  okBtn.addEventListener("click",()=>{
    body.removeChild(popup)
    redirect()
  })

}