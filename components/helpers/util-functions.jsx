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

export const LANGUAGE_TYPES = [
  { name: 'python', ext: '.py' },
  { name: 'cpp', ext: '.cpp' },
  { name: 'java', ext: '.java' },
  { name: 'jsx', ext: '.jsx' },
  { name: 'javascript', ext: '.js' },
  { name: 'html', ext: '.html' },
  { name: 'json', ext: '.json'},
];

export const getLanguage = (fileName) => {
  const type = fileName.match(/\.[0-9a-z]+$/i)[0];
  const language = LANGUAGE_TYPES.find(({ ext }) => ext === type);
  return language ? language.name : null;
}