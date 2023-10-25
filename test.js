const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const PizZip = require('pizzip');
const path = require('path');
const https = require("https");
const Stream = require("stream").Transform;
var ImageModule = require('docxtemplater-image-module-free');

// Baca template DOCX
const templateFilePath = path.resolve(__dirname, './Format_notulen_direksi.docx'); // Update with your template file
const content = fs.readFileSync(templateFilePath, 'binary');

const zip = new PizZip(content);
const doc = new Docxtemplater();
doc.loadZip(zip);

// Baca data JSON
const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

// Tentukan kriteria untuk user yang memiliki role "approver"
const approverUsers = data.approverUsers.filter(user => user.role === 'approver');

// Mengunduh gambar dari URL dan menyimpannya dalam objek yang berisi buffer gambar
const imagePromises = [];
for (const user of approverUsers) {
  if (user.tanda_tangan.startsWith("http")) {
    imagePromises.push(downloadImage(user.tanda_tangan));
  } else {
    imagePromises.push(Promise.resolve(fs.readFileSync(user.tanda_tangan)));
  }
}

Promise.all(imagePromises)
  .then(images => {
    // Cocokkan data dengan template

    var opts = {}
    opts.centered = false; //Set to true to always center images
    opts.fileType = "docx"; //Or pptx

    //Pass your image loader
    opts.getImage = function (tagValue, tagName) {
      return images.shift();
    }

    // Pass the function that returns image size
    opts.getSize = function (img, tagValue, tagName) {
      return [150, 150];
    }

    var imageModule = new ImageModule(opts);

    // Generate daftar agenda sebagai list
    const agendaList = data.agenda.map(item => ({
      // Using '•' for the bullet character
      item: `• ${item}`
    }));

    doc.attachModule(imageModule).setData({
      hari: data.hari,
      tanggal: data.tanggal,
      waktu: data.waktu,
      tempat: data.tempat,
      agendaList, // Use agendaList to match the template
      approverUsers
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

    // Buat nama file dengan penomoran
    let outputFileName = 'testing.docx';
    let index = 1;

    while (fs.existsSync(outputFileName)) {
      outputFileName = `testing(${index}).docx`;
      index++;
    }

    const outputPath = path.resolve(__dirname, outputFileName);
    const buf = doc.getZip().generate({ type: 'nodebuffer' });
    fs.writeFile(outputPath, buf, (err) => {
      if (err) {
        console.error('Error writing the file:', err);
      } else {
        console.log('File replaced successfully');
      }
    });
  })
  .catch(error => {
    console.error("Error downloading images:", error);
  });

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, response => {
      if (response.statusCode === 200) {
        const data = new Stream();
        response.on("data", chunk => data.push(chunk));
        response.on("end", () => resolve(data.read()));
        response.on("error", err => reject(err));
      } else {
        reject(new Error(`Request to ${url} failed, status code: ${response.statusCode}`));
      }
    });
  });
}
