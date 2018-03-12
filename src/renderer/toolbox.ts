
import moment from 'moment'
import _ from 'lodash'

export const prettyDate = (d: moment.Moment) => d.format('M-D-YY')

// Serialize a date into a format that Moment will readily de-serialize.
export const serializeMomentDate = (d: moment.Moment) => d.format('YYYY-MM-DD')

export const formatMoney = (v) => {
  if (v === undefined) return ['0.00', true]
  else return [Number(v).toFixed(2), false]
}

export const enumerate = (collection) => _.map(collection, (value, key) => [key, value])
