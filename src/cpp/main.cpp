#include "cycleirrigation.h"
#include "irrigation.h"
#include "device.h"
#include "mySocket.h"
#include "operatorOverloads.h"

#include <thread>
#include <string>
#include <iostream>

#define PORT 9005



static std::vector<Device *> deviceList;

void runDevices() {
    while(Device::areTimersOn() == true) {
        for (auto device : deviceList) {
            device->run();
        }
    }
}

int main(int arc, char *argv[]) {

    std::thread thread_object(runDevices);

/* TODO: testing
    int test[3] = {1,2,3};
    std::string testId = "3";
    std::string testString = "test";
    int testPin = 3;
    CycleIrrigation x = CycleIrrigation(testString,testPin,testString,test,test,test,test);

    std::cout << "something" << std::endl;
    std::cout << x << std::endl;
*/

    MySocket sock = MySocket();


    return 0;
}
