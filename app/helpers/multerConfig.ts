import multer from "multer";
import { NextRequest } from "next/server";

// Setup multer for validation and upload destination
const fileUploadDestination = "public/uploads";
const storage = multer.diskStorage({
    destination: function ({ request: NextRequest, file, cb }: any): void {
        let error = null;
        // Validation test if needed...
        cb(error, fileUploadDestination);
    },
    filename: (req, file, cb) => {
        const fullFileName = Date.now() + "-" + file.originalname;
        cb(null, fullFileName);
    },
});

const upload = multer({ storage });
