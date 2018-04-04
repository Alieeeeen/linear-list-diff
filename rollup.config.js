import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/list-diff.js',
  output: {
    name: 'diff',
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [
    uglify()
  ],
  sourceMap: true
}