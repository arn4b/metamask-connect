<template>
  <div class="hello">
    <!-- <div v-if="!activeAccountAddress"> -->
      <button class="btn success" v-if="!activeAccountAddress" @click="login()">Login</button>

      <button class="btn success" v-else @click="logout()">Logout</button>
    <!-- </div> -->

    <h1 v-if="activeAccountAddress">Hello {{activeAccountAddress}}</h1>
    <h1 v-if="activeAccountAddress"> {{activeAccountBalance}} ETH</h1>
    <img v-if="activeAccountAddress" src="data:image/png;base64,' + {{userData}} + '" />


  </div>
</template>

<script>
// import Vue from "vue"

//create computed property -> return this.$store.state.activeAcccountAstatus

//doea not alwasy try ot change the data

//updates value when required


// pass function -> dont ()

//add a user profile icon

export default {
  name: 'HelloWorld',
  props: {},

  methods: {
    async login() {
      try {
        await this.$store.dispatch("initLogin")
        console.log(this.activeAccountAddress)
        console.log(this.userData.slice(0, 16))
      } catch(e) {
        this.error = e.message;
      }
    },

    async logout() {
      this.$store.dispatch("initLogout")
    },
  },

  computed: {
    activeAccountAddress() {
      return this.$store.state.activeAccountAddress
    },

    activeAccountBalance() {
      return this.$store.state.activeAccountBalance
    },

    userData() {
      let img = this.$store.state.accountImage
      return img.slice(0, 16)
    }
  },

  
}
</script>

<style scoped>

</style>
