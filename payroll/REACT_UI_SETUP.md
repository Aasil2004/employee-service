# React UI Setup Guide for Payroll Management System

## Quick Start

1. **Navigate to the React project:**
   ```bash
   cd react-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

The React UI will open at `http://localhost:3000`

## Before Running

Make sure your Spring Boot backend is running on `http://localhost:8080` with:
- Database configured and running
- CORS configuration enabled (already added to the project)
- All endpoints accessible

## Key Features

✅ **Employee Management**
- View all employees in a beautiful grid layout
- Add new employees with role selection
- Edit employee information
- Delete employees with confirmation

✅ **Role Support**
- Dropdown selection of available roles
- Validation to ensure proper role assignment

✅ **Responsive Design**
- Bootstrap 5 styling
- Mobile-friendly interface
- Modern, clean UI with icons

✅ **Error Handling**
- User-friendly error messages
- Loading states during API calls
- Connection status feedback

## API Integration

The React app communicates with these endpoints:
- `GET /employees` - List all employees
- `POST /employees` - Create new employee
- `GET /employees/{id}` - Get single employee
- `PUT /employees/{id}` - Update employee
- `DELETE /employees/{id}` - Delete employee
- `GET /roles` - Get available roles

## Technologies

- **React 18.2** - Modern UI library
- **Axios** - HTTP requests
- **Bootstrap 5** - Responsive styling
- **React Hooks** - State management (useState, useEffect)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Backend connection error | Ensure Spring Boot runs on port 8080 |
| Roles not showing | Check `/roles` endpoint is available |
| CORS errors | Verify CorsConfig.java is in the backend |
| npm install fails | Delete node_modules, clear cache: `npm cache clean --force` |

## Project Structure

```
react-ui/
├── src/
│   ├── components/
│   │   ├── EmployeeList.js       # Main employee list
│   │   ├── EmployeeCard.js       # Individual employee display
│   │   ├── EmployeeForm.js       # Add new employee form
│   │   └── EditEmployeeForm.js   # Edit employee form
│   ├── App.js                    # Main app component
│   └── index.js                  # Entry point
├── public/
│   └── index.html                # HTML template
└── package.json                  # Dependencies
```

## Next Steps

1. Run the Spring Boot backend first
2. Open a new terminal and navigate to `react-ui`
3. Run `npm install` to install dependencies
4. Run `npm start` to launch the React development server
5. The UI will automatically open in your default browser

Enjoy managing your employees! 🎉
