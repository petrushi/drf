import requests

#  works if set 'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.AcceptHeaderVersioning'
response = requests.get('http://127.0.0.1:8000/api/users/')
print(response.json())

response = requests.get('http://127.0.0.1:8000/api/users/', headers={
                        'Accept': 'application/json; version=2'})
print(response.json())
