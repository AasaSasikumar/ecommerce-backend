// //  const multer = require('multer');
// // const path = require('path');
// // const createMulterInstance = (folderName) => {

// // const storage = multer.diskStorage({
// //   destination: './upload/images',
// //    filename: (req, file, cb) => {
// // return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
// //    },
// //  });
// // }
// // const upload = multer({ storage: storage });

// // module.exports = createMulterInstance;


// // const multer = require("multer");
// // const path = require("path");
// // // const fs = require("fs");
// // // const createMulterInstance = (folderName) => {
// //   const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
// //     //   const dir = `public/images/${folderName}`;
// //     //   fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists
// //     //   cb(null, dir);
// //     },
// //     // filename: (req, file, cb) => {
// //     //   const originalName = path.parse(file.originalname);
// //     //   cb(null, `${originalName.name}_${Date.now()}${originalName.ext}`);
// //     // },
// //   });
// //   const upload=multer({storage:storage})

// // //   return multer({ storage });

// // module.exports = createMulterInstance;


// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const createMulterInstance = (folderName) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const dir = `public/images/${folderName}`;
//       fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists
//       cb(null, dir);
//     },
//     filename: (req, file, cb) => {
//       const originalName = path.parse(file.originalname);
//       cb(null, `${originalName.name}_${Date.now()}${originalName.ext}`);
//     },
//   });
//   return multer({ storage });
// };
// module.exports = createMulterInstance;

// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const createMulterInstance = (folderName) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const dir = path.join(__dirname, "../public/image", folderName);
//       fs.mkdirSync(dir, { recursive: true }); // Ensure the directory exists
//       cb(null, dir);
//     },
//     filename: (req, file, cb) => {
//       const originalName = path.parse(file.originalname);
//       cb(null, `${originalName.name}_${Date.now()}${originalName.ext}`);
//     },
//   });
//   return multer({ storage });
// };

// module.exports = createMulterInstance;
