<template>
    <div>
    <v-row justify="center">
      <v-date-picker
          v-model="date"
          :allowedDates="allowedDates"
          class="mt-3"
         :min=minDate
          max="2024-05-20"
        ></v-date-picker>
        <v-select
          :items="time"
          label="Время"
          v-model="pickedtime"
        ></v-select>
         {{ zanDate }}
    </v-row>
    <v-btn @click="onTick">Записаться</v-btn>
</div>
  </template>

  <script>
  import axios from 'axios'
  import {format, parse, parseISO} from 'date-fns'
  export default {
    async asyncData () {
    const { data } = await axios.get(`http://localhost:3000/api/blog/tickets`)
    return { data }
  },
    data () {
      return {
        date: '',
        minDate:format(new Date(), 'yyyy-MM-dd'),
        zanDate: [],
        lengthDates:0,
        time:['09:00','10:00','11:00','12:00'],
        pickedtime:'',
        timeofdate: [],
      }
    
  },
  beforeMount() {


    
   
   this.lengthDates= this.data.length
      for (var i = 0; i < this.data.length; i++) {
        this.zanDate.push(format(parseISO(this.data[i].ticket), 'yyyy-MM-dd'))
        this.timeofdate.push(this.data[i])
       
      }
     
       
    
  },
methods: {
      onTick() {
        const formData =
        {
            date: this.date,
            time: this.pickedtime
        }
        axios.post('http://localhost:3000/api/blog/ticket',formData)
      },
      
        allowedDates(val) {
        if(this.zanDate.indexOf(val) === -1) {
          
     
         
        return val
        }
      
        }
     
    },

mounted() {
    //console.log(parseISO(this.zandate[1]))
    
}
  }
  </script>