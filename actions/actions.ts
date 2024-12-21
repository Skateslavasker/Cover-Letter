export async function generateCoverLetter(jobLink: string){
    try{
        const response = await fetch('http://127.0.0.1:5000/generate-cover-letter',{
            method: 'POST',
            headers: { 'Content-Type' : 'application/json'},
            body: JSON.stringify({ jobLink }),
        });

        if(!response.ok){
            const errorData = await response.json();
            console.error('Backend error:', errorData);
            throw new Error('Failed to generate cover letter');
        }
        
        const data = await response.json();
        return data.coverLetter;
    } catch (error){
        console.error('Error in generateCoverLetter:', error);
        throw error;
    }
}

export async function customizeCoverLetter(coverLetter: string, customization: string){
    try{
        const response = await fetch('http://127.0.0.1:5000/customize-cover-letter', {
            method: 'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify({ coverLetter, customization }),
        });

        if(!response.ok){
            throw new Error('Failed to customize cover letter');
        }

        const data = await response.json();
        return data.customizedLetter;
    } catch (error) {
        console.error('Error in customizeCoverLetter:', error);
        throw error;
    }
}