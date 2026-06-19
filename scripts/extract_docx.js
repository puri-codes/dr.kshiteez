const mammoth = require("mammoth");
const fs = require("fs");
const path = require("path");

const input = process.argv[2] || "CV.docx";
const out = process.argv[3] || "CV.txt";

mammoth.extractRawText({ path: input })
  .then((result) => {
    fs.writeFileSync(out, result.value, "utf8");
    console.log("Written", out);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
