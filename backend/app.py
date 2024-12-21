import os 
from dotenv import load_dotenv, find_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS   #secure connection of the application in other domains
from openai import OpenAI

_ = load_dotenv(find_dotenv()) 

app = Flask(__name__)
CORS(app)

client = OpenAI(api_key = os.environ.get('OPENAI_API_KEY'))
@app.route('/generate-cover-letter', methods=['POST'])

def generate_cover_letter():
    data = request.json 
    job_link = data.get('jobLink')
    
    if not job_link:
        return jsonify({'error': 'Job Link is required'}), 400 
    
    prompt = f"""
    Write a professional cover letter for a job posting at the following link:
    {job_link}.
    Ensure the letter is concise and highlights relevant skills and experiences."""

    try:
        response = client.chat.completions.create(
            model = "gpt-4o-mini",
            messages = [{"role" : "user", "content":prompt}],
            max_tokens = 500,
            temperature=0.2
        )

        cover_letter = response.choices[0].message.content
        return jsonify({'coverLetter': cover_letter})
    
    except Exception as e:
        return jsonify({'error' : str(e)}),500
    

@app.route("/customize-cover-letter", methods = ['POST'])

def customize_cover_letter():
    data = request.json
    cover_letter = data.get('coverLetter')
    customization = data.get('customization')

    if not cover_letter or not customization:
        return jsonify({'error': 'Cover letter and customization details are required'}), 400
    
    prompt = f"""
    Customize the following cover letter based on the additional details:
    {customization}

    Cover Letter:
    {cover_letter}
    """
    try:
        response = client.chat.completions.create(
            model = "gpt-4o",
            messages = [{"role" : "user", "content":prompt}],
            max_tokens = 500,
            temperature = 0.2,
        )
        customized_letter = response.choices[0].message.content
        return jsonify({'customizedLetter' : customized_letter})
    
    except Exception as e:
        return jsonify({'error' : str(e)}),500

if __name__ == '__main__':
    app.run(debug=True)