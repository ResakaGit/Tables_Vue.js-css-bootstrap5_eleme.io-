new Vue({
    el: '#app2',
    data () {
      return {
        Datos: [],
        DatosCentro:[],
        DatosNorte:[],
        DatosDomiocilio:[],
        loading: true,
        errored: false,
        CamasLiresTotal:0,
      }
    },
    SeñalarTabla () {
      $('#table').bootstrapTable({
          data: this.Datos
      })
    },
    methods:{
      SumarCamasLibres(){
        let CamasArray = 0;
        for(let i=0; i < this.Datos.length; i++){
          CamasArray = CamasArray + this.Datos[i].camaslibres;
          this.CamasLiresTotal = CamasArray;  
        }
          
      },
    GetforAxios(){
      axios.get('http://192.168.1.43:3300/api/events')
        .then(response => {
          this.Datos = response.data,
          this.SumarCamasLibres();
          this.ContructorDatosCentro();
          this.ContructorDatosNorte();
          this.ContructorDatosDomicilio();
        })
        .catch(error => {
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false);
        
      },
      ContructorDatosCentro(){
        let NewArray = this.Datos.filter(ClinicaCentro => {
          return ClinicaCentro.ubic_nombre === "CLÍNICA ESPERANZA CENTRO";
        })
        this.DatosCentro = NewArray;
        // console.log("DATOS CENTRO",this.DatosCentro);

      },
      ContructorDatosNorte(){
        let NewArray = this.Datos.filter(ClinicaNorte => {
          return ClinicaNorte.ubic_nombre === "CLÍNICA ESPERANZA NORTE";
        })
        this.DatosNorte = NewArray;
        // console.log("Norte",this.DatosNorte);
      },
      ContructorDatosDomicilio(){
        let NewArray = this.Datos.filter(DatosDomiocilio => {
          return DatosDomiocilio.ubic_nombre === "INTERNACION DOMICILIARIA";
        })
        this.DatosDomiocilio = NewArray;
        // console.log("DATOS ais",this.DatosDomiocilio);
      },
    },
    created () {
        this.GetforAxios(),
        this.SeñalarTabla()
        
      }
  })