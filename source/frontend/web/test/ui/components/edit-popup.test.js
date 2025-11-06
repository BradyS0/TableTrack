import { jest } from '@jest/globals';
import { editPopup } from "../../../js/components/edit-popup.js";
import '@testing-library/jest-dom';

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
    const submitBtn = document.querySelector('.submit');

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
