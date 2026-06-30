import fs from 'fs';

const imageMap = {
  '/destinations/sigiriya.png': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Sigiriya.jpg',
  '/destinations/sigiriya.jpg': 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Sigiriya.jpg',
  '/destinations/galle.png': 'https://upload.wikimedia.org/wikipedia/commons/d/df/GALLE_FORT_AND_LIGHTHOUSE_GALLE_SRI_LANKA_JAN2013_%288510167078%29.jpg',
  '/destinations/ella.png': 'https://upload.wikimedia.org/wikipedia/commons/8/87/Nine_Arch_Bridge_in_Demodara%2C_Sri_Lanka.jpg',
  '/destinations/yala.png': 'https://upload.wikimedia.org/wikipedia/commons/6/60/Leopard_in_Yala_National_Park.jpg',
  '/destinations/teatrails.png': 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Sri_Lanka%2C_Tea_plantations_near_Nuwara_Eliya%2C_Picking_tea_leaves.jpg',
  '/destinations/kandalama.png': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Pool-over-Kandalama%28js%29.jpg',
  '/destinations/sunset.png': 'https://upload.wikimedia.org/wikipedia/commons/5/52/Sri_lanka_Beach_Sunset.jpg'
};

const filesToUpdate = [
  'src/data/mockData.ts',
  'src/components/Skiper51.tsx',
  'src/components/Hero33.tsx',
  'src/views/HomeView.tsx'
];

for (const file of filesToUpdate) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [key, value] of Object.entries(imageMap)) {
      content = content.split(key).join(value);
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
