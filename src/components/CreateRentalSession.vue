<template>
    <div class="container col-md-6" style="max-width: 500px; text-align: left">
        <!-- Heading -->
        <h2 class="alert-heading">New Rental Session</h2>
        <!-- Begin form -->
        <form @submit.prevent="submit">
            <!-- Name -->
            <div class="form-group mb-3">
                <label for="name">Name</label>
                <input type="text" v-model="rental.name" id="name" name="name" class="form-control"
                    :class="{ 'is-invalid': isSubmitted && v$.rental.name.$error }" />
                <div v-if="isSubmitted && v$.rental.name.$error" class="invalid-feedback">
                    Name field is required
                </div>
            </div>
            <!-- Email -->
            <div class="form-group mb-3">
                <label for="email">Email</label>
                <input type="email" v-model="rental.email" id="email" name="email" class="form-control"
                    :class="{ 'is-invalid': isSubmitted && v$.rental.email.$error }" />
                <template v-if="isSubmitted && v$.rental.email.$error" class="invalid-feedback">
                    <p v-for="error of v$.rental.email.$errors" :key="error.$uid" class="invalid-feedback">
                        {{ error.$message }}
                    </p>
                </template>
            </div>
            <div class="form-group mb-3">
                <label for="phone">Phone</label>
                <input type="text" v-model="rental.phone" id="phone" name="phone" class="form-control"
                    :class="{ 'is-invalid': isSubmitted && v$.rental.phone.$error }" />
                <div v-if="isSubmitted && v$.rental.phone.$error" class="invalid-feedback">
                    Please enter a valid phone number
                </div>
            </div>
            <div class="form-group mb-3">
                <button class="btn btn-primary btn-block" :class="{ 'btn-danger': isSubmitted && v$.$invalid }">
                    Create
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import axios from 'axios'
import { required, email, minLength } from '@vuelidate/validators'

const phoneValidator = helpers.regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)

export default {
    setup: () => ({ v$: useVuelidate() }),
    data: () => ({
        isSubmitted: false,
        rental: {
            name: '',
            phone: '',
            email: '',
        }
    }),
    // Validations for Vuelidate
    validations() {
        return {
            rental: {
                name: { required },
                phone: {
                    minLength: minLength(7),
                    required,
                    phoneValidator,
                },
                email: { required, email },
            }
        }
    },
    methods: {
        submit() {
            this.isSubmitted = true;
            this.v$.$validate();
            if (this.v$.$invalid) {
                return;
            }
            alert("SUCCESS!" + JSON.stringify(this.rental));
            let apiURL = "http://localhost:4000/api/create-rental";
            axios
                .post(apiURL, this.rental)
                .then(() => {
                    this.$router.push("/view");
                    this.rental = {
                        name: "",
                        email: "",
                        phone: "",
                    };
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }
}
</script>