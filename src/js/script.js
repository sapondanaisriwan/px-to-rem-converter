const baseElement = document.querySelector("#base-field");
const pxInputElement = document.querySelector("#px-field");
const remInputElement = document.querySelector("#rem-field");
const emInputElement = document.querySelector("#em-field");
const percentInputElement = document.querySelector("#percent-field");
const dummyElements = document.querySelectorAll(".dummy");

const copyElements = document.querySelectorAll(".copy-icon");

copyElements.forEach((element) => {
  element.addEventListener("click", (event) => {
    const target = event.target;

    const parentElement = target.closest(".unit-group-wrapper");
    const inputField = parentElement.querySelector("input");
    const iconElement = parentElement.querySelector("i");
    let unit = "";

    if (inputField.classList.contains("unit-px")) {
      unit = "px";
    } else if (inputField.classList.contains("unit-rem")) {
      unit = "rem";
    } else if (inputField.classList.contains("unit-em")) {
      unit = "em";
    } else if (inputField.classList.contains("unit-percent")) {
      unit = "%";
    }

    if (iconElement && navigator.clipboard) {
      inputField.select();
      navigator.clipboard.writeText(`${inputField.value}${unit}`);
      iconElement.classList.remove("bx-copy-alt");
      iconElement.classList.add("bx-check");
      setTimeout(() => {
        iconElement.classList.remove("bx-check");
        iconElement.classList.add("bx-copy-alt");
      }, 2000);
    }
  });
});

const BASE = "base";
const PIXEL = "pixel";
const REM = "rem";
const EM = "em";
const PERCENT = "percent";

function calculatePixel(value, base) {
  const rem = value / base;
  const em = rem;
  return [value, rem, em, rem * 100];
}

function calculateRemEm(value, base) {
  return [value * base, value, value, value * 100];
}

function calculatePercent(percent, base) {
  const rem = percent / 100;
  const em = rem;
  return [rem * base, rem, em, percent];
}

function updateDummyText(size) {
  dummyElements.forEach((element) => {
    element.style.fontSize = `${size}px`;
  });
}

function updateValues(unit, px, rem, em, percentage) {
  switch (unit) {
    case PIXEL:
      remInputElement.value = rem;
      emInputElement.value = em;
      percentInputElement.value = percentage;
      break;
    case REM:
      pxInputElement.value = px;
      emInputElement.value = em;
      percentInputElement.value = percentage;
      break;
    case EM:
      pxInputElement.value = px;
      percentInputElement.value = percentage;
      remInputElement.value = rem;
      break;
    case PERCENT:
      pxInputElement.value = px;
      emInputElement.value = em;
      remInputElement.value = rem;
      break;
    default:
      pxInputElement.value = px;
      emInputElement.value = em;
      remInputElement.value = rem;
      percentInputElement.value = percentage;
  }
  updateDummyText(px);
}

pxInputElement.addEventListener("input", (event) => {
  const [px, rem, em, percentage] = calculatePixel(
    +event.target.value,
    +baseElement.value
  );

  updateValues(PIXEL, px, rem, em, percentage);
});

remInputElement.addEventListener("input", (event) => {
  const [px, rem, em, percentage] = calculateRemEm(
    +event.target.value,
    +baseElement.value
  );

  updateValues(REM, px, rem, em, percentage);
});

emInputElement.addEventListener("input", (event) => {
  const [px, rem, em, percentage] = calculateRemEm(
    +event.target.value,
    +baseElement.value
  );
  updateValues(EM, px, rem, em, percentage);
});

percentInputElement.addEventListener("input", (event) => {
  const [px, rem, em, percentage] = calculatePercent(
    +event.target.value,
    +baseElement.value
  );

  updateValues(PERCENT, px, rem, em, percentage);
});

baseElement.addEventListener("input", (event) => {
  updateValues(BASE, px, rem, em, percentage);
});
