// var async = require('async');
// var officegen = require('officegen');
// var fs = require('fs');
// var path = require('path');

// // Define the output directory where the DOCX file will be saved
// var outDir = path.join(__dirname, '../../tmp');

// // Create the output directory if it doesn't exist
// if (!fs.existsSync(outDir)) {
//   fs.mkdirSync(outDir, { recursive: true });
// }

// // Create the document object using officegen
// var docx = officegen({
//   type: 'docx', // Create a Word document
//   orientation: 'portrait', // Set the document orientation to portrait
//   pageMargins: { top: 1000, left: 1000, bottom: 1000, right: 1000 }, // Define page margins
//   columns: 2, // Use two columns in the document
// });

// // Handle errors during document generation
// docx.on('error', function (err) {
//   console.log(err);
// });

// // Create a paragraph for the header
// var header = docx.createP();
// header.addText('Your Company Name', {
//   bold: true,
//   align: 'center',
//   fontSize: 24,
// });
// header.addLineBreak();

// // Create a paragraph for the address
// var address = docx.createP();
// address.addText('123 Main Street', {
//   bold: true,
// });
// address.addLineBreak();
// address.addText('City, State ZIP', {
//   bold: true,
// });
// address.addLineBreak();

// // Create a paragraph for the date
// var date = docx.createP();
// date.addText('Date: October 18, 2023', {
//   bold: true,
//   align: 'right',
// });
// date.addLineBreak();

// // Create a paragraph for the recipient's address
// var recipientAddress = docx.createP();
// recipientAddress.addText('Recipient Name', {
//   bold: true,
// });
// recipientAddress.addLineBreak();
// recipientAddress.addText('Recipient Address', {
//   bold: true,
// });
// recipientAddress.addLineBreak();
// recipientAddress.addText('City, State ZIP', {
//   bold: true,
// });
// recipientAddress.addLineBreak();
// recipientAddress.addLineBreak();

// // Create a paragraph for the salutation
// var salutation = docx.createP();
// salutation.addText('Dear Mr./Ms. Last Name,', {
//   bold: true,
// });
// salutation.addLineBreak();
// salutation.addLineBreak();

// // Create a paragraph for the main content
// var content = docx.createP();
// content.addText('Here is the main content of your formal letter.', {
//   align: 'justify',
// });
// content.addLineBreak();
// content.addLineBreak();

// // Create a paragraph for the closing
// var closing = docx.createP();
// closing.addText('Sincerely,', {
//   bold: true,
// });
// closing.addLineBreak();
// closing.addLineBreak();
// closing.addText('Your Name', {
//   bold: true,
// });

// // Specify the output file path
// var outputPath = path.join(outDir, 'letter.docx');

// // Create a write stream for the output file
// var out = fs.createWriteStream(outputPath);

// // Handle errors during the file writing process
// out.on('error', function (err) {
//   console.log(err);
// });

// // Use async to generate the document and save it to the file
// async.parallel(
//   [
//     function (done) {
//       out.on('close', function () {
//         console.log('Finish creating the formal letter.');
//         done(null);
//       });
//       docx.generate(out); // Generate the document and save it to the file
//     },
//   ],
//   function (err) {
//     if (err) {
//       console.log('Error: ' + err);
//     }
//   }
// );const fs = require('fs');

const fs = require('fs');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const PizZip = require('pizzip');

// Baca template DOCX
const templateFilePath = path.resolve(__dirname, 'Format_notulen_direksi.docx');
const content = fs.readFileSync(templateFilePath, 'binary');

const zip = new PizZip(content);
const doc = new Docxtemplater();
doc.loadZip(zip);

// Baca data JSON
const data = require('./data.json');

// Cocokkan data dengan template
doc.setData(data);

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

// Simpan hasil rendering ke file DOCX baru
const outputPath = path.resolve(__dirname, 'output.docx');
const buf = doc.getZip().generate({ type: 'nodebuffer' });
fs.writeFileSync(outputPath, buf);

console.log('File DOCX baru telah dibuat: output.docx');
