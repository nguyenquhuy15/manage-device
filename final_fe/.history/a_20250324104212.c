#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>

#define ARRAY_SIZE 1000000
#define NUM_THREADS 4
#define MAX_VALUE 256

int array[ARRAY_SIZE];
int histogram[MAX_VALUE] = {0};
pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;

void* calculate_histogram(void* arg) {
    long thread_id = (long)arg;
    int local_histogram[MAX_VALUE] = {0};

    long start = (ARRAY_SIZE / NUM_THREADS) * thread_id;
    long end = start + (ARRAY_SIZE / NUM_THREADS);

    for (long i = start; i < end; i++) {
        local_histogram[array[i]]++;
    }

    pthread_mutex_lock(&mutex);
    for (int i = 0; i < MAX_VALUE; i++) {
        histogram[i] += local_histogram[i];
    }
    pthread_mutex_unlock(&mutex);

    return NULL;
}

int main() {
    pthread_t threads[NUM_THREADS];

    // Khởi tạo mảng ngẫu nhiên
    for (int i = 0; i < ARRAY_SIZE; i++) {
        array[i] = rand() % MAX_VALUE;
    }

    for (long i = 0; i < NUM_THREADS; i++) {
        pthread_create(&threads[i], NULL, calculate_histogram, (void*)i);
    }

    for (int i = 0; i < NUM_THREADS; i++) {
        pthread_join(threads[i], NULL);
    }

    printf("Histogram:\n");
    for (int i = 0; i < MAX_VALUE; i++) {
        printf("%d: %d\n", i, histogram[i]);
    }

    return 0;
}
