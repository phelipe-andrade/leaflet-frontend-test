import Graphic from './Graphic.js';

const start = document.querySelector('#startdata');
const end = document.querySelector('#enddata');

export default function filterDate(currentPoint) {
  start.addEventListener('change', (event)=>{currentPoint.setDatesOnCalendar(event)})
  end.addEventListener('change', (event)=>{currentPoint.setDatesOnCalendar(event)})
}