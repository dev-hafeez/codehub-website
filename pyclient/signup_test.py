import requests

response = requests.post(
    'http://localhost:8000/api/signup/',
    json={
        'first_name': 'Jane',
        'last_name': 'Doe',
        'email': 'janedoe@gmail.com',
        'password': 'test-pass',
        'role': 'student',
        'roll_no': 'FAXX_BXX_XXX',
        'club': 'codehub'
    }
)

print(response.text)
