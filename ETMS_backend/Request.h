#ifndef REQUEST_H
#define REQUEST_H

#include <iostream>
#include <string>
#include <sstream>
#include "Person.h"
#include "Vehicle.h"
using namespace std;

enum class RequestType
{
	MEDICAL,
	CRIME,
	FIRE
};

class Request
{
protected:
	string requestID;
	Person *reporter;
	string location;
	int urgencyLevel;
	time_t requestTime;
	bool isDispatched;
	RequestType type;

public:
	Request(string r, Person *p, string l, int u, time_t t, RequestType ty);
	string getRequestID() const;
	Person *getReporter() const;
	string getLocation() const;
	int getUrgencyLevel() const;
	time_t getRequestTime() const;
	bool getIsDispatched() const;
	RequestType getType() const;
	void markDispatched();
	string displayInfo() const;
	static string requestTypeToString(RequestType t);
};
#endif
