Follow these steps to install and run the project on your local machine:

Step 1. Clone the Repository:
        git clone <repository-url>// Replace <repository-url> with actual repo link.
  
Step 2. Go to the Project Directory:
        cd your-project-folder-name //(newp\game-app\game-app)
   
Step 3. Install Dependencies:
       npm install // Make sure you have Node.js and npm installed.
       This will install packages including:
       ⮞react
       ⮞vite
       ⮞redux and @reduxjs/toolkit
       ⮞react-redux
       ⮞@clerk/clerk-react (for authentication)
       If Clerk or Redux packages are missing, you can manually install them by using the following command:
          1.npm install @clerk/clerk-react
          2.npm install @reduxjs/toolkit react-redux

Step 4. Start Development Server:
        npm run dev
   

This will start the Vite dev server at:
http://localhost:5173 //Note: The project will only work on http://localhost:5173

Requirements:
 1.Node.js v14+
 2.npm
 3.A code editor (like VS Code)
 4.Clerk Account (for Auth setup)

