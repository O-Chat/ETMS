//#include"Person.h"
#include"Vehicle.h"
#include<iostream>
#include<string>
#include<sstream>
using namespace std;

Vehicle::Vehicle(string n,string t,Driver *d,string c,bool av):vehicleNumber(n),vehicleType(t),driver(d),currentLocation(c),isAvailable(av){}
string Vehicle::getVehicleNumber()const{return vehicleNumber;}
string Vehicle::getVehicleType()const{return vehicleType;}
Driver* Vehicle::getDriver()const{return driver;}
string Vehicle::getCurrentLocation()const{return currentLocation;}
bool Vehicle::getAvailability()const{return isAvailable;}
void Vehicle::setCurrentLocation(const string &l){currentLocation=l;}
void Vehicle::setCurrentAvailability(bool s){isAvailable=s;}
string Vehicle::displayInfo()const
{
	stringstream ss;
	ss<<"Vehicle Number:"<<vehicleNumber<<"\n";
	ss<<"Vehicle Type:"<<vehicleType<<"\n";
	ss<<driver->displayInfo();
	ss<<"Current Location:"<<currentLocation<<"\n";
	ss<<"Availability:"<<isAvailable<<"\n";
	return ss.str();
}
Vehicle::~Vehicle(){}

Ambulance::Ambulance(string n,Driver* d,string c,bool av):Vehicle(n,"Ambulance",d,c,av){}
string Ambulance::displayInfo()const
{
	stringstream ss;
	ss<<"[Ambulance]\n";
	ss<<Vehicle::displayInfo();
	return ss.str();
}

PoliceCar::PoliceCar(string n,Driver* d,string c,bool av):Vehicle(n,"PoliceCar",d,c,av){}
string PoliceCar::displayInfo()const
{
	stringstream ss;
	ss<<"[Police Car]\n";
	ss<<Vehicle::displayInfo();
	return ss.str();
}

FireTruck::FireTruck(string n,Driver* d,string c,bool av):Vehicle(n,"FireTruck",d,c,av){}
string FireTruck::displayInfo()const
{
	stringstream ss;
	ss<<"[Fire Truck]\n";
	ss<<Vehicle::displayInfo();
	return ss.str();
}

