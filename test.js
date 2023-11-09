const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const path = require('path');
const https = require('https');
const Stream = require('stream').Transform;
const ImageModule = require('docxtemplater-image-module-free');
const { exec } = require('child_process'); // Import child_process module

// Baca template DOCX
const templateFilePath = path.resolve(__dirname, './format_satu.docx'); // Update with your template file
const content = fs.readFileSync(templateFilePath, 'binary');

const doc = new Docxtemplater();
doc.loadZip(new PizZip(content));

// Baca data JSON
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Tentukan kriteria untuk user yang memiliki role "approver"
const approverUsers = data.approverUsers.filter(user => user.role === 'approver');

// Mengunduh gambar dari URL dan menyimpannya dalam objek yang berisi buffer gambar
const imagePromises = [];
for (const user of approverUsers) {
  if (user.tanda_tangan.startsWith('http')) {
    imagePromises.push(downloadImage(user.tanda_tangan));
  } else {
    imagePromises.push(Promise.resolve(fs.readFileSync(user.tanda_tangan)));
  }
}

Promise.all(imagePromises)
  .then(images => {
    var opts = {};
    opts.centered = false;
    opts.fileType = 'docx';

    opts.getImage = function (tagValue, tagName) {
      return images.shift();
    };

    opts.getSize = function (img, tagValue, tagName) {
      return [150, 150];
    };

    const imageModule = new ImageModule(opts);

    const agendaList = data.agenda.map(item => ({
      item: `• ${item}`,
    }));

    doc.attachModule(imageModule).setData({
      hari: data.hari,
      tanggal: data.tanggal,
      waktu: data.waktu,
      tempat: data.tempat,
      agendaList,
      approverUsers,
    });

    try {
      doc.render();
    } catch (error) {
      var e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      };
      console.log(JSON.stringify({ error: e }));
      throw error;
    }

    // Buat nama file DOCX dengan penomoran
    let outputFileName = 'testing.docx';
    let index = 1;

    while (fs.existsSync(outputFileName)) {
      outputFileName = `testing(${index}).docx`;
      index++;
    }

    const outputPathDocx = path.resolve(__dirname, outputFileName);

    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFileSync(outputPathDocx, buf);

    // Convert the DOCX to PDF using Pandoc with the --pdf-engine option
    convertToPdf(outputPathDocx);
  })
  .catch(error => {
    console.error('Error downloading images:', error);
  });

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      if (response.statusCode === 200) {
        const data = new Stream();
        response.on('data', chunk => data.push(chunk));
        response.on('end', () => resolve(data.read()));
        response.on('error', err => reject(err));
      } else {
        reject(new Error(`Request to ${url} failed, status code: ${response.statusCode}`));
      }
    });
  });
}

function convertToPdf(docxPath) {
  const outputPdfPath = docxPath.replace('.docx', '.pdf');
  const pandocCommand = `pandoc ${docxPath} -o ${outputPdfPath} --pdf-engine=xelatex`;

  exec(pandocCommand, (error, stdout, stderr) => {
    if (error) {
      console.error('Error converting DOCX to PDF:', error);
    } else {
      console.log('PDF file converted and saved as', outputPdfPath);
    }
  });
}
