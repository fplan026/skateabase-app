<template>
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h3 class="text-center">Update Rental</h3>
			<form @submit.prevent="handleUpdateForm">
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
						Update
					</button>
				</div>
			</form>
		</div>
	</div>
</template>
<script>
import { helpers } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import axios from "axios";
import { required, email, minLength } from '@vuelidate/validators'

const phoneValidator = helpers.regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
export default {
	//setup Vuelidate for data validation
	setup: () => ({ v$: useVuelidate() }),
	data() {
		return {
			isSubmitted: false,
			rental: {}
		}
	},
	//get the rental session
	created() {
		let apiURL = `http://localhost:4000/api/edit-rental/${this.$route.params.id}`;
		axios.get(apiURL).then((res) => {
			this.rental = res.data;
		})
	},
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
		handleUpdateForm() {
			//validate the updated data
			this.isSubmitted = true;
			this.v$.$validate();
			if (this.v$.$invalid) {
				//just return, the form informs the user of the errors
				return;
			}

			//data looks good, try to update the db 
			let apiURL = `http://localhost:4000/api/update-rental/${this.$route.params.id}`;
			axios.put(apiURL, this.rental).then((res) => {
				console.log(res)
				this.$router.push('/view')
			}).catch(error => {
				//TODO: we should probably handle this better
				console.log(error)
			});
		}
	}
}
</script>