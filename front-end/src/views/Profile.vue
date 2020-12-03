<template>
<div class="admin">
<h1>Welcome {{this.$root.$data.client.name}}</h1>
<div class="profileImg">
  <img :src="this.$root.$data.client.path" />
</div>

<div class="brand" v-if="!this.$root.$data.client.brands">
  <h2>Followers: {{this.$root.$data.client.followers}}</h2>
  <div class="actions">
  <router-link to="/">
    <button @click="deleteBrand()">Delete</button>
  </router-link>
  </div>
</div>
<div class="brand" v-if="this.$root.$data.client.brands">
<router-link to="/">
  <button @click="deleteUser()">Delete</button>
</router-link>
<h2>Following</h2>
<section class="image-gallery">
  <div class="image" v-for="brand in following" :key="brand.id">
    <div class=mybrand>
    <img :src="brand.path" />
    <h2>{{brand.name}}</h2>
    <p>Followers: {{brand.followers}}</p>
    <button @click="unfollow(brand)">Unfollow</button>
    </div>
  </div>
</section>
<h2>Suggestions</h2>
<section class="image-gallery">
  <div class="image" v-for="brand in brands" :key="brand.id">
    <div class=mybrand>
    <img :src="brand.path" />
    <h2>{{brand.name}}</h2>
    <p>Followers: {{brand.followers}}</p>
    <button @click="follow(brand)">Follow</button>
    </div>
  </div>
</section>
</div>

</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Profile',
  data() {
  return {
    brands: [],
    following:[],
    title: "",
    description: "",
    file: null,
    addItem: null,
    items: [],
    findTitle: "",
findItem: null,
  }
},
computed: {
  suggestions() {
    let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
    return items.sort((a, b) => a.title > b.title);
  }
},
created() {
  this.getBrands();
},
methods: {
isFollowing(brand){
  return this.$root.$data.client.brands.includes(brand._id)
},
notFollowing(brand){
  return !this.$root.$data.client.brands.includes(brand._id)
},
async follow(brand){
  this.$root.$data.client.brands.push(brand._id)
  try {
    await axios.put("/api/brand/" + brand._id, {
      followers: brand.followers + 1,
    });
    await axios.put("/api/user/" + this.$root.$data.client._id, {
      brands: this.$root.$data.client.brands,
    });
    this.getBrands();
    return true;
  } catch (error) {
    console.log(error);
  }
},
async unfollow(brand){
  var index = this.$root.$data.client.brands.indexOf(brand._id)
  this.$root.$data.client.brands.splice(index, 1)
  try {
    await axios.put("/api/brand/" + brand._id, {
      followers: brand.followers - 1,
    });
    await axios.put("/api/user/" + this.$root.$data.client._id, {
      brands: this.$root.$data.client.brands,
    });
    this.getBrands();
    return true;
  } catch (error) {
    console.log(error);
  }
},
async getBrands() {
  try {
    let response = await axios.get("/api/brand");
    let brands = response.data;
    this.following = brands.filter(this.isFollowing);
    this.brands = brands.filter(this.notFollowing);
    return true;
  } catch (error) {
    //console.log(error);
  }
},

async deleteBrand() {
  try {
    await axios.delete("/api/brand/" + this.$root.$data.client._id);
    this.$root.$data.client.name = "";
    return true;
  } catch (error) {
    console.log(error);
  }
},
async deleteUser() {
  try {
    await axios.delete("/api/user/" + this.$root.$data.client._id);
    this.$root.$data.client.name = "";
    return true;
  } catch (error) {
    console.log(error);
  }
},



},
}
</script>

<style scoped>

.profileImg img {
  width: 250px;
}

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
.image-gallery {
margin-top: 20px;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
}

.image {
margin: 33px;
margin-top: 50px;
width: 200px;
}

.image img {
height: 250px;
width: 200px;
object-fit: contain;
}
</style>
