// Import dependencies.
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

function banner() {
  var text = pkg.name + ' v' + pkg.version + '\n';
  text += 'Copyright (c) ' + (new Date).getFullYear() + ' Erik Koopmans\n';
  text += 'Released under the ' + pkg.license + ' License.';
  text = '/**\n * ' + text.replace(/\n/g, '\n * ') + '\n */';
  return { banner: text };
}
function license(filename) {
  filename = filename || './LICENSE';
  var data = fs.readFileSync(filename).toString();
  data = '/**\n * @license\n * ' + data.trim().replace(/\n/g, '\n * ') + '\n */\n';
  return { banner: data };
}


const name = 'html2pdf'
const _globals = {
  jspdf: 'jsPDF',
  html2canvas: 'html2canvas'
};
const external = [
  'jspdf',
  'html2canvas',
];
const input = 'src/index.js';

export default [
  // Un-bundled builds.
  {
    input,
    output: [
      { file: pkg.main, format: 'cjs', exports: 'default', name, globals: _globals },
      { file: pkg.module, format: 'esm', name, globals: _globals },
      { file: pkg.browser, format: 'umd', name, globals: _globals }
    ],
    external,
    plugins: [
      resolve(),
      commonjs(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled'}),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true}),
      banner()
    ]
  },
  // Un-bundled builds (minified).
  {
    input,
    output: [
      { file: pkg.browser.replace(/js$/, 'min.js'), format: 'umd', name, globals: _globals }
    ],
    external,
    plugins: [
      resolve(),
      commonjs(),
      babel({ exclude: 'node_modules/**', babelHelpers: 'bundled'}),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production'), preventAssignment: true }),
    ]
  },
];
