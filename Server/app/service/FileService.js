import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// __dirname Define for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Upload Single File
export const uploadSingleFileService = async (req, res) => {
    try {
        const uploadFile = req.files.file;
        const uploadPath = path.join(__dirname, '../../uploads', Date.now() + '-' + uploadFile.name);
        await uploadFile.mv(uploadPath, (err) => {
            if (err) {
                return { status: 'Fail', message: 'Error uploading file' };
            }
        });
        return { status: 'Success', message: 'File uploaded successfully'};
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};



// Upload Multiple File
export const uploadMultipleFilesService = async (req, res) => {
    try { 
        let uploadFiles = req.files.file;
        for (let i = 0; i < uploadFiles.length; i++) {
            const uploadPath = path.join(__dirname, '../../uploads', Date.now() + '-' + uploadFiles[i].name);
            await uploadFiles[i].mv(uploadPath, (err) => {
                if (err) {
                    return { status: 'Fail', message: 'Error uploading file' };
                }
            });
        };
        return { status: 'Success', message: 'Files uploaded successfully'};
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};



// Read File
export const readFileService = async (req, res) => {
    try {   
        const fileName = req.params.fileName;
        const filePath = path.join(__dirname, '../../uploads', fileName);
        return filePath;
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};


// Delete Single File
export const deleteSingleFileService = async (req, res) => {
    try {
        const fileName = req.params.fileName;
        const filePath = path.join(__dirname, '../../uploads', fileName);
        fs.unlink(filePath, (err) => {
            if (err) {
                return { status: 'Fail', message: 'Error deleting file' };
            }
        });
        return { status: 'Success', message: 'File deleted successfully'};
    } catch (error) {
        return { status: 'Fail', message: error.toString()};
    }
};






