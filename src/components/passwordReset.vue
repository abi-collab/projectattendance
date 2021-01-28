<template>
  <div class="modal" style="background-color:blue">
    <div class="modal-content">
      <div class="close" @click="$emit('close')">close</div>
      <h3>Reset Password</h3>
      <div v-if="!showSuccess">
        <p>Enter your email to reset your password</p>
        <form @submit.prevent>
          <input v-model.trim="email" type="email" placeholder="you@email.com" />
        </form>
        <button class="button" @click="resetPassword()">Reset</button>
      </div>
      <p v-else>Success! Check your email for a reset link.</p>
    </div>

    <p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
  

  </div>
</template>
<script>
import { auth } from '../attendancefirebase'

export default {
  name:"passwordReset",
  data() {
    return {
      email: '',
      showSuccess: false,
      errorMsg: ''
    }
  },
  methods: {
    async resetPassword() {
      // reset logic
      this.errorMsg = ''

        try {
            await auth.sendPasswordResetEmail(this.email)
            this.showSuccess = true
        } catch (err) {
            this.errorMsg = err.message
        }
    }
  }
}
</script>