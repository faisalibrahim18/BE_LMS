const express = require("express");
const router = express();
const {
  create,
  index,
  update,
  find,
  destroy,
  download,
  downloadDistribusiPDF,
  importExcel,
  count,
} = require("./controler");
const { authenticateUser, authhorizeRoles } = require("../../../middlewares/auth");

const upload = require("../../../middlewares/multer");

router.post("/distribusi", authenticateUser, authhorizeRoles("admin"), create);

router.get("/distribusi", index);

router.get("/distribusi/:id", authenticateUser, authhorizeRoles("admin", "user_laundry"), find);

router.put("/distribusi/:id", update);

router.delete("/distribusi/:id", authenticateUser, authhorizeRoles("admin", "user_laundry"), destroy);

router.get("/distribusiDownload", download);

router.get("/distribusiDownloadPdf", downloadDistribusiPDF);

router.post("/distribusi/upload", upload.single("excel"), authenticateUser, importExcel);

router.get("/distribusiCount", authenticateUser, count);

module.exports = router;
