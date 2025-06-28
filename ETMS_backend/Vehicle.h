#ifndef VEHICLE_H
#define VEHICLE_H

#include<iostream>
#include<string>
#include<sstream>
#include"Person.h"
using namespace std;
//class Driver;
class Vehicle
{
	protected:
		string vehicleNumber;
		string vehicleType;
		Driver* driver;
		string currentLocation;
		bool isAvailable;
	public:
		Vehicle(string n,string t,Driver *d,string c,bool av);
		string getVehicleNumber()const;
		string getVehicleType()const;
		Driver* getDriver()const;
		string getCurrentLocation()const;
		bool getAvailability()const;
		void setCurrentLocation(const string &l);
		void setCurrentAvailability(bool s);
		virtual string displayInfo()const;
		virtual ~Vehicle();
};

class Ambulance:public Vehicle
{
	public:
		Ambulance(string n,Driver* d,string c,bool av);
		string displayInfo()const override;
};
class PoliceCar:public Vehicle
{
	public:
		PoliceCar(string n,Driver* d,string c,bool av);
		string displayInfo()const override;
};
class FireTruck:public Vehicle
{
	public:
		FireTruck(string n,Driver* d,string c,bool av);
		string displayInfo()const override;
};
#endif
