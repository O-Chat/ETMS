#include "Person.h"
Person::Person(string n,int a,string i):name(n),age(a),id(i){}
string Person::getName()const{return name;}
int Person::getAge()const{return age;}
string Person::getID()const{return id;}
string Person::displayInfo()const
{
       	stringstream ss;
        ss << "Name: " << name << "\n";
        ss << "Age: " << age << "\n";
	ss << "ID: " << id << "\n";
	return ss.str();
}


	
Patient::Patient(string n,int a,string i,string m,string l,string c):Person(n,a,i),medicalCondition(m),location(l),contact(c){}
string Patient::getMedicalCondition()const{return medicalCondition;}
string Patient::getLocation()const{return location;}
string Patient::getContact()const{return contact;}
string Patient::displayInfo()const
{
	stringstream ss;
	ss<<Person::displayInfo();
	ss<<"Medical Condition:"<<medicalCondition<<"\n";
	ss<<"Location:"<<location<<"\n";
	ss<<"Contact:"<<contact<<"\n";
	return ss.str();
}


Driver::Driver(string n,int a,string i,string d,string v):Person(n,a,i),driverType(d),vehicleID(v){}
string Driver::getDriverType()const{return driverType;}
string Driver::getVehicleID()const{return vehicleID;}
string Driver::displayInfo()const
{
	stringstream ss;
	ss<<Person::displayInfo();
	ss<<"Driver Type:"<<driverType<<"\n";
	ss<<"Vehicle ID:"<<vehicleID<<"\n";
	return ss.str();
}

