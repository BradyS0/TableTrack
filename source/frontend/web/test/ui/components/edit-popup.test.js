import { describe, expect, jest } from '@jest/globals';
import { editPopup } from "../../../js/components/edit-popup.js";
import { floatToTime } from '../../../js/logic/format-utils.js';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('editPopup - textBox check', ()=>{
let popup;

  beforeEach(() => {
    popup = editPopup("Test pop up");
    document.body.appendChild(popup.overlay);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('editText opens input screen and submits value', () => {
    const onSubmit = jest.fn();
    const button = popup.add('Username')
    button.editText('olduser', onSubmit);

    // Click to open the edit screen
    button.click()


    const input = document.querySelector('input[type="text"]');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('olduser');

    // Change value and submit
    input.value = 'newuser';

    const form = document.querySelector('form');

    // Trigger form submit
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));

    // Or click submit button
    // submitBtn.click();

    // Now check if onSubmit was called with the input element
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith(input);
    expect(onSubmit.mock.calls[0][0].value).toBe('newuser');
  });

});


describe("editPopup - editPassword", ()=>{
  let popup;
  let editBtn;
  let onSubmit;

  beforeEach(() => {
    popup = editPopup('Edit Profile');
    document.body.appendChild(popup.overlay);

    onSubmit = jest.fn();
    editBtn = popup.add('Password')
    editBtn.editPassword(onSubmit);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  const getInputs = () => {
    const inputs = document.querySelectorAll('input[type="password"]');
    return {
      newPass: inputs[0],
      confirmNew: inputs[1],
      confirmOld: inputs[2],
    };
  };

  test('Testing password fields', ()=>{ 
    editBtn.click() //open the edit password option
    const {newPass,confirmNew,confirmOld} = getInputs()
    
    expect(newPass).toBeInTheDocument();
    expect(confirmNew).toBeInTheDocument();
    expect(confirmOld).toBeInTheDocument();

    expect(newPass.placeholder).toBe('New Password');
    expect(confirmNew.placeholder).toBe('Confirm New Password');
    expect(confirmOld.placeholder).toBe('Old Password');

    expect(newPass.minLength).toBe(8);
    expect(confirmNew.maxLength).toBe(0); // initially
  })


  test('Testing password fields - new and confirm input behaviour on update and incorrect inputs', ()=>{ 
    editBtn.click() //open the edit password option
    const {newPass,confirmNew} = getInputs()
    
    expect(confirmNew.maxLength).toBe(0); // initially

    let testPass = "testPassword"
    newPass.value = testPass
    newPass.dispatchEvent(new Event('input', { bubbles: true }));
    newPass.dispatchEvent(new Event('blur', { bubbles: true }));

    expect(confirmNew.maxLength).toBe(newPass.value.length); // after the fact
    confirmNew.value = "TestPassword"
    confirmNew.dispatchEvent(new Event('input', { bubbles: true }));

    const feedback = document.querySelector('.feedback-msg');
    expect(feedback).toBeInTheDocument();
    expect(feedback.classList.contains('feedback-fail')).toBe(true);

    feedback.remove()
 })

 test('Testing password fields - new and confirm input behaviour on valid inputs and then input changes', ()=>{ 
    editBtn.click() //open the edit password option
    const {newPass,confirmNew} = getInputs()
    
    expect(confirmNew.maxLength).toBe(0); // initially

    let testPass = "testPassword"
    newPass.value = testPass
    newPass.dispatchEvent(new Event('input', { bubbles: true }));
    newPass.dispatchEvent(new Event('blur', { bubbles: true }));

    confirmNew.value = testPass 
    confirmNew.dispatchEvent(new Event('input', { bubbles: true }));

    expect(confirmNew.style.outline).toBe("3px solid limegreen")
    expect(newPass.style.border).toBe(confirmNew.style.outline)

    confirmNew.value = "465pass"
    confirmNew.dispatchEvent(new Event('input', { bubbles: true }));
    expect(confirmNew.style.outline).toBe("none")
    expect(newPass.style.border).toBe("")
 })
})


describe("editPopup - editSchedule", ()=>{
  let popup;
  let editBtn;
  const onSubmit = jest.fn();
  let user;

  const mockSchedule = {
  Sunday: { open: 8, close: 21 },
  Monday: { open: "", close: "" },
  Tuesday: { open: 10, close: 22 },
  Wednesday: { open: 10, close: 22 },
  Thursday: { open: "", close: "" },
  Friday: { open: 10, close: 22 },
  Saturday: { open: 10, close: 22 },
};

  beforeEach(() => {
    user = userEvent.setup();
    popup = editPopup('Edit Profile');
    document.body.appendChild(popup.overlay);

    editBtn = popup.add('Edit Schedule')
    editBtn.editSchedule(mockSchedule,onSubmit);
  });
  
  afterEach(() => {
    document.body.innerHTML = '';
  });
  
  const getWeekFields = ()=>{
    editBtn.click();
    const inp = document.querySelectorAll(".schedule-row")
    return {sun:inp[0],mon:inp[1],tue:inp[2],
      wed:inp[3],thur:inp[4],fri:inp[5],sat:inp[6]}
  }

  test("testing edit schedule fields value population and changes submission", async ()=>{
    const {sun,thur} = getWeekFields()

    //behaviour for the open day
    let statusToggle = sun.querySelector('select')
    let input = sun.querySelector('.time-input')
    let checkbox = sun.querySelector('.day-check')
    
    expect(statusToggle.value).toBe("open")
    expect(input.disabled).toBe(true)
    await user.click(checkbox)
    expect(input.disabled).toBe(false)
    input.value = floatToTime(7.5)

     //behaviour for the closed day
    statusToggle = thur.querySelector('select')
    checkbox = thur.querySelector('.day-check')
    input = thur.querySelectorAll('.time-input')
    
    expect(statusToggle.value).toBe("closed")
    expect(input[0].disabled).toBe(true)
    
    await user.click(checkbox)
    expect(input[0].disabled).toBe(true)

    await user.selectOptions(statusToggle, "open" )
    expect(input[0].disabled).toBe(false)
    
    input[0].value = floatToTime(8.5)
    input[1].value = floatToTime(18.5)

    const form = document.querySelector('form')
    const submitButton = form.querySelector("button.submit")

    await user.click(submitButton)
    expect(onSubmit).toHaveBeenCalledTimes(1);

    const out = onSubmit.mock.calls[0][0]
    expect(Object.keys(out).length).toBe(2) //for sun and thur were submitted
    expect(out.Sunday).toBeInstanceOf(Object)
    expect(out.Thursday).toBeInstanceOf(Object)
    expect(out.Friday).toBeUndefined()

    expect(out.Thursday.open).toBe(8.5)
    expect(out.Thursday.close).toBe(18.5)
  })
})