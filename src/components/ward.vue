<template>
  <div>
  <header>
    <section align="right">
      <div class="col1">
       <router-link to="/"><b-icon icon="house-fill" aria-hidden="true"></b-icon> Home</router-link> | <a @click="logout()"><b-icon icon="power" aria-hidden="true"></b-icon> logout</a>
       <!-- <router-link to="/settings">Settings</router-link> | -->
       
       <!-- <b-modal id="logoutModal" centered title="Are you Sure to Logout ?" hide-footer size="sm">
                <b-btn variant="outline-success" style="width:100%" @click="logout()"><b-icon-door-closed></b-icon-door-closed>confirm</b-btn>
            </b-modal> -->
       <hr>
      </div>
    </section>
  </header>

  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: "Ward",
  data() {
    return {};
  },
  methods: {
    
     logout() {
      //  Swal.fire("Click on either the button or outside the modal.")
      //   .then(() => {
      //      this.$store.dispatch('logout')
      //   });


      Swal.fire({
          title: 'Are you sure to logout?',
          text: 'You will be directed to login page',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes!',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {

            this.$store.dispatch('logout')
              
          }else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title:'Cancelled',
              icon: 'error',
              timer:1000,
              showCancelButton: false,
              showConfirmButton: false
            })
          }
        })

     
    }
  }
};
</script>

<style scoped>
header{
  padding: 17px;
  background-color: white;
  box-shadow:0px 0px 5px grey;
}


</style>

