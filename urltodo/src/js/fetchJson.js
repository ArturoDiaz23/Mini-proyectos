const url = 'src/json/data.json';

export const cargarData = async () => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        return error;
        //console.error('Error fetching data:', error);
    }
};