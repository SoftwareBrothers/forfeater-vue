<template>
  <div class="columns is-centered">
    <div class="column is-half">
      <form class="box" novalidate>
        <b-field
          label="Name"
          :type="{ 'is-danger': errors.has('name') }"
          :message="errors.first('name')"
        >
          <b-input
            v-model="vendor.name"
            v-validate="'required|min:3'"
            name="name"
          ></b-input>
        </b-field>
        <b-field
          label="Url"
          :type="{ 'is-danger': errors.has('url') }"
          :message="errors.first('url')"
        >
          <b-input v-model="vendor.url" v-validate="'url'" name="url"></b-input>
        </b-field>
        <b-button
          v-if="!vendor.id"
          type="is-primary"
          :disabled="errors.has()"
          outline
          @click="save(`store`)"
        >
          Create
        </b-button>
        <b-button
          v-if="vendor.id"
          type="is-primary"
          :disabled="errors.has()"
          outline
          @click="save(`update`)"
        >
          Save
        </b-button>
      </form>
    </div>
  </div>
</template>

<script>
import { VendorService } from '@/services/vendor.service';

export default {
  props: {
    vendor: {
      type: Object,
      required: false,
      default: () => ({
        name: null,
        url: null,
      }),
    },
  },
  data() {
    return {
      service: new VendorService(),
    };
  },
  methods: {
    save(type) {
      if (!this.errors.any()) {
        this.service[type](this.vendor).then(() => {
          this.$router.push('/vendors');
        });
      }
    },
  },
};
</script>
