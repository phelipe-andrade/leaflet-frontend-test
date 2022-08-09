import EndPoints from "./EndPoints.js";
const pointData = document.querySelector('.pointData');

export default class graphic {

  async selectPointData(namePoint) {
    const id = Number(namePoint.replace(/\D/g, ''));
    const result = await EndPoints.getPointData(id);

  }

  close(){
    const btnClose = document.querySelector('.close');
    if(!btnClose) return;
    btnClose.addEventListener('click', ()=>{pointData.classList.remove('active');}) 
  }

  insertData() {
    pointData.classList.add('active');
    var xValues = [100,200,300,400,500,600,700,800,900,1000];

    new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          data: [860,1140,1060,1060,1070,1110,1330,2210,7830,2478],
          borderColor: "red",
          fill: false
        },{
          data: [1600,1700,1700,1900,2000,2700,4000,5000,6000,7000],
          borderColor: "green",
          fill: false
        },{
          data: [300,700,2000,5000,6000,4000,2000,1000,200,100],
          borderColor: "blue",
          fill: false
        }]
      },
      options: {
        legend: {display: false}
      }
    });
  }

  async start(namePoint){
    await this.selectPointData(namePoint);
    this.insertData();
    this.close();
  }
  
}