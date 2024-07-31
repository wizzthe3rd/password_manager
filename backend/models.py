from config import db

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    site_name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "siteName": self.site_name,
            "email": self.email,
            "password": self.password
        }