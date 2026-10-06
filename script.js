/* =====================================================
   COLLEGE ATTENDANCE MANAGEMENT SYSTEM
   HTML + CSS + JavaScript + localStorage
   ===================================================== */


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

const STUDENTS_KEY = "college_students";
const SUBJECTS_KEY = "college_subjects";
const ATTENDANCE_KEY = "college_attendance";


let students =
    JSON.parse(
        localStorage.getItem(STUDENTS_KEY)
    ) || [];


let subjects =
    JSON.parse(
        localStorage.getItem(SUBJECTS_KEY)
    ) || [];


let attendance =
    JSON.parse(
        localStorage.getItem(ATTENDANCE_KEY)
    ) || [];


/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        setCurrentDate();

        setDefaultDates();

        createDemoDataIfEmpty();

        refreshEverything();

    }
);


/* =====================================================
   DEMO DATA
   ===================================================== */

function createDemoDataIfEmpty() {

    if (students.length === 0) {

        students = [

            {
                id: generateId(),

                rollNo: "CSE001",

                name: "Rahul Patil",

                department:
                    "Computer Engineering",

                semester: "5",

                division: "A"
            },

            {
                id: generateId(),

                rollNo: "CSE002",

                name: "Priya Sharma",

                department:
                    "Computer Engineering",

                semester: "5",

                division: "A"
            },

            {
                id: generateId(),

                rollNo: "CSE003",

                name: "Amit Joshi",

                department:
                    "Computer Engineering",

                semester: "5",

                division: "A"
            }

        ];

        saveStudents();
    }


    if (subjects.length === 0) {

        subjects = [

            {
                id: generateId(),

                code: "CS501",

                name: "Database Management System"
            },

            {
                id: generateId(),

                code: "CS502",

                name: "Computer Networks"
            },

            {
                id: generateId(),

                code: "CS503",

                name: "Software Engineering"
            }

        ];

        saveSubjects();
    }

}


/* =====================================================
   ID GENERATOR
   ===================================================== */

function generateId() {

    return Date.now() +
        Math.floor(
            Math.random() * 10000
        );
}


/* =====================================================
   LOCAL STORAGE SAVE
   ===================================================== */

function saveStudents() {

    localStorage.setItem(
        STUDENTS_KEY,
        JSON.stringify(students)
    );
}


function saveSubjects() {

    localStorage.setItem(
        SUBJECTS_KEY,
        JSON.stringify(subjects)
    );
}


function saveAttendance() {

    localStorage.setItem(
        ATTENDANCE_KEY,
        JSON.stringify(attendance)
    );
}


/* =====================================================
   REFRESH EVERYTHING
   ===================================================== */

function refreshEverything() {

    displayStudents();

    displaySubjects();

    populateSubjectDropdowns();

    loadAttendanceTable();

    displayRecords();

    displayPercentages();

    updateDashboard();

}


/* =====================================================
   CURRENT DATE
   ===================================================== */

function setCurrentDate() {

    const today = new Date();

    document.getElementById(
        "currentDate"
    ).textContent =
        today.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );
}


/* =====================================================
   DEFAULT DATES
   ===================================================== */

function getToday() {

    const now = new Date();

    const year =
        now.getFullYear();

    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");

    const day =
        String(
            now.getDate()
        ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


function setDefaultDates() {

    const today = getToday();

    document.getElementById(
        "attendanceDate"
    ).value = today;

    document.getElementById(
        "recordDate"
    ).value = "";
}


/* =====================================================
   NAVIGATION
   ===================================================== */

function showSection(
    sectionId,
    button
) {

    document
        .querySelectorAll(".section")
        .forEach(
            section => {
                section.classList.add(
                    "hidden"
                );
            }
        );


    const section =
        document.getElementById(
            sectionId
        );

    section.classList.remove(
        "hidden"
    );


    document
        .querySelectorAll(".tab")
        .forEach(
            tab => {
                tab.classList.remove(
                    "active"
                );
            }
        );


    button.classList.add(
        "active"
    );


    if (
        sectionId ===
        "attendanceSection"
    ) {

        loadAttendanceTable();

    }


    if (
        sectionId ===
        "recordsSection"
    ) {

        displayRecords();

        displayPercentages();

    }

}


function openTab(sectionId) {

    document
        .querySelectorAll(".section")
        .forEach(
            section => {
                section.classList.add(
                    "hidden"
                );
            }
        );


    document
        .getElementById(sectionId)
        .classList.remove(
            "hidden"
        );


    document
        .querySelectorAll(".tab")
        .forEach(
            tab => {
                tab.classList.remove(
                    "active"
                );
            }
        );


    const tabs =
        document.querySelectorAll(
            ".tab"
        );


    tabs.forEach(tab => {

        if (
            tab.textContent
                .toLowerCase()
                .includes(
                    sectionId
                        .replace(
                            "Section",
                            ""
                        )
                        .toLowerCase()
                )
        ) {

            tab.classList.add(
                "active"
            );

        }

    });

}


/* =====================================================
   DASHBOARD
   ===================================================== */

function updateDashboard() {

    document.getElementById(
        "totalStudents"
    ).textContent =
        students.length;


    document.getElementById(
        "totalSubjects"
    ).textContent =
        subjects.length;


    const today =
        getToday();


    const todayRecords =
        attendance.filter(
            record =>
                record.date === today
        );


    const present =
        todayRecords.filter(
            record =>
                record.status ===
                "Present"
        ).length;


    const absent =
        todayRecords.filter(
            record =>
                record.status ===
                "Absent"
        ).length;


    document.getElementById(
        "todayPresent"
    ).textContent =
        present;


    document.getElementById(
        "todayAbsent"
    ).textContent =
        absent;


    const overview =
        document.getElementById(
            "dashboardOverview"
        );


    const total =
        present + absent;


    const percentage =
        total > 0

            ? (
                present /
                total *
                100
            ).toFixed(1)

            : 0;


    overview.innerHTML = `

        <div class="overview-box">

            <h3>${students.length}</h3>

            <p>Students Registered</p>

        </div>


        <div class="overview-box">

            <h3>${subjects.length}</h3>

            <p>Subjects Added</p>

        </div>


        <div class="overview-box">

            <h3>${percentage}%</h3>

            <p>Today's Attendance</p>

        </div>

    `;

}


/* =====================================================
   STUDENTS
   ===================================================== */

function addStudent() {

    const rollNo =
        document.getElementById(
            "rollNo"
        ).value.trim();


    const name =
        document.getElementById(
            "studentName"
        ).value.trim();


    const department =
        document.getElementById(
            "department"
        ).value.trim();


    const semester =
        document.getElementById(
            "semester"
        ).value;


    const division =
        document.getElementById(
            "division"
        ).value.trim();


    if (
        !rollNo ||
        !name ||
        !department
    ) {

        alert(
            "Please fill all required fields."
        );

        return;
    }


    const duplicate =
        students.some(
            student =>
                student.rollNo
                    .toLowerCase() ===
                rollNo.toLowerCase()
        );


    if (duplicate) {

        alert(
            "This roll number already exists."
        );

        return;
    }


    students.push({

        id: generateId(),

        rollNo: rollNo,

        name: name,

        department: department,

        semester: semester,

        division: division

    });


    saveStudents();


    document.getElementById(
        "rollNo"
    ).value = "";


    document.getElementById(
        "studentName"
    ).value = "";


    document.getElementById(
        "department"
    ).value = "";


    document.getElementById(
        "division"
    ).value = "";


    refreshEverything();


    alert(
        "Student added successfully! ✓"
    );

}


/* =====================================================
   DISPLAY STUDENTS
   ===================================================== */

function displayStudents() {

    const table =
        document.getElementById(
            "studentsTable"
        );


    const search =
        document.getElementById(
            "studentSearch"
        )?.value
            .toLowerCase()
            .trim() || "";


    const filtered =
        students.filter(
            student =>

                student.rollNo
                    .toLowerCase()
                    .includes(search)

                ||

                student.name
                    .toLowerCase()
                    .includes(search)

                ||

                student.department
                    .toLowerCase()
                    .includes(search)
        );


    table.innerHTML = "";


    if (
        filtered.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td colspan="7"
                    style="text-align:center">

                    No students found.

                </td>

            </tr>

        `;

        return;
    }


    filtered.forEach(
        (student, index) => {

            table.innerHTML += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(
                                student.rollNo
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(
                            student.name
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            student.department
                        )}
                    </td>

                    <td>
                        ${student.semester}
                    </td>

                    <td>
                        ${escapeHTML(
                            student.division || "-"
                        )}
                    </td>

                    <td>

                        <button
                            class="btn warning"
                            onclick="editStudent('${student.id}')">

                            ✏️ Edit

                        </button>

                        <button
                            class="btn danger"
                            onclick="deleteStudent('${student.id}')">

                            🗑️ Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


/* =====================================================
   EDIT STUDENT
   ===================================================== */

function editStudent(id) {

    const student =
        students.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!student) return;


    const newName =
        prompt(
            "Enter student name:",
            student.name
        );


    if (
        newName === null ||
        !newName.trim()
    ) {

        return;
    }


    const newDepartment =
        prompt(
            "Enter department:",
            student.department
        );


    if (
        newDepartment === null ||
        !newDepartment.trim()
    ) {

        return;
    }


    student.name =
        newName.trim();


    student.department =
        newDepartment.trim();


    saveStudents();

    refreshEverything();


    alert(
        "Student updated successfully! ✓"
    );

}


/* =====================================================
   DELETE STUDENT
   ===================================================== */

function deleteStudent(id) {

    const student =
        students.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!student) return;


    const confirmDelete =
        confirm(
            `Delete ${student.name}?`
        );


    if (!confirmDelete) return;


    students =
        students.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    attendance =
        attendance.filter(
            record =>
                String(record.studentId) !==
                String(id)
        );


    saveStudents();

    saveAttendance();

    refreshEverything();


    alert(
        "Student deleted successfully."
    );

}


/* =====================================================
   SUBJECTS
   ===================================================== */

function addSubject() {

    const code =
        document.getElementById(
            "subjectCode"
        ).value.trim();


    const name =
        document.getElementById(
            "subjectName"
        ).value.trim();


    if (!code || !name) {

        alert(
            "Please enter subject code and name."
        );

        return;
    }


    const duplicate =
        subjects.some(
            subject =>
                subject.code
                    .toLowerCase() ===
                code.toLowerCase()
        );


    if (duplicate) {

        alert(
            "This subject code already exists."
        );

        return;
    }


    subjects.push({

        id: generateId(),

        code: code,

        name: name

    });


    saveSubjects();


    document.getElementById(
        "subjectCode"
    ).value = "";


    document.getElementById(
        "subjectName"
    ).value = "";


    refreshEverything();


    alert(
        "Subject added successfully! ✓"
    );

}


/* =====================================================
   DISPLAY SUBJECTS
   ===================================================== */

function displaySubjects() {

    const table =
        document.getElementById(
            "subjectsTable"
        );


    table.innerHTML = "";


    if (
        subjects.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td colspan="4"
                    style="text-align:center">

                    No subjects available.

                </td>

            </tr>

        `;

        return;
    }


    subjects.forEach(
        (subject, index) => {

            table.innerHTML += `

                <tr>

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(
                                subject.code
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(
                            subject.name
                        )}
                    </td>

                    <td>

                        <button
                            class="btn danger"
                            onclick="deleteSubject('${subject.id}')">

                            🗑️ Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


/* =====================================================
   DELETE SUBJECT
   ===================================================== */

function deleteSubject(id) {

    const subject =
        subjects.find(
            item =>
                String(item.id) ===
                String(id)
        );


    if (!subject) return;


    if (
        !confirm(
            `Delete ${subject.name}?`
        )
    ) {

        return;
    }


    subjects =
        subjects.filter(
            item =>
                String(item.id) !==
                String(id)
        );


    attendance =
        attendance.filter(
            record =>
                String(record.subjectId) !==
                String(id)
        );


    saveSubjects();

    saveAttendance();

    refreshEverything();


    alert(
        "Subject deleted successfully."
    );

}


/* =====================================================
   SUBJECT DROPDOWNS
   ===================================================== */

function populateSubjectDropdowns() {

    const attendanceSelect =
        document.getElementById(
            "attendanceSubject"
        );


    const recordSelect =
        document.getElementById(
            "recordSubject"
        );


    const oldAttendanceValue =
        attendanceSelect.value;


    const oldRecordValue =
        recordSelect.value;


    attendanceSelect.innerHTML = `

        <option value="">
            Select Subject
        </option>

    `;


    recordSelect.innerHTML = `

        <option value="">
            All Subjects
        </option>

    `;


    subjects.forEach(
        subject => {

            attendanceSelect.innerHTML += `

                <option value="${subject.id}">

                    ${escapeHTML(
                        subject.code
                    )}
                    -
                    ${escapeHTML(
                        subject.name
                    )}

                </option>

            `;


            recordSelect.innerHTML += `

                <option value="${subject.id}">

                    ${escapeHTML(
                        subject.code
                    )}
                    -
                    ${escapeHTML(
                        subject.name
                    )}

                </option>

            `;

        }
    );


    if (
        subjects.some(
            s =>
                String(s.id) ===
                oldAttendanceValue
        )
    ) {

        attendanceSelect.value =
            oldAttendanceValue;

    }


    if (
        subjects.some(
            s =>
                String(s.id) ===
                oldRecordValue
        )
    ) {

        recordSelect.value =
            oldRecordValue;

    }

}


/* =====================================================
   ATTENDANCE TABLE
   ===================================================== */

function loadAttendanceTable() {

    const table =
        document.getElementById(
            "attendanceTable"
        );


    const subjectId =
        document.getElementById(
            "attendanceSubject"
        ).value;


    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    table.innerHTML = "";


    if (!subjectId || !date) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center">

                    Select a subject and date
                    to mark attendance.

                </td>

            </tr>

        `;

        return;
    }


    if (
        students.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center">

                    Add students first.

                </td>

            </tr>

        `;

        return;
    }


    students.forEach(
        student => {

            const existing =
                attendance.find(
                    record =>

                        String(
                            record.studentId
                        ) ===
                        String(student.id)

                        &&

                        String(
                            record.subjectId
                        ) ===
                        String(subjectId)

                        &&

                        record.date ===
                        date
                );


            const status =
                existing
                    ? existing.status
                    : "Present";


            const isPresent =
                status === "Present";


            table.innerHTML += `

                <tr>

                    <td>
                        <strong>
                            ${escapeHTML(
                                student.rollNo
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(
                            student.name
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            student.department
                        )}
                    </td>

                    <td>
                        ${student.semester}
                    </td>

                    <td>
                        ${escapeHTML(
                            student.division || "-"
                        )}
                    </td>

                    <td>

                        <button

                            class="status
                            ${isPresent
                                ? "present"
                                : "absent"}"

                            data-student="${student.id}"

                            data-status="${status}"

                            onclick="toggleStatus(this)">

                            ${isPresent
                                ? "✓ Present"
                                : "✕ Absent"}

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


/* =====================================================
   TOGGLE ATTENDANCE STATUS
   ===================================================== */

function toggleStatus(button) {

    const current =
        button.dataset.status;


    if (
        current === "Present"
    ) {

        button.dataset.status =
            "Absent";

        button.textContent =
            "✕ Absent";

        button.classList.remove(
            "present"
        );

        button.classList.add(
            "absent"
        );

    } else {

        button.dataset.status =
            "Present";

        button.textContent =
            "✓ Present";

        button.classList.remove(
            "absent"
        );

        button.classList.add(
            "present"
        );

    }

}


/* =====================================================
   MARK ALL
   ===================================================== */

function markAll(status) {

    const buttons =
        document.querySelectorAll(
            "#attendanceTable .status"
        );


    if (buttons.length === 0) {

        alert(
            "Select subject and date first."
        );

        return;
    }


    buttons.forEach(
        button => {

            button.dataset.status =
                status;


            if (
                status === "Present"
            ) {

                button.textContent =
                    "✓ Present";

                button.classList.remove(
                    "absent"
                );

                button.classList.add(
                    "present"
                );

            } else {

                button.textContent =
                    "✕ Absent";

                button.classList.remove(
                    "present"
                );

                button.classList.add(
                    "absent"
                );

            }

        }
    );

}


/* =====================================================
   SAVE ATTENDANCE
   ===================================================== */

function saveAttendance() {

    const subjectId =
        document.getElementById(
            "attendanceSubject"
        ).value;


    const date =
        document.getElementById(
            "attendanceDate"
        ).value;


    if (!subjectId) {

        alert(
            "Please select a subject."
        );

        return;
    }


    if (!date) {

        alert(
            "Please select a date."
        );

        return;
    }


    const buttons =
        document.querySelectorAll(
            "#attendanceTable .status"
        );


    if (buttons.length === 0) {

        alert(
            "No students available."
        );

        return;
    }


    buttons.forEach(
        button => {

            const studentId =
                button.dataset.student;


            const status =
                button.dataset.status;


            const existingIndex =
                attendance.findIndex(
                    record =>

                        String(
                            record.studentId
                        ) ===
                        String(studentId)

                        &&

                        String(
                            record.subjectId
                        ) ===
                        String(subjectId)

                        &&

                        record.date ===
                        date
                );


            const record = {

                id:
                    existingIndex >= 0
                        ? attendance[
                            existingIndex
                        ].id
                        : generateId(),

                studentId:
                    studentId,

                subjectId:
                    subjectId,

                date:
                    date,

                status:
                    status

            };


            if (
                existingIndex >= 0
            ) {

                attendance[
                    existingIndex
                ] = record;

            } else {

                attendance.push(
                    record
                );

            }

        }
    );


    saveAttendance();


    updateDashboard();

    displayRecords();

    displayPercentages();


    alert(
        "Attendance saved successfully! ✓"
    );

}


/* =====================================================
   RECORDS
   ===================================================== */

function displayRecords() {

    const table =
        document.getElementById(
            "recordsTable"
        );


    const subjectFilter =
        document.getElementById(
            "recordSubject"
        ).value;


    const dateFilter =
        document.getElementById(
            "recordDate"
        ).value;


    const search =
        document.getElementById(
            "recordSearch"
        )?.value
            .toLowerCase()
            .trim() || "";


    let records =
        [...attendance];


    if (subjectFilter) {

        records =
            records.filter(
                record =>
                    String(
                        record.subjectId
                    ) ===
                    String(subjectFilter)
            );

    }


    if (dateFilter) {

        records =
            records.filter(
                record =>
                    record.date ===
                    dateFilter
            );

    }


    if (search) {

        records =
            records.filter(
                record => {

                    const student =
                        students.find(
                            s =>
                                String(
                                    s.id
                                ) ===
                                String(
                                    record.studentId
                                )
                        );


                    if (!student) {
                        return false;
                    }


                    return (

                        student.rollNo
                            .toLowerCase()
                            .includes(search)

                        ||

                        student.name
                            .toLowerCase()
                            .includes(search)

                    );

                }
            );

    }


    records.sort(
        (a, b) =>
            b.date.localeCompare(
                a.date
            )
    );


    table.innerHTML = "";


    if (
        records.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center">

                    No attendance records found.

                </td>

            </tr>

        `;

        return;
    }


    records.forEach(
        record => {

            const student =
                students.find(
                    s =>
                        String(s.id) ===
                        String(
                            record.studentId
                        )
                );


            const subject =
                subjects.find(
                    s =>
                        String(s.id) ===
                        String(
                            record.subjectId
                        )
                );


            if (
                !student ||
                !subject
            ) {

                return;
            }


            const present =
                record.status ===
                "Present";


            table.innerHTML += `

                <tr>

                    <td>
                        ${record.date}
                    </td>

                    <td>
                        <strong>
                            ${escapeHTML(
                                student.rollNo
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(
                            student.name
                        )}
                    </td>

                    <td>
                        ${escapeHTML(
                            subject.code
                        )}
                        -
                        ${escapeHTML(
                            subject.name
                        )}
                    </td>

                    <td>

                        <span
                            class="status
                            ${present
                                ? "present"
                                : "absent"}">

                            ${present
                                ? "✓ Present"
                                : "✕ Absent"}

                        </span>

                    </td>

                    <td>

                        <button
                            class="btn danger"
                            onclick="deleteAttendance('${record.id}')">

                            🗑️ Delete

                        </button>

                    </td>

                </tr>

            `;

        }
    );

}


/* =====================================================
   DELETE ATTENDANCE
   ===================================================== */

function deleteAttendance(id) {

    if (
        !confirm(
            "Delete this attendance record?"
        )
    ) {

        return;
    }


    attendance =
        attendance.filter(
            record =>
                String(record.id) !==
                String(id)
        );


    saveAttendance();


    refreshEverything();


    alert(
        "Attendance record deleted."
    );

}


/* =====================================================
   ATTENDANCE PERCENTAGE
   ===================================================== */

function displayPercentages() {

    const table =
        document.getElementById(
            "percentageTable"
        );


    table.innerHTML = "";


    if (
        students.length === 0
    ) {

        table.innerHTML = `

            <tr>

                <td colspan="6"
                    style="text-align:center">

                    No students available.

                </td>

            </tr>

        `;

        return;
    }


    students.forEach(
        student => {

            const records =
                attendance.filter(
                    record =>
                        String(
                            record.studentId
                        ) ===
                        String(student.id)
                );


            const total =
                records.length;


            const present =
                records.filter(
                    record =>
                        record.status ===
                        "Present"
                ).length;


            const absent =
                records.filter(
                    record =>
                        record.status ===
                        "Absent"
                ).length;


            const percentage =
                total > 0

                    ? (
                        present /
                        total *
                        100
                    )

                    : 0;


            let percentageClass =
                "good";


            if (
                percentage < 75 &&
                percentage >= 60
            ) {

                percentageClass =
                    "warning";

            }


            if (
                percentage < 60
            ) {

                percentageClass =
                    "low";

            }


            table.innerHTML += `

                <tr>

                    <td>
                        <strong>
                            ${escapeHTML(
                                student.rollNo
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHTML(
                            student.name
                        )}
                    </td>

                    <td>
                        ${total}
                    </td>

                    <td>
                        ${present}
                    </td>

                    <td>
                        ${absent}
                    </td>

                    <td>

                        <span
                            class="percentage
                            ${percentageClass}">

                            ${percentage.toFixed(2)}%

                        </span>

                    </td>

                </tr>

            `;

        }
    );

}


/* =====================================================
   CLEAR ALL DATA
   ===================================================== */

function clearAllData() {

    const confirmed =
        confirm(
            "WARNING!\n\n" +
            "This will permanently delete " +
            "all students, subjects and attendance " +
            "from this browser.\n\n" +
            "Continue?"
        );


    if (!confirmed) {
        return;
    }


    students = [];

    subjects = [];

    attendance = [];


    localStorage.removeItem(
        STUDENTS_KEY
    );

    localStorage.removeItem(
        SUBJECTS_KEY
    );

    localStorage.removeItem(
        ATTENDANCE_KEY
    );


    refreshEverything();


    alert(
        "All data has been cleared."
    );

}


/* =====================================================
   HTML SECURITY
   ===================================================== */

function escapeHTML(value) {

    return String(value)

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}