<template id="dialogoLogin">
  <div>
    <md-dialog-prompt
      :md-active.sync="dialogo"
      v-model="login"
      md-title="What's your name?"
      md-input-maxlength="30"
      md-input-placeholder="Type your name..."
      md-confirm-text="Done" />

    <span v-if="value">Value: {{login}}</span>
  </div>
</template>

<script>
  export default {
      props: ['vedere', 'value']
}
</script>