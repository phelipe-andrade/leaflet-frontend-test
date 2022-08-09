import EndPoints from "./EndPoints.js";
const pointData = document.querySelector('.pointData');

export default class graphic {

  async selectPointData(idPoint) {
    const id = Number(idPoint);
    this.datas = await EndPoints.getPointData(id);
  }

  // Fecha o popup dos das do ponto atual.
  close(){
    const btnClose = document.querySelector('.close');
    if(!btnClose) return;
    btnClose.addEventListener('click', ()=>{
      pointData.classList.remove('active');
      this.isGraphic.destroy();
    }) 
  }

  // Alerta se o período selecionado possui ou não informações.
  alertDate(has, dateRange){
    const alert = document.querySelector('.contem');
    if (has < 2 && dateRange) alert.classList.add('active');
    else alert.classList.remove('active');

  }

  separateInformation(dateRange){
    this.data = {
      data:[],
      temperatura:[],
      umidade:[],
      precipitacao:[],
      visibilidade:[],
      vento: [],
    }

    const range = {
      start: 0,
      end: this.datas.length - 1,
    }

    // Verifica as datas que deseja ser vistas, caso não especifique,
    // pegara toda a informação da API.
    let has = 0;
    if (dateRange) {
      this.datas.forEach((data, index)=>{
        if (data.data === dateRange.startdata) {
          has += 1;
          range.start = index;
        }
        if (data.data === dateRange.enddata) {
          has += 1;
          range.end = index
        };
      })
    }

    this.alertDate(has, dateRange);
    if (dateRange && has < 2) return;

    for (let i = range.start; i <= range.end; i +=1 ){
      const keys = Object.keys(this.datas[i]);
      for (const key of keys){
        this.data[key].push(this.datas[i][key]);
      }
    }
        
  }

  // Seleciona o periodo em que se deseja observar melhor
  // as informalções.
  setDatesOnCalendar(event) {
    
    const start = document.querySelector('#startdata');
    const end = document.querySelector('#enddata');

    if (!event){ 
      start.value = this.data.data[0];
      end.value = this.data.data[this.data.data.length -1];
    } else {
      const dateRange = {
        startdata: start.value,
        enddata: end.value,
      }
      this.separateInformation(dateRange);
      this.insertData();
    }
  }


  // Inserção das informações para compor os gráficos direto da API pela variável this.data
  insertData() {
    
    pointData.classList.add('active');
    
    const xValues = this.data.data;
    if (this.isGraphic) this.isGraphic.destroy();

    this.isGraphic = new Chart("myChart", {
      type: "line",
      data: {
        labels: xValues,
        datasets: [{
          data: this.data.temperatura,
          backgroundColor: "#F03D2A",
          borderColor: "#F03D2A",
          fill: false,
          borderWidth: 1,
          label:'Tempereratura'
        },{
          data: this.data.umidade,
          backgroundColor: "#13678A",
          borderColor: "#13678A",
          fill: false,
          borderWidth: 1,
          label: 'Umidade'
        },{
          data: this.data.precipitacao,
          backgroundColor: "#F8731E",
          borderColor: "#F8731E",
          fill: false,
          borderWidth: 1,
          label: 'Precipitação'
        },{
          data: this.data.visibilidade,
          backgroundColor: "#27D94D",
          borderColor: "#27D94D",
          fill: false,
          borderWidth: 1,
          label: 'Visibilidade',
        },{
          data: this.data.vento,
          backdroundColor:"#29C9FF",
          borderColor: "#29C9FF",
          fill: false,
          borderWidth: 1,
          label: 'Vento'
        }]
        
      },
      options: {
        legend: {display: true},
        
      }
    });
    const canvas = document.querySelector('canvas').style;
    canvas.width = '100%'
    canvas.height = '100%'
  }

  async start(idPoint){
    await this.selectPointData(idPoint);
    this.separateInformation();
    this.insertData();
    this.setDatesOnCalendar();
    this.close();
  }
  
}