from peewee import *
from info import *

db = MySQLDatabase(db_name, user=db_user, passwd=db_pass, host=db_host)


class BaseModel(Model):
    class Meta:
        database = db


class School(BaseModel):
    name = CharField()
    shortname = CharField()
    location = CharField()


class Term(BaseModel):
    name = CharField()    # Fall 2014
    key = CharField()     # 2014f, for example
    season = CharField()  # Fall
    year = IntegerField() # 2014

    school = ForeignKeyField(School, related_name='terms')


class College(BaseModel):
    name = CharField() # College of Engineering


class Department(BaseModel):
    name = CharField() # Computer Science


class Subject(BaseModel):
    name = CharField() # Mathematics
    code = CharField() # MATH
    desc = TextField() # whatever


class Campus(BaseModel):
    name = CharField()     # South Campus
    location = TextField() # Coordinates?


class Course(BaseModel):
    name = CharField()    # Princ Of Financial Accounting
    code = CharField()    # ACCT-201
    credits = TextField() # {min: num, max: num, exactly: num}
    desc = TextField()    # blah blah

    department = ForeignKeyField(Department, related_name='courses')
    college = ForeignKeyField(College, related_name='courses')
    subject = ForeignKeyField(Subject, related_name='courses')


class Teacher(BaseModel):
    name = CharField()    # SWANBOM M
    website = CharField() # idk


class Building(BaseModel):
    name = CharField() # Lambright Sports Center
    desc = TextField() # Sport Center with blah blah

    campus = ForeignKeyField(Campus, related_name='buildings')


class Room(BaseModel):
    name = CharField() # 202A

    building = ForeignKeyField(Building, related_name='rooms')


class Class(BaseModel):
    section = CharField()            # 001
    callnum = CharField()            # 12345
    activity = CharField()           # Lecture (or Lab)
    seats_max = IntegerField()       # 40
    seats_available = IntegerField() # 11
    times = TextField()              # {"S": {start: "<time>", end: "<time>"}, "M": {start: "<time>", end: "<time>"}}
    date_from = DateTimeField()      # When the class is offered from.
    date_to = DateTimeField()        # When the class stops being offered.

    course = ForeignKeyField(Course, related_name='classes')
    term = ForeignKeyField(Term, related_name='classes')


def create_tables():
    db.create_tables([School, Term, College, Department, Subject, Campus, Course, Teacher, Building, Room, Class])


def drop_tables():
    db.drop_tables([School, Term, College, Department, Subject, Campus, Course, Teacher, Building, Room, Class])


if __name__ == '__main__':
    import sys

    if sys.argv[1] == 'create':
        create_tables()
        print "Created tables."
    elif sys.argv[1] == 'drop':
        drop_tables()
        print "Dropped tables."
    elif sys.argv[1] == 'reset':
        drop_tables()
        create_tables()
        print "Dropped and then created tables."