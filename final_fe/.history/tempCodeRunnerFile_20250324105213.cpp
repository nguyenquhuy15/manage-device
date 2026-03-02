

#include <iostream>
#include <vector>
#include <string>
#include <thread>
#include <mutex>
#include <condition_variable>
#include <atomic>
#include <chrono>
#include <random>


std::vector<std::string> data;
std::string target;
std::atomic<int> found_index = -1;
std::atomic<bool> stop = false;
std::atomic<int> stopped_threads = 0;
std::mutex mtx;
std::condition_variable cv;

void search(int id, int start, int end) {
    for (int i = start; i < end; i++) {
        if (stop) {
            break;
        }
        if (data[i] == target) {
            found_index = i;
            stop = true;
            break;
        }
    }
    std::unique_lock<std::mutex> lock(mtx);
    stopped_threads++;
    cv.notify_all();
}


int main() {
    int num_threads = 4;
    int num_elements = 100;
    int chunk_size = num_elements / num_threads;
    std::vector<std::thread> threads;

    // generate random data
    std::random_device rd;
    std::mt19937 gen(rd());
    std::uniform_int_distribution<int> dis(0, 1000);
    for (int i = 0; i < num_elements; i++) {
        data.push_back(std::to_string(dis(gen)));
    }

    // set target
    target = data[dis(gen)];

    // create threads
    for (int i = 0; i < num_threads; i++) {
        int start = i * chunk_size;
        int end = (i == num_threads - 1) ? num_elements : (i + 1) * chunk_size;
        threads.push_back(std::thread(search, i, start, end));
    }

    // wait for threads to finish
    for (int i = 0; i < num_threads; i++) {
        threads[i].join();
    }

    // print results
    if (found_index != -1) {
        std::cout << "Found target at index: " << found_index << std::endl;
    } else {
        std::cout << "Target not found" << std::endl;
    }
    std::cout << "Number of threads stopped early: " << stopped_threads << std::endl;

    return 0;
}