# RootAlly: Full-Stack Developer Intern Task

### **Author**
**Syed Azaan Ahmad**
- **Email**: thesyazah@gmail.com
- **LinkedIn**: [Your LinkedIn Profile](#)
- **Project Link**: [Your Project Repository](#)

---

## **Project Overview**
This project is a physiotherapy exercise assignment and management system built with a ReactJS frontend and a Node.js backend. It allows physiotherapists to assign exercises to patients, manage structured exercise programs, and save them for future use.

---

## **Features**

### **Programs**
- Add new programs.
- Assign exercises to programs with drag-and-drop functionality to set priorities.
- Configure parameters like sets, reps, hold time, and sides for each exercise.
- All requirements from the task description are implemented.

### **Categories**
- Add custom exercises by defining categories and subcategories.
- New exercises automatically appear in the dropdown for assignment in programs.

---

## **Technologies Used**

### **Frontend**
- **ReactJS** (with TypeScript for type safety).
- **TailwindCSS** (for efficient styling).
- **DND Kit** (for drag-and-drop functionality).

### **Backend**
- **Node.js** with **Express**.
- **TypeScript** for structured and type-safe development.
- **Prisma ORM** for database management.
- **NeonDB** for PostgreSQL database hosting.

---
## **Setup and Running Instructions**

### **Step 1: Clone the Repository**
Clone the repository to your local machine:
```bash
git clone <repository-url>
cd <repository-folder>

#FRONTEND
cd frontend
npm install
npm run dev

#BACKEND
cd backend
npm install
npx tsc
npm run dev
npx prisma migrate dev --name init
npm start
