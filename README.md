## **Cover Letter Generator**   
  
### Overview   

The Cover Letter Generator is a web application that allows users to generate and customize professional cover letters based on job descriptions. Users can input a LinkedIn job profile link, generate a tailored cover letter using OpenAI's GPT model, customize the content further, and download the final cover letter as a Word document.  

## Features  

- Generate Cover Letter: Enter a job link to generate a cover letter.
- Customize Cover Letter: Modify the generated content and update it dynamically.
- Download Word Document: Save the generated cover letter as a .doc file.
- Clear All: Reset the generated and customized content with a single click.  

## Technologies Used  

### Frontend  

- React: For building the user interface.
- Next.js: Framework for server-side rendering and client-side navigation.
- Tailwind CSS: For responsive and modern styling.
- TypeScript: For type safety and better developer experience.  

### Backend  

- Flask: Lightweight Python web framework to handle API requests.
- OpenAI GPT-3.5/4 API: Used for generating and customizing cover letters.
- Flask-CORS: To enable cross-origin requests from the frontend.
- dotenv: To manage environment variables securely.  

### Utilities  

- Blob API: For generating downloadable Word documents dynamically.
- REST Client: To test the backend API endpoints.
- File Saver: Optional library for easier file downloads.  

## Requirements  
- Node.js (v14 or later)
- Python (v3.8 or later)
- OpenAI API Key  

## Usage  

Generate Cover Letter: Enter a LinkedIn job profile link and click Generate Cover Letter.  

Customize Cover Letter: Edit the generated content in the customization text area and click Customize Cover Letter.  

Download Word Doc: Click Download Word Doc to save the generated cover letter as a `.doc` file.  

Clear All: Click Clear to reset the generated and customized content.  



## Contributing  
Feel free to fork this repository and submit pull requests for new features, bug fixes, or enhancements.



