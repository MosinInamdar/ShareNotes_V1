import fs from 'fs';

const deleteUpload = async (req, res, next) => {
    if (req.file) {
        console.log(req.file)
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.error('Error deleting uploaded file:', err);
        } else {
          console.log('Deleted uploaded file:', req.file.path);
        }
      });
    }
    next();
  };

export default deleteUpload;