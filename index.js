import express from 'express';
import studentsCRUD from './crudStudents.js';

import * as path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const log = console.log;
const port = 3000;

// MIDDLEWARES GENERALES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DEJAR PÚBLICA LA CARPETA PUBLIC
app.use(express.static('public'));

//RUTA PÁGINA PRINCIPAL
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
})

//CREAR NUEVO USUARIO
app.post('/api/students', async (req, res) => {
    try {
        let { name, rut, course, level } = req.body;
        if (!name || !rut || !course || !level) {
            return res.status(400).send(`
            <script>
                alert("Error. Debe proporcionar todos los datos solicitados.");
                window.location.href = "/";
            </script>
        `);
        }
        let newStudent = {
            name, rut, course, level
        }
        await studentsCRUD.addStudent(newStudent);
        res.status(201).send(`
        <script>
            alert('Estudiante creado con éxito.');
            window.location.href = "/";
        </script>
    `);
    } catch (error) {
        res.status(500).send(`
        <script>
            alert('${error.message}');
            window.location.href = "/";
        </script>
    `);
    }
});

// OBTENER TODOS LOS ESTUDIANTES
app.get('/api/allstudents', async (req, res) => {
    try {
        const students = await studentsCRUD.getStudents();
        res.json(students)
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor', message: error.message });
    }
});

// ACTUALIZAR ESTUDIANTES
app.put('/api/editar', async (req, res) => {
    const { id, name, rut, course, level } = req.query;
    if (id && name && rut && course && level) {
        try {
            const studentToUpdate = { id, name, rut, course, level };
            const updatedStudent = await studentsCRUD.updateStudent(studentToUpdate);
            if (updatedStudent) {
                res.status(200).send('Estudiante actualizado correctamente.');
            } else {
                res.status(404).send(`Estudiante con ID ${id} no encontrado.`);
            }
        } catch (error) {
            res.status(500).send('Error interno del servidor al actualizar el estudiante.');
        }
    } else {
        res.status(400).send('Todos los campos son requeridos para actualizar el estudiante.');
    }
});

// OBTENER ESTUDIANTES POR RUT
app.get('/api/:rut', async (req, res) => {
    const rut = req.params.rut;
    try {
        const student = await studentsCRUD.getStudentsByRut(rut);
        if (!student) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }
        res.json(student)
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor' });    }
});

// ELIMINAR UN REGISTRO POR ID
app.delete('/api/eliminar/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const student = await studentsCRUD.deleteStudent(id);
        if (student) {
            res.json({
                message: 'Estudiante eliminado.',
                student
            })
        } else {
            res.status(404).json({
                message: `Estudiante con id ${id} no existe.`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: 'Error interno del servidor',
            message: error.message
        });
    }
});

app.listen(port, () => {
    log(`Servidor iniciado en el puerto ${port}`)
});