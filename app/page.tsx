'use client';

import { useState } from 'react';

import { generateCoverLetter, customizeCoverLetter } from '@/actions/actions';

export default function CoverLetterGenerator(){

  const [jobLink, setJobLink] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [customization, setCustomization] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
    const generatedLetter = await generateCoverLetter(jobLink);
    setCoverLetter(generatedLetter);
  } catch (error) {
    console.error('Error generating cover letter:', error);
  } finally {
    setIsLoading(false);
  }
};

const clearAll = () => {
  setCustomization('');
};
  const handleCustomize = async() => {

    setIsCustomizing(true);
    try{
      const customizedLetter = await customizeCoverLetter(coverLetter, customization);
      setCoverLetter(customizedLetter);
    } catch (error) {
      console.error('Error customizing cover letter:', error);
    } finally {
      setIsCustomizing(false);
    }
  };

  const downloadDoc = () =>{
    if(!coverLetter){
      alert("Please generate a cover letter first!");
      return;
    }
  

    const fileContent = `
    <!DOCTYPE html>
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta charset="utf-8">
      <title>Cover Letter</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: black;
        }
      </style>
    </head>
    <body>
      ${coverLetter.replace(/\n/g, '<br/>')}
    </body>
    </html>
  `;
  const blob = new Blob([fileContent], {
    type: 'application/msword',
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'cover_letter.doc'; 
  a.click();

 
  URL.revokeObjectURL(url);
};

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-2xl mx-auto border p-4 rounded shadow">
      <h1 className="text-xl font-bold">Cover Letter Generator</h1>
      <p className="text-gray-600">Generate and customize a cover letter based on a LinkedIn job posting.</p>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
        <label htmlFor="jobLink" className="block font-medium">LinkedIn Job Profile Link</label>
        <input
              id="jobLink"
              type="url"
              className="w-full border rounded p-2 text-black"
              placeholder="https://www.linkedin.com/jobs/view/..."
              value={jobLink}
              onChange={(e) => setJobLink(e.target.value)}
              required
            />
        </div>
        <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
            disabled={isLoading} >
          {isLoading ? 'Generating...' : 'Generate Cover Letter'}
          </button>
          </form>

          {coverLetter && (
            <div className="mt-6">
              <h2 className="font-bold">Generated Cover Letter</h2>
              <textarea
              className="w-full border rounded p-2 mt-2 text-black"
              rows={10}
              value={coverLetter}
              readOnly
            />
            <div className=" mt-4">
              <label htmlFor="customization" className="block font-medium">Customize Your Cover Letter</label>
              <textarea
                id="customization"
                className="w-full border rounded p-2 mt-2 text-black"
                rows={5}
                placeholder="Enter additional details or modifications..."
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
              />
              <div className="flex items-center gap-4 mt-4">
              <button onClick={handleCustomize} 
                      className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                      disabled={isCustomizing || !customization}  >
              {isCustomizing ? 'Customizing...' : 'Customize Cover Letter'}
              </button>

              <button onClick={clearAll}
                      className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
              Clear
              </button>

              <button onClick={downloadDoc} 
                      className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded ml-auto'>
                      Download Word Doc 
              </button>
            </div>
            </div>
            </div>
      
          )}

    </div>
    </div>
  );
}