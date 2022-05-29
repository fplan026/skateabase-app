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
            <!-- Phone -->
            <div class="form-group mb-3">
                <label for="phone">Phone</label>
                <MazPhoneNumberInput id="phone" show-code-on-list ref="phone" v-model="rental.phone" color="info"
                    preferred- countries=" ['CA', 'US' ]" @update="results = $event"
                    :error="isSubmitted && !results.isValid" />
                <code>
                    {{ results }}
                </code>
            </div>
            <!-- Submit button -->
            <div class="form-group mb-3 text-center">
                <button class="m-2 btn btn-primary btn-block "
                    :class="{ 'btn-danger': isSubmitted && (v$.$invalid || !this.results.isValid) }">
                    Create
                </button>
                <button class="m-2 btn btn-danger btn-block" @click="this.$router.go(-1)">
                    Cancel
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import axios from 'axios'
import { ref } from 'vue'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import AddSkateModalVue from '@/components/Skate/AddSkateModal.vue'
import { required, email } from '@vuelidate/validators'

export default {
    setup: () => ({
        v$: useVuelidate(),
    }),
    data: () => ({
        isSubmitted: false,
        rental: {
            name: '',
            phone: '',
            email: '',
        },
        results: {
            value: ref('phone'),
            isValid: false
        }
    }),
    components: {
        MazPhoneNumberInput,
        AddSkateModalVue
    },
    // Validations for Vuelidate
    validations() {
        return {
            rental: {
                name: { required },
                phone: { required },
                email: { required, email },
            }
        }
    },
    methods: {
        submit() {
            this.isSubmitted = true;
            this.v$.$validate();
            if (this.v$.$invalid || !this.results.isValid) {
                return;
            }
            // alert("SUCCESS!" + JSON.stringify(this.rental));

            let apiURL = "http://localhost:4000/api/create-renter";
            axios
                .post(apiURL, this.rental)
                .then((response) => {
                    let id = response.data._id
                    this.$router.push({ name: 'rent', params: { id } });
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