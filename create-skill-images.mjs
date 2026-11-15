import fs from 'fs';
import path from 'path';

const imgDir = 'c:/Users/sandi/.gemini/antigravity/scratch/Portfolio-Website/public/images';

const skills = [
  { key: 'python', bg: '#3776AB', text: 'Python', subtext: 'Programming' },
  { key: 'html', bg: '#E44D26', text: 'HTML5', subtext: 'Markup' },
  { key: 'css', bg: '#1572B6', text: 'CSS3', subtext: 'Styling' },
  { key: 'solidworks', bg: '#CC0000', text: 'SOLID', subtext: 'WORKS' },
  { key: 'latex', bg: '#008080', text: 'LaTeX', subtext: 'Typesetting' },
  { key: 'excel', bg: '#217346', text: 'Excel', subtext: 'Microsoft' },
  { key: 'statistics', bg: '#7B2D8B', text: 'Statistics', subtext: 'Analysis' },
  { key: 'montecarlo', bg: '#4B0082', text: 'Monte', subtext: 'Carlo' },
  { key: 'curvefitting', bg: '#CC4400', text: 'Curve', subtext: 'Fitting' },
  { key: 'circuitdesign', bg: '#B8860B', text: 'Circuit', subtext: 'Design' },
  { key: 'quantummech', bg: '#191970', text: 'Quantum', subtext: 'Mechanics' },
  { key: 'finance', bg: '#1A5C2A', text: 'Financial', subtext: 'Modelling' },
];

skills.forEach(({ key, bg, text, subtext }) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <defs>
    <radialGradient id="grad" cx="40%" cy="35%" r="65%">
      <stop offset="0%" stop-color="white" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="black" stop-opacity="0.3"/>
    </radialGradient>
  </defs>
  <rect width="256" height="256" rx="128" fill="${bg}"/>
  <rect width="256" height="256" rx="128" fill="url(#grad)"/>
  <text x="128" y="110" font-family="Arial,sans-serif" font-size="40" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle">${text}</text>
  <text x="128" y="158" font-family="Arial,sans-serif" font-size="24" font-weight="400" fill="rgba(255,255,255,0.85)" text-anchor="middle" dominant-baseline="middle">${subtext}</text>
</svg>`;
  fs.writeFileSync(path.join(imgDir, key + '.svg'), svg);
  console.log('Created', key + '.svg');
});

console.log('All skill SVGs created!');
