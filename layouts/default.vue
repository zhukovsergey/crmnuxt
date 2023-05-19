<template> <v-app id="inspire">
 <v-scale-transition>
  <v-navigation-drawer
    v-if="drawer"
    app
    
  >
  <div class="mx-6 mt-2">
    Меню</div>
  </v-navigation-drawer>
</v-scale-transition>
  <v-app-bar dark app class="red darken-3">
    <v-app-bar-nav-icon 
    @click="drawer = !drawer">
  </v-app-bar-nav-icon>
  <NuxtLink to="/" class="titlelink">
    <v-toolbar-title>CRM Эталон</v-toolbar-title></NuxtLink>
    
    <v-spacer></v-spacer>
    <NuxtLink to="/users" class="loginlink"> 
    <v-btn elevated class="red">Пользователи</v-btn></NuxtLink>
    <NuxtLink to="/login" class="loginlink">
      <v-btn icon name="login" id="login">
        <v-icon size="x-large">mdi-face-man</v-icon> 
      </v-btn>
      <label v-if="!this.$auth.loggedIn" for="login" class="font-weight-bold">Вход</label></NuxtLink>
      
  </v-app-bar>

  <v-main>
    <v-container fluid>
      <Nuxt/>
    </v-container>
  </v-main>
</v-app>
</template>

<script>

export default {
  name: 'DefaultLayout',
  data () {
    return {
     drawer: false
    }
  }
}
</script>
