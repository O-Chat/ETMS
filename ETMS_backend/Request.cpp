#include"Request.h"
#include<iostream>
#include<string>
#include<sstream>
using namespace std;
string Request::requestTypeToString(RequestType t) {
    switch (t) {
        case RequestType::MEDICAL: return "MEDICAL";
        case RequestType::CRIME:   return "CRIME";
        case RequestType::FIRE:    return "FIRE";
        default:                   return "UNKNOWN";
    }
}
Request::Request(string r,Person* p,string l,int u,time_t t,RequestType ty):requestID(r),reporter(p),location(l),urgencyLevel(u),requestTime(t),isDispatched(false),type(ty){}
string Request::getRequestID()const{return requestID;}
Person* Request::getReporter()const{return reporter;}
string Request::getLocation()const{return location;}
int Request::getUrgencyLevel()const{return urgencyLevel;}
time_t Request::getRequestTime()const{return requestTime;}
bool Request::getIsDispatched()const{return isDispatched;}
RequestType Request::getType()const{return type;}
void Request::markDispatched(){isDispatched=true;}
string Request::displayInfo()const
{
	stringstream ss;
	ss<<"Request ID:"<<requestID<<"\n";
	ss<<reporter->displayInfo();
	ss<<"Location:"<<location<<"\n";
	ss<<"Urgency Level:"<<urgencyLevel<<"\n";
	ss<<"Request Time:"<<ctime(&requestTime);
	ss<<"Vehicle Dispatched:"<<(isDispatched ? "Yes" : "No")<<"\n";
	ss<<"Request Type:"<<requestTypeToString(type)<<"\n";
	return ss.str();
}
