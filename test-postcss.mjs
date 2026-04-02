import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import fs from 'fs';

const css = fs.readFileSync('app/globals.css', 'utf8');

console.error('Starting PostCSS processing...');

postcss([tailwindcss])
  .process(css, { from: 'app/globals.css' })
  .then((result) => {
    console.error('PostCSS processing finished successfully.');
    // Do not log to stdout to avoid confusion, but we want to see if anything ELSE logs to stdout.
    if (result.warnings().length > 0) {
      console.error('Warnings:');
      result.warnings().forEach((warn) => {
        console.error(warn.toString());
      });
    }
  })
  .catch((err) => {
    console.error('PostCSS processing failed:');
    console.error(err);
    process.exit(1);
  });
