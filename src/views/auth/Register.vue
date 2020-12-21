<template>
  <v-app>
    <v-app-bar app color="#47C83E" dark>
      <v-toolbar-title>어디였지??</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <div class="text-center text-h3 font-weight-bold green--text mt-14 mb-6">
        WHERE WAS IT
      </div>
      <ValidationObserver ref="form">
        <form @submit.prevent="checkDuplicateEmail">
          <v-col class="ma-auto" cols="12" sm="6" md="3">
            <ValidationProvider
              name="Name"
              rules="required"
              v-slot="{ errors }"
            >
              <v-text-field
                label="Name"
                type="name"
                v-model="name"
                hide-details=""
                required
                outlined
              ></v-text-field>
              <FormErrorMsg :errors="errors" />
              <div class="my-4"></div>
            </ValidationProvider>

            <ValidationProvider
              name="Email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <v-text-field
                label="E-mail"
                type="email"
                v-model="email"
                hide-details=""
                required
                outlined
              ></v-text-field>
              <FormErrorMsg :errors="errors" />

              <div class="my-4"></div>
            </ValidationProvider>

            <ValidationProvider
              name="Password"
              rules="required|min:8"
              v-slot="{ errors }"
              vid="password"
            >
              <v-text-field
                label="Password"
                type="password"
                v-model="password"
                hide-details="2px"
                required
                outlined
              ></v-text-field>
              <FormErrorMsg :errors="errors" />
              <div class="my-4"></div>
            </ValidationProvider>

            <ValidationProvider
              name="Password Confirm"
              rules="required|min:8|confirmed:password"
              v-slot="{ errors }"
            >
              <v-text-field
                label="Confirm Password"
                type="password"
                v-model="passwordConfirm"
                hide-details=""
                required
                outlined
              ></v-text-field>
              <FormErrorMsg :errors="errors" />
              <div class="my-4"></div>
            </ValidationProvider>
          </v-col>
          <div class="mb-16 text-center">
            <v-btn
              type="submit"
              color="#47C83E"
              style="width: 250px"
              rounded
              dark
              x-large
              cols
            >
              SIGN UP
            </v-btn>
          </div>
        </form>
      </ValidationObserver>

      <div class="text-center">
        이미 계정이 있으신가요?
        <v-btn
          class="ml-4"
          outlined
          rounded
          color="#47C83E"
          dark
          to="/auth/login"
        >
          LOGIN
        </v-btn>
      </div></v-main
    >
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import FormErrorMsg from '@/components/common/FormErrorMsg';
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
    };
  },
  components: { ValidationObserver, ValidationProvider, FormErrorMsg },
  watch: {
    email(n, o) {
      console.log(n, o);
    },
  },
  created() {
    console.log('created');
  },
  mounted() {
    console.log('mounted');
  },
  methods: {
    async checkDuplicateEmail() {
      const success = await this.$refs.form.validate();
      if (!success) {
        return;
      }
      const res = await this.$axios.get('/auth/duplicateEmail', {
        email: this.email,
      });
      if (!res.data.result) {
        console.log('success');
        this.register();
      } else {
        console.log('failed');
      }
    },
    async register() {
      const authNum = (
        await this.$axios.post('/auth/authEmail', {
          email: this.email,
        })
      ).data.authNum;
      this.$router.push({
        name: 'authEmail',
        params: {
          email: this.email,
          authNum: authNum,
          password: this.password,
          name: this.name,
        },
      });
    },
  },
};
</script>

<style></style>
