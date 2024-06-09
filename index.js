import express from 'express';
import studentsCRUD from './crudStudents.js';


import * as path from "path";
import { fileURLToPath } from "url";
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
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./public/index.html"));
})

//Api crear nuevo usuario
app.post("/api/students", async (req, res) => {
    try {
        let { name, rut, course, level } = req.body;
        if (!name || !rut || !course || !level) {
            return res.status(400).json({
                message: "Debe proporcionar todos los datos solicitados [name, rut, course, level]"
            })
        }
        let newStudent = {
            name, rut, course, level
        }
        let student = await studentsCRUD.addStudent(newStudent);
        res.status(201).json({
            message: "Estudiante creado con éxito.",
            student
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: error.message
        })
    }
});

app.listen(port, () => {
    log(`Servidor iniciado en el puerto ${port}`)
});