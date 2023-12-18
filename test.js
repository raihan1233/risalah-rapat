const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the cors middleware
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const https = require("https");
const Stream = require("stream").Transform;
const ImageModule = require("docxtemplater-image-module-free");
const ILovePDFApi = require("@ilovepdf/ilovepdf-nodejs");
const ILovePDFFile = require("@ilovepdf/ilovepdf-nodejs/ILovePDFFile");

app.use(cors());
const port = process.env.PORT || 3010;
const pool = new Pool({
  user: "prest",
  host: "localhost",
  database: "prest",
  password: "prest",
  port: 5435,
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uploadFolder = 'uploads/';

if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // const fileName = Date.now() + path.extname(file.originalname);
    cb(null, path.basename(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Check if the file type is allowed
  if (file.mimetype === 'application/msword' ||          // for .doc
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || // for .docx
    file.mimetype === 'application/pdf') {             // for .pdf
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Invalid file format. Allowed formats: .doc, .docx, .pdf'), false);
  }
};

const maxFileSize = 2 * 1024 * 1024; // 2 MB

const upload = multer({ storage, fileFilter, limits: { fileSize: maxFileSize }, });
app.use(express.json());

app.get('/_QUERIES/users/get_user_by_session/:token', async (req, res) => {
  const token = req.params.token;

  try {
    if (!token) {
      return res.status(400).json({ error: 'Token is required' });
    }

    const results = await pool.query(`SELECT id, name, username, us.role AS user_role, tr.role AS tracker_role, us.tipe, us.jabatan AS jabatan FROM risalah_users AS us JOIN risalah_trackers AS tr ON us.id = tr.id_user WHERE token = $1`, [token]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(results.rows[0]);
  }
  catch (err) {
    console.error('Error executing the query:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/_QUERIES/templates/add_template', upload.single('attachment'), async (req, res) => {
  const { attachmentTitle, status, created_by, modified_by } = req.body;
  const attachment = path.basename(req.file.path);
  try {
    const insertDocumentQuery = 'INSERT INTO risalah_templates (nama_template, file, status, created_by, modified_by) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(insertDocumentQuery, [attachmentTitle, attachment, status, created_by, modified_by]);

    res.status(201).json({ message: 'Template added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.patch('/_QUERIES/templates/patch_template/:id_template', upload.single('attachment'), async (req, res) => {
  const templateId = req.params.id_template;
  const { attachmentTitle, status, modified_by } = req.body;
  const attachment = path.basename(req.file.path);

  try {
    const checkTemplateQuery = 'SELECT * FROM risalah_templates WHERE id_template = $1';
    const checkTemplateResult = await pool.query(checkTemplateQuery, [templateId]);

    if (checkTemplateResult.rows.length === 0) {
      res.status(404).json({ error: 'Template not found' });
      return;
    }

    // Update data template berdasarkan ID
    const updateTemplateQuery = 'UPDATE risalah_templates SET nama_template = $1, file = $2, status = $3, modified_by = $4, modified_date = now() WHERE id_template = $5';
    await pool.query(updateTemplateQuery, [attachmentTitle, attachment, status, modified_by, templateId]);

    res.status(200).json({ message: 'Template updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/_QUERIES/templates/get_template/:file', async (req, res) => {
  const templateName = req.params.file;

  try {
    const getTemplateQuery = 'SELECT * FROM risalah_templates WHERE file = $1';
    const { rows } = await pool.query(getTemplateQuery, [templateName]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Template not found' });
    } else {
      const template = rows[0];
      const templateFilePath = path.join(uploadFolder, template.file);

      // Check if the file exists
      if (!fs.existsSync(templateFilePath)) {
        res.status(404).json({ error: 'Template file not found' });
        return;
      }

      // Set the response headers to specify the file as an attachment
      res.setHeader('Content-Disposition', `attachment; filename=${template.file}`);

      // Send the file using res.download
      res.download(templateFilePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error downloading template file' });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/_QUERIES/relation-documents/get_relation_document/:file', async (req, res) => {
  const relationDocumentName = req.params.file;

  try {
    const getRelationDocumentQuery = 'SELECT * FROM risalah_relation_documents WHERE file = $1';
    const { rows } = await pool.query(getRelationDocumentQuery, [relationDocumentName]);

    if (rows.length === 0) {
      res.status(404).json({ error: 'Relation document not found' });
    } else {
      const relationDocument = rows[0];
      const relationDocumentFilePath = path.join(uploadFolder, relationDocument.file);

      // Check if the file exists
      if (!fs.existsSync(relationDocumentFilePath)) {
        res.status(404).json({ error: 'Relation document file not found' });
        return;
      }

      // Set the response headers to specify the file as an attachment
      res.setHeader('Content-Disposition', `attachment; filename=${relationDocument.file}`);

      // Send the file using res.download
      res.download(relationDocumentFilePath, (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error downloading relation document file' });
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/_QUERIES/risalah/add_risalah', upload.fields([{ name: 'upload_template', maxCount: 1 }, { name: 'relation_documents', maxCount: 10 }]), async (req, res) => {
  try {
    let {
      perihal, periode, id_place, id_template, agenda,
      trackers, created_by, modified_by
    } = req.body;
    console.log('Received payload:', req.body);

    if (typeof trackers === 'string') {
      trackers = JSON.parse(trackers);
    }

    const uploadTemplate = req.files['upload_template'][0].path;
    const uploadTemplateName = path.basename(uploadTemplate);

    // Begin a transaction
    await pool.query('BEGIN');

    const headerResult = await pool.query(
      `INSERT INTO risalah_rapat_header(perihal, periode, id_place, id_template, agenda, upload_template, created_by, modified_by)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING id_risalah_header`,
      [perihal, periode, id_place, id_template, agenda, uploadTemplateName, created_by, modified_by]
    );

    const id_risalah_header = headerResult.rows[0].id_risalah_header;

    for (const tracker of trackers) {
      const { nama_user, jabatan, id_user, role } = tracker;

      await pool.query(
        `INSERT INTO risalah_trackers(nama_user, jabatan, role, id_user, id_risalah_header, created_by, modified_by)
          VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [nama_user, jabatan, role, id_user, id_risalah_header, created_by, modified_by]
      );
    }

    const relationDocuments = req.files['relation_documents'];

    if (relationDocuments) {
      const relationDocumentPaths = relationDocuments.map(file => file.path);

      for (const relationDocumentPath of relationDocumentPaths) {
        const documentFileName = path.basename(relationDocumentPath);

        await pool.query(
          `INSERT INTO risalah_relation_documents(id_risalah_header, file, created_by, modified_by)
            VALUES ($1, $2, $3, $4)`,
          [id_risalah_header, documentFileName, created_by, modified_by]
        );
      }
    }

    // Commit the transaction
    await pool.query('COMMIT');

    res.status(200).json({ result: 'success' });
  } catch (error) {
    // Rollback the transaction in case of error
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/_QUERIES/risalah/patch_risalah/:id_risalah_header', upload.fields([{ name: 'upload_template', maxCount: 1 }, { name: 'relation_documents', maxCount: 10 }]), async (req, res) => {
  const risalahId = req.params.id_risalah_header;

  try {
    let {
      perihal, periode, id_place, id_template, agenda,
      trackers, modified_by
    } = req.body;

    if (typeof trackers === 'string') {
      trackers = JSON.parse(trackers);
    }

    const uploadTemplate = req.files['upload_template'][0].path;
    const uploadTemplateName = path.basename(uploadTemplate);

    // Begin a transaction
    await pool.query('BEGIN');

    // Update the 'risalah_rapat_header' record
    await pool.query(
      `UPDATE risalah_rapat_header
       SET perihal = $1, periode = $2, id_place = $3, id_template = $4, agenda = $5, upload_template = $6, modified_by = $7
       WHERE id_risalah_header = $8`,
      [perihal, periode, id_place, id_template, agenda, uploadTemplateName, modified_by, risalahId]
    );

    // Update 'risalah_trackers' records
    for (const tracker of trackers) {
      const { user_internal, user_eksternal, jabatan, id_user, role } = tracker;

      await pool.query(
        `UPDATE risalah_trackers
         SET user_internal = $1, user_eksternal = $2, jabatan = $3, role = $4, id_user = $5, modified_by = $6
         WHERE id_risalah_header = $7 AND id_tracker = $8`,
        [user_internal, user_eksternal, jabatan, role, id_user, modified_by, risalahId, tracker.id_tracker]
      );
    }

    const relationDocuments = req.files['relation_documents'];

    if (relationDocuments) {
      const relationDocumentPaths = relationDocuments.map(file => file.path);

      for (const relationDocumentPath of relationDocumentPaths) {
        const documentFileName = path.basename(relationDocumentPath);

        await pool.query(
          `INSERT INTO risalah_relation_documents(id_risalah_header, file, created_by, modified_by)
            VALUES ($1, $2, $3, $4)`,
          [id_risalah_header, documentFileName, created_by, modified_by]
        );
      }
    }

    // Commit the transaction
    await pool.query('COMMIT');

    res.status(200).json({ result: 'success' });
  } catch (error) {
    // Rollback the transaction in case of error
    await pool.query('ROLLBACK');
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Baca template DOCX
// const templateFilePath = path.resolve(__dirname, "./format_satu.docx");
// const content = fs.readFileSync(templateFilePath, "binary");

app.post("/generatePDF", async (req, res) => {
  try {
    const saveData = req.body.wordToPDF;

    // fetch the latest template file from the "uploads" folder
    const templateFolder = 'uploads/';
    const templateFiles = fs.readdirSync(templateFolder);

    if (templateFiles.length === 0) {
      console.error('No template files found in the "uploads" folder.');
      return res.status(500).json({ success: false, message: 'No template files found.' });
    }

    templateFiles.sort((a, b) => {
      return fs.statSync(path.join(templateFolder, b)).mtime.getTime() -
             fs.statSync(path.join(templateFolder, a)).mtime.getTime();
    });

    const latestTemplateFile = templateFiles[0];
    const templateFilePath = path.join(templateFolder, latestTemplateFile);

    console.log('Using the latest template file:', latestTemplateFile);

    const content = fs.readFileSync(templateFilePath, "binary");


    // Tentukan kriteria untuk user yang memiliki role "approver"
    const approverUsers = saveData.approverUsers;

    // Mengunduh gambar dari URL dan menyimpannya dalam objek yang berisi buffer gambar
    const imagePromises = approverUsers.map(async (user) => {
      if (user.tanda_tangan.startsWith("http")) {
        return downloadImage(user.tanda_tangan);
      } else {
        return Promise.resolve(fs.readFileSync(user.tanda_tangan));
      }
    });

    const images = await Promise.all(imagePromises);

    var opts = {};
    opts.centered = false;
    opts.fileType = "docx";

    opts.getImage = function (tagValue, tagName) {
      return images.shift();
    };

    opts.getSize = function (img, tagValue, tagName) {
      return [150, 150];
    };

    const doc = new Docxtemplater();
    doc.loadZip(new PizZip(content));

    console.log('Agenda:', saveData.agenda);
    let agendaList = [];

    console.log('Tempat: ', saveData.tempat);

    if (Array.isArray(saveData.agenda) && saveData.agenda.length > 0) {
      agendaList = saveData.agenda.map((item) => ({ item: `${item.trim()}` }));
    }

    console.log('Agenda list:', agendaList);

    const imageModule = new ImageModule(opts);

    doc.attachModule(imageModule).setData({
      hari: saveData.hari,
      tanggal: saveData.tanggal,
      waktu: saveData.waktu,
      tempat: saveData.tempat,
      agendaList: agendaList,
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
    let outputFileName = "testing.docx";
    let index = 1;

    while (fs.existsSync(outputFileName)) {
      outputFileName = `testing(${index}).docx`;
      index++;
    }

    const outputPathDocx = path.resolve(__dirname, outputFileName);

    const buf = doc.getZip().generate({ type: "nodebuffer" });
    fs.writeFileSync(outputPathDocx, buf);

    console.log("DOCX file generated and saved as", outputPathDocx);

    // iLovePDF Conversion
    const ilovepdfInstance = new ILovePDFApi(
      "project_public_ffab4c31a829ed324f7c40608d2cdd7d_9wlVra687ae696b44251dc04c66d330ea0430",
      "secret_key_42ab03b9c7d1c2fa509337419f8597e3_CVU1j22074d3956e3dc3cb03764a6e1e5a377"
    );

    const ilovepdfTask = ilovepdfInstance.newTask("officepdf");

    ilovepdfTask
      .start()
      .then(() => {
        const ilovepdfFile = new ILovePDFFile(outputPathDocx);
        return ilovepdfTask.addFile(ilovepdfFile);
      })
      .then(() => ilovepdfTask.process())
      .then(() => ilovepdfTask.download())
      .then((data) => {
        const outputPdfPath = outputPathDocx.replace(".docx", ".pdf");
        fs.writeFileSync(outputPdfPath, data);
        console.log("PDF file converted and saved as", outputPdfPath);
        res.json({ success: true, pdfPath: outputPdfPath });
      })
      .catch((error) => {
        console.error("Error converting DOCX to PDF:", error);
        res.json({ success: false, message: "Error converting DOCX to PDF" });
      });
  } catch (error) {
    console.error("Error generating PDF:", error);
    console.log("backend error", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

async function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const data = new Stream();
        response.on("data", (chunk) => data.push(chunk));
        response.on("end", () => resolve(data.read()));
        response.on("error", (err) => reject(err));
      } else {
        reject(
          new Error(
            `Request to ${url} failed, status code: ${response.statusCode}`
          )
        );
      }
    });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
