<template>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h3 class="text-center">Create Rental</h3>
            <form @submit.prevent="handleSubmitForm">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="rental.name" required>
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="rental.email" required>
                </div>
                <div class="form-group">
                    <label>Phone</label>
                    <input type="text" class="form-control" v-model="rental.phone" required>
                </div>
                <div class="form-group">
                    <label>Size</label>
                    <input type="text" class="form-control" v-model="rental.size" required>
                </div>
                <div class="form-group">
                    <button class="btn btn-danger btn-block">Create</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CreateRentalSession',
    data() {
        return {
            rental: {
                name: '',
                email: '',
                phone: '',
                size: '',
            }
        }
    },
    methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/create-rental";
      axios
        .post(apiURL, this.rental)
        .then(() => {
          this.$router.push("/view");
          this.student = {
            name: "",
            email: "",
            phone: "",
            size: '',
          };
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
}
</script>