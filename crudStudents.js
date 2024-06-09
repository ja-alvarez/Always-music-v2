import pool from './db.js';

//CAMBIAR TODO ESTE CODIGO, ES SOLO DE EJEMPLO (TRABAJO EN CLASES)
//Cambiar users por students*
// comillas ;

const consultarDB = (consulta) => {
    return new Promise(async (resolve, reject) => {
        try {
            let result = await pool.query(consulta);
            resolve(result);
        } catch (error) {
            console.log(error);
            reject("No se pudo traer la información de los estudiantes");
        }
    });
};

const addStudent = async (student) => {
    try {
        const query = {
            text: "INSERT INTO students (name, rut, course, level) VALUES ($1, $2, $3, $4) RETURNING id, name, rut, course, level",
            values: [student.name, student.rut, student.course, student.level],
        };
        let results = await consultarDB(query);
        let estudiante = results.rows[0];
        console.log(results);
        return estudiante
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar agregar un nuevo estudiante");
    }
};

const getStudents = async () => {
    try {
        let query = "SELECT * FROM students ORDER BY id";
        let results = await consultarDB(query);
        let students = results.rows;  //rows[0];
        console.log(students);
        return students;
    } catch (error) {
        console.log(error);
        throw new Error("Error al traer los datos del estudiante.");
    }
};

const getStudentsByRut = async (rut) => {
    try {
        const query = {
            text: 'SELECT * FROM students WHERE rut = $1',
            values: [rut],
        }
        let results = await consultarDB(query);
        let student = results.rows[0];
        console.log(student);
        return student
    } catch (error) {
        console.log(error);
        throw new Error("Error al traer al filtrar el estudiante por rut.");
    }
}
//getStudentsByRut();

const updateStudent = async (student) => {
    try {
        const query = {
            text: "UPDATE students SET name = $1, rut = $2, course = $3, level = $4  WHERE id = $5 RETURNING id, name, rut, course, level",
            values: [student.name, student.rut, student.course, student.level, student.id],
        };
        let results = await consultarDB(query);
        let estudiante = results.rows[0];
        console.log(estudiante);
        return estudiante
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar actualizar al estudiante.");
    }
};

const deleteStudent = async (id) => {
    try {
        const query = {
            text: "DELETE FROM students WHERE ID = $1 RETURNING id, name, rut, course, level",
            values: [id],
        };
        let results = await consultarDB(query);
        let student = results.rows[0];
        console.log(student);
        return student;
    } catch (error) {
        console.log(error);
        throw new Error("Error al intentar eliminar al estudiante.");
    }
};

let studentsCRUD = {
    getStudents,
    getStudentsByRut,
    addStudent,
    deleteStudent,
    updateStudent
}

export default studentsCRUD;