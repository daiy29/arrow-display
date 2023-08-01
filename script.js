const arrowElement = document.getElementById('arrow');
const delaySlider = document.getElementById('delaySlider');
const delayValueElement = document.getElementById('delayValue');
const pauseResumeBtn = document.getElementById('pauseResumeBtn');
let isPaused = false;
let intervalId;

function updateButtonState() {
  pauseResumeBtn.textContent = isPaused ? 'Resume' : 'Pause';
  pauseResumeBtn.className = isPaused ? 'resume' : 'pause';
}

function showArrow() {
  if (!isPaused) {
    const isArrowRight = Math.random() < 0.5;
    const arrowSrc = isArrowRight ? 'arrow-right.png' : 'arrow-left.png';
    arrowElement.src = arrowSrc;
    arrowElement.style.display = 'block';

    intervalId = setTimeout(() => {
      arrowElement.style.display = 'none';
    }, 1000); // Change the display time to 1 second
  }
}

function updateDelayValue() {
  delayValueElement.textContent = `Delay: ${delaySlider.value} ms`;
}

function scheduleNextArrow() {
  const delay = mapSliderValueToDelay(delaySlider.value);
  intervalId = setTimeout(() => {
    showArrow();
    scheduleNextArrow();
  }, delay);
}

function mapSliderValueToDelay(sliderValue) {
  const minSliderValue = parseInt(delaySlider.min);
  const maxSliderValue = parseInt(delaySlider.max);
  const minDelay = 2000;
  const maxDelay = 10000;
  const mappedDelay = ((sliderValue - minSliderValue) / (maxSliderValue - minSliderValue)) * (maxDelay - minDelay) + minDelay;
  return mappedDelay;
}

delaySlider.addEventListener('input', () => {
  clearTimeout(intervalId); // Clear the previous interval before updating the delay
  updateDelayValue();
  scheduleNextArrow();
});

pauseResumeBtn.addEventListener('click', () => {
  isPaused = !isPaused;
  updateButtonState();
  if (!isPaused) {
    scheduleNextArrow();
  } else {
    clearTimeout(intervalId); // Clear the interval if paused
  }
});

updateButtonState();
updateDelayValue();
scheduleNextArrow();
