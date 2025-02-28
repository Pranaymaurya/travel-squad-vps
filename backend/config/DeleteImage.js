import fs from 'fs';
const __dirname = fs.realpathSync('.');
export const FindAndDeleteImage = (oldUrl,newUrl)=>{
    const formattedOldImagePath = oldUrl.replace(/\\/g, "/");
    const formattedNewImagePath = newUrl.replace(/\\/g, "/");
    if (formattedOldImagePath !== formattedNewImagePath) {
        fs.unlink(__dirname+formattedOldImagePath, (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
}
}
 
export function DeleteImage(imageUrl) {
    const formattedImagePath = imageUrl.replace(/\\/g, "/");
    fs.unlink(__dirname + formattedImagePath, (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
}