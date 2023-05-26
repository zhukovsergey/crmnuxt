<template>
    <div>
        <h2>Все пользователи</h2>
        {{users}}
        <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ЛОГИН
          </th>
          <th class="text-left">
            ЯВЛЯЕТСЯ АДМИНИСТРАТОРОМ
          </th><th class="text-left">
            ЗАДАНИЕ
          </th>
          <th class="text-left">
            Сделать админом
          </th>
          <th class="text-left">
            Удалить
          </th>
        </tr>
      </thead>
      <tbody is="transition-group" name="home">
        
        <tr 
          v-for="user in users"
          :key="user._id"
        >
          <td>{{ user.login }}</td>
          
          <td v-if="!user.admin">Нет</td>
          <td v-else>Да</td>
          <td>
            
            <v-textarea background-color="amber lighten-4"
      color="orange orange-darken-4" v-model="user.task" @change="userTask(user.login, user.task)"></v-textarea>
          </td>
          <td> <v-checkbox
                v-model="user.admin"
                label="Администратор"
                name="admin"
                :value="user.admin"
                @change='moderatecom(user.login, user.admin)'
              />
              <v-checkbox</td>
          
          <td ><v-btn @click=userDelete(user.login) icon value="user._id"><v-icon size="x-large">mdi-delete</v-icon> X</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
</template>

<script>
//import datefns from 'date-fns'
import {format, parse, parseISO} from 'date-fns'
import { ru } from 'date-fns/locale';
import axios from 'axios'
export default {
  
  async asyncData () {
    const { data } = await axios.get(`http://localhost:3000/api/auth/all/users`)
    return { users: data }
  },
 data () {
    return {
        users: '',
        userid:'',
        task:'',
        uds:'',
        admin:''
    }
 }  
,

methods: {
   format(date) { 
    const created = format(parseISO(date), 'T',{locale: ru})
    
    return  {created}
  
  },
  moderatecom (login, admin) {
      const formData = {
        admin: admin,
        login: login
      }
      console.log(formData)
      axios
        .patch(
          `http://localhost:3000/api/auth/${this.usrname}`,
          formData
        )
        .then()
    },
  
  async userDelete (e) {
    const users = this.users
      //const formData = { user: user.login, id: user._id }
      const indefRem = users.findIndex(user => user.login == e);
      const formData = { login: e}
      await this.$axios.patch(`http://localhost:3000/api/auth/${e}/remove`,formData).then(users.splice(indefRem, 1))
      this.$toasted.show(`<span style="font-family: coursive; font-size: 23px;">Пользователь ${e} удален</span>`, {
          theme: 'bubble',
          position: 'top-center',
          duration: 4000
        });
        this.$nuxt.refresh()
     console.log(users)
     
    },
    async userTask(e, task) {
      console.log(task)
      const formData = { login: e, task: task}
      await this.$axios.patch(`http://localhost:3000/api/auth/${e}/addTask`,formData)
    }

}
}
</script>
<style>
  .home-enter-active, .home-leave-active { transition: opacity 1s; }
  .home-enter, .home-leave-active { opacity: 0; }
</style>