<template>
<div class="Register">
<h1>Register</h1>

<div class="form">
  <input v-model="name" placeholder="Name">
  <p></p>
  <input type="file" name="photo" @change="fileChanged">
<p></p>
<router-link to="/profile" v-if="file">
  <button @click="registerBrand">Brand</button>
  <button @click="registerUser">User</button>
</router-link>
</div>
</div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'SignUp',
  data() {
  return {
    Name: "",
    file: null,
  }
},
methods: {
  fileChanged(event) {
    this.file = event.target.files[0]
  },
  async registerBrand() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/brand', {
          name: this.name,
          path: r1.data.path
        });
        this.$root.$data.client = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
async registerUser() {
    try {
      const formData = new FormData();
      formData.append('photo', this.file, this.file.name)
      let r1 = await axios.post('/api/photos', formData);
      let r2 = await axios.post('/api/user', {
        name: this.name,
        path: r1.data.path
      });
      this.$root.$data.client = r2.data;
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
