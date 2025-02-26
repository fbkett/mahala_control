require('dotenv').config();
const express = require('express');
const app = express();
const supabase = require('./database'); // Importa la configuración de Supabase
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Ruta para obtener todos los productos
app.get('/api/products', async (req, res) => {
    const { data, error } = await supabase
        .from('products')
        .select('*');

    if (error) {
        return res.status(500).json({ error: error.message });
    }
    res.json({ products: data });
});

// Ruta para agregar un nuevo producto
app.post('/api/products', async (req, res) => {
    const { name, description, size, price, quantity } = req.body;
    const { data, error } = await supabase
        .from('products')
        .insert([{ name, description, size, price, quantity }]);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    if (!data || data.length === 0) {
        return res.status(500).json({ error: 'Failed to insert product' });
    }

    res.json({ id: data[0].id });
});

// Ruta para actualizar la cantidad de un producto
app.put('/api/products/:id', async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const { data, error } = await supabase
        .from('products')
        .update({ quantity })
        .eq('id', id);

    if (error) {
        return res.status(500).json({ error: error.message });
    }

    res.json({ message: 'Cantidad actualizada', data });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 