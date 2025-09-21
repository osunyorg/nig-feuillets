async function isWebpSupported() {
    return new Promise((resolve) => {
        let img = new Image();
        img.onload = function() {
            let isSupported = (img.naturalWidth > 0);    
            if (isSupported) {
                resolve(true);
            } else {
                resolve(false);
            }
        };
        img.onerror = function() {
            resolve(false);
        };
        img.src = '/assets/images/jouer/characters/alice.webp';

    });
} 
  
export default async () => {
    if (await isWebpSupported()) {
        return ".webp";
    } else {
        return ".png";
    }
};
  
window.WebpIsSupported = isWebpSupported();