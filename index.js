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
        let student = await studentsCRUD.addStudent(newStudent);
        res.status(201).send(`
        <script>
            alert("Estudiante creado con éxito.");
            window.location.href = "/";
        </script>
    `);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(`
        <script>
            alert("${error.message}");
            window.location.href = "/";
        </script>
    `);
    }
});

// Obtener todos los estudiantes
app.get("/api/allstudents", async (req, res) => {
    try {
        const students = await studentsCRUD.getStudents();
        res.json(students)
    } catch (error) {
        console.log(error);
        res.status(500).send(`
        <script>
            alert("${error.message}");
            window.location.href = "/";
        </script>
    `);
    }
});

//obtener estudiantes por su rut
app.get("/api/:rut", async (req, res) => {
    const rut = req.params.rut;
    try {
        const student = await studentsCRUD.getStudentsByRut(rut);
        res.json(student)
    } catch (error) {
        console.log(error)
    }
});

//Falta implementar el endpoint para el update

//Endpoint eliminar un registro por id
app.get("/api/eliminar/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const student = await studentsCRUD.deleteStudent(id);
        if (student) {
            res.json({
                message: "Estudiante eliminado.",
                student})
        } else {
            res.json({
                message: `Estudiante con id ${id} no existe.`
                })
        }
    } catch (error) {
        console.log(error)
    }
});

app.listen(port, () => {
    log(`Servidor iniciado en el puerto ${port}`)
});

/*
## CHECKLIST

Crear endpoint para el update
Actualizar, revisar manejo de errores y mensajes
¿Formulario para el Update?
Revisar idioma del código/contenido: ingles o español de todo el documento
Mejorar aspecto visual del documento html
Revisar: está todo en orden y sin código innecesario?
Agregar readme
Revisar comillas: simples o dobles
Aspecto visual: letras, colores botones y fondos.
Responsividad
*/