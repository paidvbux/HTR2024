from flask import Flask, url_for, render_template, request, redirect, jsonify, json
from sqlalchemy import case, select, text
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

app.config['SECRET_KEY'] = 'TEST_KEY'

class User(db.Model):
    __tablename__ = 'Users'

    email = db.Column(db.String, primary_key=True, nullable=False)
    name = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    account_type = db.Column(db.String, nullable=False, default='p') #can also be 'd'
    phone_number = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return self.name
    
class Schedule(db.Model):
    __tablename__ = 'Schedule'

    email = db.Column(db.String, db.ForeignKey('Users.email'), primary_key=True, nullable=False)
    schedule = db.Column(db.String, nullable=False)
    appointments = db.Column(db.String, nullable=False)

    def __repr__(self):
        return f'{self.email}\'s schedule'

# RUN THIS ONLY WHEN DATABASE DOES NOT EXIST!
with app.app_context():
    db.create_all()
