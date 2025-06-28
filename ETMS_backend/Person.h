#ifndef PERSON_H
#define PERSON_H

#include<iostream>
#include<string>
#include<sstream>
using namespace std;

class Person
{
	protected:
	string name;
	int age;
	string id;

	public:
	Person(string n,int a,string i);
	string getName()const;
	int getAge()const;
	string getID()const;
	virtual string displayInfo()const;
};

class Patient:public Person
{
	private:
		string medicalCondition;
		string location;
		string contact;
	public:
		Patient(string n,int a,string i,string m,string l,string c);
		string getMedicalCondition()const;
		string getLocation()const;
		string getContact()const;
		string displayInfo()const override;
};

class Driver:public Person
{
	private:
		string driverType;
		string vehicleID;
	public:
		Driver(string n,int a,string i,string d,string v);
		string getDriverType()const;
		string getVehicleID()const;
		string displayInfo()const override;
};
#endif
