# codehub-website

| Folder      | Purpose                                                              |
| ----------- | -------------------------------------------------------------------- |
| `/frontend` | React project goes here (static pages, UI components, etc.)          |
| `/backend`  | Django project files go here (models, views, serializers, etc.)      |
| `/design`   | Figma exports, wireframes, mockups (PNG, PDF, or embedded links)     |
| `/docs`     | Project documentation (meeting notes, setup guides, database schema) |

## How to run Django's server locally:
1. Create a virtual environment in the main directory:
```bash
$ python -m venv .venv
$ source .venv/bin/activate # On Windows use: venv\Scripts\activate
```
2. Install packages:
```bash
$ pip install -r backend/requirements.txt
```
3. Test if the database server is running:
```bash
$ python backend/manage.py dbshell
```
This should directly open the database and allow you to interact with it.
> [!WARNING]
> A superuser has all permissions by default, so caution is advised. Since the database is on a remote server,
> any mishap could have permanent effects.
4. Create a superuser (only for leads):
```bash
$ python backend/manage.py createsuperuser
```
It will prompt you for the required information.
5. Run the server:
```bash
$ python backend/manage.py runserver
```
Now the server should be available at `http://localhost:8000/`. If you are a superuser, you can access the admin panel with
`http://localhost:8000/admin`. The API is available at `http://localhost:8000/api/`.
### API Reference:
The API reference can be accessed at `api/schema` endpoint when the server is running. Accessing the endpoint will allow you to download
a `yml` file. Accessing `api/schema/swagger-ui` will direct you to the API docs page. 
