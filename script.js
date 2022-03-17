const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];

/*
loop through array and return the index of the step that has the word "active" in its classname,
that step will the the current step since it'll be active and displaying
*/
let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active");
    // will return -1 if no card is "active"
})  

// if not card is active (currentStep = -1) make the first card (at index 0) active by default 
/*
if (currentStep < 0) {
    currentStep = 0;
    formSteps[currentStep].classList.add("active");
    showCurrentStep();
}
*/

if (currentStep < 0) {
    currentStep = 0;
    showCurrentStep();
}

multiStepForm.addEventListener("click", e => {
    let incrementor;
    if (e.target.matches("[data-next]")) {
        incrementor = 1;
    }
    else if (e.target.matches("[data-previous]")) {
        incrementor = -1;
    }

    //if the next or previous button aren't pressed then do nothing; === doesn't work
    if (incrementor == null) return;

    const allInputs = [...formSteps[currentStep].querySelectorAll("input")];
    const allValid = allInputs.every(input => input.reportValidity());

    /*
    if all inputs are filled out (allValid = true) then add the incrementor to currentStep,
    (sets current step to the correct index depending on button pushed),
    then displays currentStep step/card
    */
    if (allValid) {
        currentStep += incrementor;
        showCurrentStep();
    }
})

formSteps.forEach(step => {
    step.addEventListener("animationend", e => {
      formSteps[currentStep].classList.remove("hide")
      e.target.classList.toggle("hide", !e.target.classList.contains("active"))
    })
})

function showCurrentStep() {
    formSteps.forEach((step, index) => {
        step.classList.toggle("active", index === currentStep)
    })
}
