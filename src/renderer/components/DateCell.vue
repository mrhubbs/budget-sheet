<!-- TODO: don't duplicate template from Cell.vue -->
<template>
  <div class='cell'>
    <ui-textbox
      v-model=localValue
      :hidden=hidden
      :readonly=readonly
      class='cell-entry'
      :class="{ 'cell-invalid': invalid, 'cell-entry-readonly': readonly }"
      @change=changeValue
    />
  </div>
</template>

<script>
  import moment from 'moment'

  import Cell from './Cell'
  import EventBus from '../EventBus'

  const dateValidRegExp = /^([1-9][0-2]?-[1-9][0-2]?-(?:[0-9]{2}|[0-9]{4}))$/

  export default {
    name: 'date-cell',
    extends: Cell,
    methods: {
      changeValue (v) {
        // validate
        let invalid = (dateValidRegExp.exec(v) === null)

        if (invalid) {
          this.$store.commit('setDate', { transIdx: this.transIdx, invalid: true })
          EventBus.$emit(
            'error',
            {
              error: new Error('Date format must be M(M)-D(D)-YY(YY)')
            })
        } else {
          // we assume the entry is in the form MM-DD-YY or MM-DD-YYYY
          // Moment wants YYYY-MM-DD
          let [month, day, year] = v.split('-')
          if (month.length === 1) month = '0' + month
          if (day.length === 1) day = '0' + day
          if (year.length === 2) year = '20' + year
          let momentFriendlyDate = [year, month, day].join('-')

          this.$store.commit('setDate', {
            transIdx: this.transIdx,
            date: moment(momentFriendlyDate)
          })
          this.localValue = v
        }
      }
    }
  }
</script>
