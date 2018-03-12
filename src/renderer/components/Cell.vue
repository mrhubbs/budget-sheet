<template>
  <div class='cell'>
    <ui-textbox
      v-if="!overrideContents"
      v-model=localValue
      @input="$emit('input', $event)"
      @change="$emit('change', $event); changeValue($event)"
      :hidden=hidden
      :readonly=readonly
      class='cell-entry'
      :class="{ 'cell-invalid': invalid, 'cell-entry-readonly': readonly }"
    />
    <slot v-else :hidden=hidden>

    </slot>
  </div>
</template>

<script>
  import BaseCell from './BaseCell'

  export default {
    name: 'cell',
    extends: BaseCell,
    props: [
      'value', 'hidden', 'invalid', 'wide',
      'readonly', 'rowIdx', 'overrideContents'
    ],
    data () {
      return {
        localValue: this.value
      }
    },
    methods: {
      changeValue (v) { /* override */ }
    },
    watch: {
      value (v) {
        this.localValue = v
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../palette.scss';

  // build upon the base 'cell' class
  .cell {
    justify-content: space-around;
    display: flex;
  }

  .cell-invalid {
    font-weight: bold;
    color: red;
  }
</style>

<style lang="scss">
  @import '../palette.scss';

  .cell-entry {
    margin: 0;

    .ui-textbox__label:before {
      position: absolute;
      content: "";
      bottom: 0;
      left: 30%;
      width: 40%;
    }

    .ui-textbox__label {
      position: relative;

      .ui-textbox__input {
        text-align: center;
        color: $cell-text-color;
        font-family: monospace;
        font-size: $cell-font-size;

        border: none;
      }
    }
  }

  .cell-dashed-bottom {
    .ui-textbox__label:before {
      border-bottom-color: $cell-separator-color;
      border-bottom-style: dashed;
      border-bottom-width: 2px;
    }
  }

  .cell-entry-readonly {
    .ui-textbox__label, .ui-textbox__label:before {
      border: none;
    }
  }

  .cell-invalid {
    .ui-textbox__label:before {
      border-bottom-color: red;
    }

    .ui-textbox__label {
      .ui-textbox__input {
        color: red;
        font-weight: bold;
      }
    }
  }
</style>
