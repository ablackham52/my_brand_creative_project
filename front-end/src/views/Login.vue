<template>
<div class="Login">
<h1>Login</h1>

<p>Enter Name</p>
     <div class="form">
       <input v-model="findTitle" :placeholder="searchPlaceholder">
       <div class="suggestions" v-if="suggestions.length > 0">
         <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectName(s)">{{s.name}}
         </div>
       </div>
     </div>
     <div class="actions" v-if="findName">
     <router-link to="/profile">
       <button @click="login(findName)">Login</button>
       </router-link>
     </div>

</div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
  return {
    title: "",
    names: [],
    findTitle: "",
findName: null,
searchPlaceholder: "Search"
  }
},
computed: {
  suggestions() {
    let names = this.names.filter(item => item.name.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    return names.sort((a, b) => a.title > b.title);
  }
},
created() {
  this.getNames();
},
methods: {
selectName(name) {
  this.findTitle = "";
  this.findName = name;
  this.searchPlaceholder = name.name;
},
login(client){
  this.$root.$data.client = client;
},
async getNames() {
  try {
    let brand = await axios.get("/api/brand");
    let user = await axios.get("/api/user");
    this.names = user.data.concat(brand.data);
    return true;
  } catch (error) {
    console.log(error);
  }
},

},
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

</style>
