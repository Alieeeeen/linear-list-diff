import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/list-diff.js',
  output: {
    name: 'diff',
    file: 'dist/list-diff.js',
    format: 'umd'
  },
  plugins: [
    uglify()
  ]
}