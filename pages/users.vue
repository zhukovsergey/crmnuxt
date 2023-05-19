<template>
    <div>
        <h2>Все пользователи</h2>
        {{users.data}}
        <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ЛОГИН
          </th>
          <th class="text-left">
            ЯВЛЯЕТСЯ АДМИНИСТРАТОРОМ
          </th>
          <th class="text-left">
            Удалить
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users.data"
          :key="user._id"
        >
          <td>{{ user.login }}</td>
          <td v-if="!user.admin">Нет</td>
          <td v-else>Да</td>
          <td ><v-btn @click=userDelete(user._id) icon value="user._id"><v-icon size="x-large">mdi-delete</v-icon> X</v-btn></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    
 data () {
    return {
        users: '',
        userid:'',
    }
 }  
,
mounted() {
    this.getUsrName() 
    
    
  
},
methods: {
  async getUsrName() {
   const res = await axios.get(
        `http://localhost:3000/api/auth/all/users`
      ).then(response => (this.users = response))
     
  },
  userDelete (e) {
      //const formData = { user: user.login, id: user._id }
      console.log(e)
    },

}
}
</script>