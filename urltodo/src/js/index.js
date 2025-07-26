const fs = require('node:fs');

//const url = '../json/data.json';
info = [{
    "id": 2,
    "url": "https://www.github.com"
}];

async function guardar(datos) {
    fs.writeFile('../json/data.json', JSON.stringify(datos), (err) => {
        if (err) throw err;
        console.log('datos escritos en el archivo');
    });
}

guardar(info);

// fs.readFile(url, 'utf-8', (err, data) => {
//     if (!err) {
//         console.log(data);
//         return data;
//     } else {
//         console.log('Error reading file:', err);
//     }
// });


// const cargarData = async () => {
//     try {
//         const response = await fetch(url);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         return error;
//         //console.error('Error fetching data:', error);
//     }
// };



// info = [{
//     "id": 1,
//     "url": "https://www.google.com"
// }];

// fs.writeFile('db.json', JSON.stringify(info), (err) => {
//     if (err) throw err;
//     console.log('Data written to file');
// });

