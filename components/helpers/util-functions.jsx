export function parse(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function (e) {
      resolve({
        key: file.webkitRelativePath,
        code: reader.result
      });
    };

    reader.onerror = function (e) {
      reject(e);
    };
  });
}

export const parseFiles = (files) => {
  let results = [];
  return new Promise((resolve, reject) => {
    files.forEach((file, index) => {
      parse(file).then((result) => {
        results.push(result);
        if (index === files.length - 1) {
          resolve(results);
        }
      }).catch((error) => reject(error));
    });
  });
}