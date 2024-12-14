from database import *
from sqlalchemy import func
from flask_migrate import Migrate
import datetime
import secrets
import ast


login_expiration_time = timedelta(days=1, hours=0, minutes=0, seconds=0)

migrate = Migrate(app, db)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('sign-up.html')

@app.route('/contact')
def contact():
    doctors = [doctor for doctor in User.query.filter_by(account_type='d').all()]
    return render_template('contact.html', doctors=doctors)

@app.route('/schedule')
def schedule():
    return render_template('schedule.html')

@app.route('/user-login', methods=['POST'])
def user_login():
    data = json.loads(request.data)
    user = User.query.get(data['email'])

    if user.password == data['password']:
        response = jsonify({ 'message' : 'success', 
                            'email' : data['email'], 
                            'name' : user.name })
        response.set_cookie('user-info', 
                            f'{user.name}/{data["email"]}/{user.account_type}', 
                            max_age=60*60*24)
        return response
    return jsonify({'message': 'invalid'})

@app.route('/create-account', methods=['POST'])
def create_account():
    data = json.loads(request.data)

    if User.query.get(data['email']) == None:
        new_account = User(email=data['email'],
                        name=data['name'],
                        phone_number=data['phone'],
                        password=data['password'],
                        account_type=data['account_type'])
        if data['account_type'] == 'd':
            schedule = {(i, j):True for i in range(7) for j in range(8, 23)}
            appointments = {(i, j):False for i in range(7) for j in range(8, 23)}
            new_schedule = Schedule(email=data['email'],
                                    schedule=f'{schedule}',
                                    appointments=f'{appointments}')
            db.session.add(new_schedule)
        db.session.add(new_account)
        db.session.commit()

        return jsonify({'message':'success'}) 
    else:
        return {'message':'email taken'}

@app.route('/load-calendar', methods=['POST'])
def load_calendar():
    data = json.loads(request.data)
    schedule = Schedule.query.get(data['email'])
    s = ast.literal_eval(schedule.schedule)
    a = ast.literal_eval(schedule.appointments)
    return jsonify({'message':'success', 'html':f'{render_template('calendar.html', schedule=s, appointments=a)}'})

if __name__ == '__main__':
    app.run(debug=True)