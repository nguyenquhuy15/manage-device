//lab1
//1


// lab2:
// 1:Tạo tệp Hello.txt với nội dung: "Xin chào! Tên bạn là gì?". Sau đó, viết chương trình để:
// a) Đọc nội dung của tệp Hello.txt và in ra màn hình.
// b) Đọc nội dung của tệp Hello.txt bắt đầu từ byte thứ 7 tính từ đầu tệp và in ra màn hình. (Gợi ý: sử dụng lệnh gọi hệ thống Iseek)
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
int main() {
    int fd;
    char buffer[100];

    // Mở file Hello.txt
    fd = open("Hello.txt", O_RDONLY);
    // a) Đọc và in toàn bộ nội dung file

    ssize_t bytesRead = read(fd, buffer, sizeof(buffer) - 1);
    printf("%s\n", buffer);

    // b) Di chuyển con trỏ file đến byte thứ 7 và đọc từ đó

    lseek(fd, 6, SEEK_SET); // Di chuyển đến byte thứ 7 (đếm từ 0)
    bytesRead = read(fd, buffer, sizeof(buffer) - 1);
    printf("%s\n", buffer);
    // Đóng file
    close(fd);
    return 0;
}
// Ví dụ 3. Viết chương trình nhập tên tệp và in ra kích thước tệp, thông tin chế độ truy cập của tệp. (Gợi ý: bạn có thể sử dụng stat hoặc fstat)
#include <stdio.h>
#include <sys/stat.h>

int main() {
    char file_name[256];
    struct stat file_stat;

    // Nhập tên tệp
    printf("Nhập tên tệp: ");
    scanf("%s", file_name);

    // Lấy thông tin tệp
    stat(file_name, &file_stat);

    // In kích thước tệp
    printf("Kích thước tệp: %ld bytes\n", file_stat.st_size);

    // In chế độ truy cập tệp
    printf("Chế độ truy cập tệp: %o\n", file_stat.st_mode & 0777); // Dạng bát phân

    return 0;
}
// Ví dụ 4. Viết một chương trình có tên là linuxecho.c emulator:

// echo [chuỗi] > example.txt.

// (Chuỗi in được đặt trong argv[1], tên tệp được đặt trong argv[2])
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[]) {
    // Kiểm tra số lượng tham số
    if (argc != 3) {
        printf("Sử dụng: %s [string] [filename]\n", argv[0]);
        return 1;
    }

    // Lấy tham số từ dòng lệnh
    char *string = argv[1];
    char *filename = argv[2];

    // Mở tệp để ghi
    FILE *file = fopen(filename, "w");

    // Ghi chuỗi vào tệp
    fprintf(file, "%s\n", string);

    // Đóng tệp
    fclose(file);

    printf("Đã ghi \"%s\" vào tệp %s\n", string, filename);
    return 0;
}
// $ ./linuxecho "Hello, World!" example.txt
// Đã ghi "Hello, World!" vào tệp example.txt

// Ví dụ 5. Viết một chương trình có tên linuxgrep.c mô phỏng "grep" sao cho từ đã lọc được đặt trong argv[1] và đường dẫn đến tệp được đặt trong argv[2].
#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[]) {
    // Kiểm tra tham số đầu vào
    if (argc != 3) {
        printf("Sử dụng: %s [từ cần tìm] [đường dẫn tệp]\n", argv[0]);
        return 1;
    }

    // Lấy từ cần tìm và đường dẫn tệp
    char *word = argv[1];
    char *filename = argv[2];

    // Mở tệp
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        perror("Không thể mở tệp");
        return 1;
    }

    // Đọc từng dòng trong tệp và tìm từ
    char line[1024];
    while (fgets(line, sizeof(line), file)) {
        if (strstr(line, word)) {
            printf("%s", line); // In dòng chứa từ cần tìm
        }
    }

    // Đóng tệp
    fclose(file);

    return 0;
}
// ./linuxgrep "từ cần tìm" tên_tệp.txt



// Ví dụ 7. Viết chương trình linuxls.c mô phỏng lệnh Is shell. Chương trình nhận 1 tham số đầu vào: đường dẫn thư mục trong argv[1].
#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>

int main(int argc, char *argv[]) {
    // Kiểm tra tham số đầu vào
    if (argc != 2) {
        printf("Sử dụng: %s [đường dẫn thư mục]\n", argv[0]);
        return 1;
    }

    char *folder_path = argv[1];

    // Mở thư mục
    DIR *dir = opendir(folder_path);
    if (dir == NULL) {
        perror("Không thể mở thư mục");
        return 1;
    }

    struct dirent *entry;
    printf("Nội dung thư mục '%s':\n", folder_path);

    // Duyệt qua các mục trong thư mục
    while ((entry = readdir(dir)) != NULL) {
        printf("%s\n", entry->d_name); // In tên của từng mục
    }

    // Đóng thư mục
    closedir(dir);

    return 0;
}
// ./linuxls /home/user/example




// Ex8. Viết chương trình linuxcd.c mô phỏng lệnh cd shell. Chương trình nhận 1 tham số đầu vào: đường dẫn thư mục trong argv[1].
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    // Kiểm tra nếu không có tham số đầu vào
    if (argc != 2) {
        fprintf(stderr, "Sử dụng: %s [đường dẫn thư mục]\n", argv[0]);
        return 1;
    }

    // Lấy đường dẫn thư mục từ argv[1]
    char *directory_path = argv[1];

    // Thử thay đổi thư mục bằng lệnh chdir
    if (chdir(directory_path) != 0) {
        perror("Không thể thay đổi thư mục");
        return 1;
    }

    // In ra thông báo thành công
    printf("Đã chuyển đến thư mục: %s\n", directory_path);

    return 0;
}
// ./linuxcd /home/minh/ELT3296_1/ELT3296_1_N1

// lab3
// 1.	Write a C program to create a child process such that: 
// + The parent process does not have to wait for the child process 
// + The parent process waits for the child process to finish before continuing the program.
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t pid;

    // Tạo tiến trình con
    pid = fork();

    if (pid < 0) {
        // Lỗi khi tạo tiến trình
        perror("fork failed");
        exit(1);
    } else if (pid == 0) {
        // Đây là tiến trình con
        printf("Child process: PID = %d, Parent PID = %d\n", getpid(), getppid());
        // Tiến trình con thực hiện một công việc nào đó
        sleep(2); // Giả lập tiến trình con chạy trong 2 giây
        printf("Child process finished.\n");
        exit(0); // Kết thúc tiến trình con
    } else {
        // Đây là tiến trình cha
        printf("Parent process: PID = %d, Child PID = %d\n", getpid(), pid);

        // Yêu cầu 1: Tiến trình cha không cần chờ tiến trình con
        printf("Parent process continues without waiting for child.\n");

        // Yêu cầu 2: Tiến trình cha chờ tiến trình con hoàn thành
        wait(NULL); // Chờ tiến trình con kết thúc
        printf("Parent process resumes after child process finishes.\n");
    }

    return 0;
}
// gcc -o process_example process_example.c

// 2. Giving below C program is incomplete. Complete the program to create a
// child process:
// • Inside child process:
// - Print value of two variables idata and istack. Change value of two
// variables idata and istack. Then print the new value of idata and istack
// on screen.
// - Change file offset to 7th byte from the beginning of file.
// • Inside parent process:
// - Wait for child process to finish.
// - Print value of idata and istack on screen.
// - Read the content of file Hello.txt.
// -
// How are the values of the variables idata and istack printed in the parent
// and child processes? Explain why.
// Inside parent process, how is the content of the Hello.txt file printed? From
// there, what conclusions can be drawn about the file descriptor between the
// parent process and the child process?
// #include <stdio.h>
// #include <fcntl.h>
// #include <unistd.h>
// static int idata = 1000; //Alocated in data segment
// int main() {
//  int istack = 150; //Alocated in stack segment
//  int fd = open("output.txt", O_WRONLY);
//  pid_t childPid;
//  ………
// }
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

static int idata = 1000; // Biến toàn cục, được cấp phát trong data segment

int main() {
    int istack = 150; // Biến cục bộ, được cấp phát trong stack segment
    int fd = open("Hello.txt", O_RDWR); // Mở file Hello.txt ở chế độ đọc-ghi
    if (fd < 0) {
        perror("Failed to open file");
        return 1;
    }

    pid_t childPid = fork(); // Tạo tiến trình con

    if (childPid < 0) {
        perror("Fork failed");
        return 1;
    } else if (childPid == 0) {
        // Đây là tiến trình con
        printf("Child process:\n");
        printf("  Initial idata = %d, istack = %d\n", idata, istack);

        // Thay đổi giá trị của idata và istack
        idata += 100;
        istack += 50;
        printf("  Modified idata = %d, istack = %d\n", idata, istack);

        // Di chuyển con trỏ file đến byte thứ 7
        lseek(fd, 7, SEEK_SET);
        printf("  Child process moved file offset to 7th byte.\n");

        close(fd); // Đóng file trong tiến trình con
        _exit(0); // Kết thúc tiến trình con
    } else {
        // Đây là tiến trình cha
        wait(NULL); // Chờ tiến trình con hoàn thành
        printf("Parent process:\n");
        printf("  idata = %d, istack = %d\n", idata, istack);

        // Đọc nội dung file Hello.txt
        char buffer[100];
        lseek(fd, 0, SEEK_SET); // Đặt lại con trỏ file về đầu
        ssize_t bytesRead = read(fd, buffer, sizeof(buffer) - 1);
        if (bytesRead > 0) {
            buffer[bytesRead] = '\0'; // Đảm bảo chuỗi kết thúc bằng null
            printf("  Content of Hello.txt:\n%s\n", buffer);
        } else {
            printf("  Failed to read file or file is empty.\n");
        }

        close(fd); // Đóng file trong tiến trình cha
    }

    return 0;
}
// 3. Write a program to create a child process, which executes ls command to list contents of user’s home directory.
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    pid_t pid;

    // Tạo tiến trình con
    pid = fork();

    if (pid < 0) {
        // Lỗi khi tạo tiến trình con
        perror("Fork thất bại");
        exit(1);
    } else if (pid == 0) {
        // Bên trong tiến trình con
        printf("Tiến trình con: Đang thực thi lệnh 'ls' để liệt kê nội dung thư mục chính.\n");

        // Lấy thư mục chính của người dùng từ biến môi trường HOME
        char *home_dir = getenv("HOME");
        if (home_dir == NULL) {
            fprintf(stderr, "Không thể lấy biến môi trường HOME.\n");
            exit(1);
        }

        // Thực thi lệnh 'ls' với thư mục chính là tham số
        execlp("ls", "ls", home_dir, NULL);

        // Nếu execlp() thất bại
        perror("execlp thất bại");
        exit(1);
    } else {
        // Bên trong tiến trình cha
        printf("Tiến trình cha: Đang chờ tiến trình con hoàn thành.\n");
        wait(NULL); // Chờ tiến trình con kết thúc
        printf("Tiến trình cha: Tiến trình con đã hoàn thành.\n");
    }

    return 0;
}
// 4. Complete below C program that simulates a shell (parent process) that
// operates simple shell commands.
// #include <sys/types.h>
// #include <sys/wait.h>
// #include <unistd.h>
// #include <string.h>
// #define CMDSIZ 32 ;
// extern char **environ int main(int argc, char *argv[] )
// {
//  int logout=O, cmdsiz;
//  char cmdbuf[CMDSIZ] ;
//  while(!logout)
//  {
//  write (1, "myshell> ", 9) ;
//  cmdsiz = read(0, cmdbuf, CMDSIZ) ;
//  cmdbuf[cmdsiz-1] = '\0’ ;
//  if (strcmp("logout", cmdbuf) == 0)
//  ++logout ;
//  else process_command(cmdbuf) ;
// } }
// void process_command(char* cmdbuf)
// {
// }
// Hint: process_command function create a child process to execute program
// like linuxls, linuxcd (programs simulate shell commands) in previous lab.
#include <sys/types.h>
#include <sys/wait.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>
#include <stdlib.h>

#define CMDSIZ 32

extern char **environ;

void process_command(char *cmdbuf);

int main(int argc, char *argv[]) {
    int logout = 0, cmdsiz;
    char cmdbuf[CMDSIZ];

    while (!logout) {
        write(1, "myshell> ", 9);
        cmdsiz = read(0, cmdbuf, CMDSIZ);
        cmdbuf[cmdsiz - 1] = '\0';  // Loại bỏ ký tự xuống dòng '\n'

        if (strcmp("logout", cmdbuf) == 0) {
            ++logout;
        } else {
            process_command(cmdbuf);
        }
    }

    return 0;
}

void process_command(char *cmdbuf) {
    pid_t pid;
    int status;

    // Tách lệnh và các tham số từ chuỗi đầu vào
    char *args[CMDSIZ];
    char *token = strtok(cmdbuf, " ");
    int i = 0;

    while (token != NULL) {
        args[i++] = token;
        token = strtok(NULL, " ");
    }
    args[i] = NULL;  // Kết thúc danh sách tham số

    // Tạo tiến trình con để thực thi lệnh
    pid = fork();

    if (pid < 0) {
        perror("Fork thất bại");
        exit(1);
    } else if (pid == 0) {
        // Tiến trình con
        if (execvp(args[0], args) < 0) {
            perror("Lệnh không hợp lệ");
            exit(1);
        }
    } else {
        // Tiến trình cha chờ tiến trình con hoàn thành
        waitpid(pid, &status, 0);
    }
}
// 5. Write a C program in which parent and child processes exchange
// messages:
// - The child process sends a message “Hello parent” to the parent process. The
// parent process reads and prints messages from the child process to the screen.
// - The parent process sends a message “Hello children” to the child process. The
// child process reads and prints messages from the parent process to the screen.
// Hint: Using two pipes.
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <stdlib.h>

int main() {
    int pipe1[2]; // Pipe 1: Con -> Cha
    int pipe2[2]; // Pipe 2: Cha -> Con
    pid_t pid;
    char buffer[128];

    // Tạo hai pipe
    if (pipe(pipe1) == -1 || pipe(pipe2) == -1) {
        perror("Pipe thất bại");
        exit(1);
    }

    // Tạo tiến trình con
    pid = fork();

    if (pid < 0) {
        perror("Fork thất bại");
        exit(1);
    }

    if (pid == 0) { // Tiến trình con
        close(pipe1[0]); // Đóng đầu đọc của pipe 1 (Con -> Cha)
        close(pipe2[1]); // Đóng đầu ghi của pipe 2 (Cha -> Con)

        // Gửi thông điệp đến cha
        char *msg_to_parent = "Hello parent";
        write(pipe1[1], msg_to_parent, strlen(msg_to_parent) + 1);

        // Nhận thông điệp từ cha
        read(pipe2[0], buffer, sizeof(buffer));
        printf("Child received: %s\n", buffer);

        // Đóng các đầu pipe còn lại
        close(pipe1[1]);
        close(pipe2[0]);
    } else { // Tiến trình cha
        close(pipe1[1]); // Đóng đầu ghi của pipe 1 (Con -> Cha)
        close(pipe2[0]); // Đóng đầu đọc của pipe 2 (Cha -> Con)

        // Nhận thông điệp từ con
        read(pipe1[0], buffer, sizeof(buffer));
        printf("Parent received: %s\n", buffer);

        // Gửi thông điệp đến con
        char *msg_to_child = "Hello children";
        write(pipe2[1], msg_to_child, strlen(msg_to_child) + 1);

        // Đóng các đầu pipe còn lại
        close(pipe1[0]);
        close(pipe2[1]);
    }

    return 0;
}
// 6. Write a C program that describes the operation of the pipe command: ls |
// wc -l, where:
// + The child process executes the ls command
// + The parent process executes the command wc – l
// Hint: using pipe system call to create a pipe between two processes; dup2
// system call to redirect input and output.
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/types.h>
#include <sys/wait.h>

int main() {
    int pipe_fd[2]; // pipe_fd[0]: đầu đọc, pipe_fd[1]: đầu ghi
    pid_t pid;

    // Tạo pipe
    if (pipe(pipe_fd) == -1) {
        perror("Pipe thất bại");
        exit(1);
    }

    // Tạo tiến trình con
    pid = fork();

    if (pid < 0) {
        perror("Fork thất bại");
        exit(1);
    }

    if (pid == 0) { // Tiến trình con
        // Chuyển hướng đầu ra (stdout) sang đầu ghi của pipe
        dup2(pipe_fd[1], STDOUT_FILENO);

        // Đóng các đầu pipe không cần sử dụng
        close(pipe_fd[0]); // Đóng đầu đọc
        close(pipe_fd[1]); // Đóng đầu ghi

        // Thực thi lệnh "ls"
        execlp("ls", "ls", NULL);

        // Nếu execlp thất bại
        perror("execlp thất bại");
        exit(1);
    } else { // Tiến trình cha
        // Chuyển hướng đầu vào (stdin) sang đầu đọc của pipe
        dup2(pipe_fd[0], STDIN_FILENO);

        // Đóng các đầu pipe không cần sử dụng
        close(pipe_fd[0]); // Đóng đầu đọc
        close(pipe_fd[1]); // Đóng đầu ghi

        // Thực thi lệnh "wc -l"
        execlp("wc", "wc", "-l", NULL);

        // Nếu execlp thất bại
        perror("execlp thất bại");
        exit(1);
    }

    return 0;
}
// 7. Write a C-Unix program that continuously checks every 1 minute and
// prints a list of internal files inside a folder. When CTRL-C is pressed, print
// messege “Program is terminated by user” on screen and terminate the
// program.
// Hint:
// - Use opendir, readdir, closeir, stat functions to browse directories and print files
// inside directories.
// - Write a function to handle when an interrupt signal is received (user presses
// Ctrl + C)
#include <stdio.h>
#include <stdlib.h>
#include <dirent.h>
#include <sys/stat.h>
#include <unistd.h>
#include <signal.h>
#include <string.h>

// Hàm xử lý tín hiệu Ctrl + C
void handle_sigint(int sig) {
    printf("\nProgram is terminated by user\n");
    exit(0);
}

// Hàm liệt kê danh sách tệp trong thư mục
void list_files(const char *path) {
    struct dirent *entry;
    struct stat file_stat;
    DIR *dir = opendir(path);

    if (dir == NULL) {
        perror("Không thể mở thư mục");
        return;
    }

    printf("Danh sách tệp trong thư mục '%s':\n", path);

    // Đọc từng mục trong thư mục
    while ((entry = readdir(dir)) != NULL) {
        // Bỏ qua các mục đặc biệt "." và ".."
        if (strcmp(entry->d_name, ".") == 0 || strcmp(entry->d_name, "..") == 0) {
            continue;
        }

        // Lấy thông tin chi tiết của tệp
        char full_path[1024];
        snprintf(full_path, sizeof(full_path), "%s/%s", path, entry->d_name);

        if (stat(full_path, &file_stat) == 0) {
            printf("- %s (size: %ld bytes)\n", entry->d_name, file_stat.st_size);
        } else {
            perror("Không thể lấy thông tin tệp");
        }
    }

    closedir(dir);
}

int main() {
    const char *folder_path = "."; // Đường dẫn thư mục (mặc định là thư mục hiện tại)

    // Đăng ký hàm xử lý tín hiệu Ctrl + C
    signal(SIGINT, handle_sigint);

    while (1) {
        list_files(folder_path); // Liệt kê danh sách tệp
        printf("\nChờ 1 phút để kiểm tra lại...\n");
        sleep(60); // Ngủ 1 phút
    }

    return 0;
}

// lab4
// 1. Create a thread that prints numbers from 1 to 5, one per line. The main thread
// should wait for this thread to finish before printing "Main thread exiting
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

// Hàm được thực thi bởi thread
void* print_numbers(void* arg) {
    for (int i = 1; i <= 5; i++) {
        printf("%d\n", i);
        sleep(1); // Ngủ 1 giây để minh họa việc thực thi
    }
    return NULL;
}

int main() {
    pthread_t thread_id; // ID của thread

    // Tạo thread thực hiện hàm print_numbers
    if (pthread_create(&thread_id, NULL, print_numbers, NULL) != 0) {
        perror("Không thể tạo thread");
        return 1;
    }

    // Chờ thread hoàn thành
    if (pthread_join(thread_id, NULL) != 0) {
        perror("Không thể chờ thread");
        return 1;
    }

    // In thông báo khi thread hoàn thành
    printf("Main thread exiting.\n");

    return 0;
}
// 2. Write a program where a new thread computes the sum of numbers from 1 to
// 10 and returns the result. The main thread should retrieve this result and print
// it.
#include <stdio.h>
#include <pthread.h>
#include <stdlib.h>

// Hàm được thực thi bởi thread
void* compute_sum(void* arg) {
    int* result = (int*)malloc(sizeof(int)); // Cấp phát bộ nhớ để lưu kết quả
    *result = 0;

    for (int i = 1; i <= 10; i++) {
        *result += i;
    }

    return (void*)result; // Trả về kết quả
}

int main() {
    pthread_t thread_id; // ID của thread
    int* result;         // Con trỏ để nhận kết quả từ thread

    // Tạo thread thực hiện hàm compute_sum
    if (pthread_create(&thread_id, NULL, compute_sum, NULL) != 0) {
        perror("Không thể tạo thread");
        return 1;
    }

    // Chờ thread hoàn thành và nhận kết quả
    if (pthread_join(thread_id, (void**)&result) != 0) {
        perror("Không thể chờ thread");
        return 1;
    }

    // In kết quả
    printf("Tổng các số từ 1 đến 10 là: %d\n", *result);

    // Giải phóng bộ nhớ
    free(result);

    return 0;
}
// 3. Write a program that creates three threads. Each thread should print a unique
// message along with its thread ID. The main thread should print "Main thread
// is running". The program should wait for all threads to finish before exiting.
#include <stdio.h>
#include <pthread.h>
#include <unistd.h>

// Hàm được thực thi bởi mỗi thread
void* thread_function(void* arg) {
    int thread_num = *((int*)arg); // Lấy số thứ tự của thread
    printf("Thread %d is running with ID: %lu\n", thread_num, pthread_self());
    return NULL;
}

int main() {
    pthread_t threads[3]; // Mảng lưu ID của 3 threads
    int thread_args[3];   // Mảng lưu số thứ tự của mỗi thread

    // Tạo 3 threads
    for (int i = 0; i < 3; i++) {
        thread_args[i] = i + 1; // Gán số thứ tự cho thread
        if (pthread_create(&threads[i], NULL, thread_function, &thread_args[i]) != 0) {
            perror("Không thể tạo thread");
            return 1;
        }
    }

    // Main thread in thông báo
    printf("Main thread is running\n");

    // Chờ tất cả các threads hoàn thành
    for (int i = 0; i < 3; i++) {
        if (pthread_join(threads[i], NULL) != 0) {
            perror("Không thể chờ thread");
            return 1;
        }
    }

    printf("All threads have finished. Main thread exiting.\n");
    return 0;
}

// 4. Complete below two programs: Program 1 create a thread modifying a global
// variable. Program 2 create a process modifying the same global variable.
// Afterthat, executing two programs. What are the value of global variables in
// two programs? Explain why.
// Program 1 
// #include <pthread.h>
// #include <stdio.h>
// #include <stdlib.h>
// int sharedVar = 5; // Shared
// among threads
// void *threadFunc(void *arg) {
//  //Write code change value of
// global variable here
// }
// int main() {
//  pthread_t thread;

//  // Write code to create thread
// here
//  //Write code to wait for thread
// to terminate here
//  printf("Main: sharedVar =
// %d\n", sharedVar);
//  return 0;
// }
// program 2
// #include <stdio.h>
// #include <stdlib.h>
// #include <unistd.h>
// int sharedVar = 5; // Separate copy
// for each process
// int main() {
// //Write code to create child process
// here
// if (pid == 0) { // Child process
//  //Write code change value of
// global variable here
// printf("Child Process: sharedVar =
// %d\n", sharedVar);
// exit(0);
// } else {
//  //Write code to wait for child
// process to terminate here
// printf("Parent Process: sharedVar =
// %d\n", sharedVar);
//  }
//  return 0;
// }
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

int sharedVar = 5; // Biến toàn cục được chia sẻ giữa các thread

// Hàm thực thi bởi thread
void* threadFunc(void* arg) {
    printf("Thread: sharedVar before = %d\n", sharedVar);
    sharedVar += 10; // Thay đổi giá trị của biến toàn cục
    printf("Thread: sharedVar after = %d\n", sharedVar);
    return NULL;
}

int main() {
    pthread_t thread;

    // Tạo thread
    if (pthread_create(&thread, NULL, threadFunc, NULL) != 0) {
        perror("Không thể tạo thread");
        return 1;
    }

    // Chờ thread hoàn thành
    if (pthread_join(thread, NULL) != 0) {
        perror("Không thể chờ thread");
        return 1;
    }

    // In giá trị của sharedVar trong main thread
    printf("Main: sharedVar = %d\n", sharedVar);

    return 0;
}

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int sharedVar = 5; // Biến toàn cục, mỗi process có bản sao riêng

int main() {
    pid_t pid = fork(); // Tạo process con

    if (pid < 0) {
        perror("Không thể tạo process");
        return 1;
    }

    if (pid == 0) { // Process con
        printf("Child Process: sharedVar before = %d\n", sharedVar);
        sharedVar += 10; // Thay đổi giá trị của biến toàn cục
        printf("Child Process: sharedVar after = %d\n", sharedVar);
        exit(0);
    } else { // Process cha
        // Chờ process con hoàn thành
        wait(NULL);
        printf("Parent Process: sharedVar = %d\n", sharedVar);
    }

    return 0;
}
// 5. Viết chương trình:

// Xác định một bộ đếm toàn cầu.1

// Tạo hai luồng, một luồng tăng bộ đếm lên 100 lần;

// một luồng giảm bộ đếm 50 lần

// Sử dụng mutex để ngăn chặn tình trạng chạy đua.

// In giá trị bộ đếm cuối cùng.
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>

// Biến toàn cục
int counter = 0;

// Mutex để đồng bộ
pthread_mutex_t mutex;

// Hàm tăng biến đếm
void* increment(void* arg) {
    for (int i = 0; i < 100; i++) {
        pthread_mutex_lock(&mutex); // Khóa mutex
        counter++;
        pthread_mutex_unlock(&mutex); // Mở khóa mutex
    }
    return NULL;
}

// Hàm giảm biến đếm
void* decrement(void* arg) {
    for (int i = 0; i < 50; i++) {
        pthread_mutex_lock(&mutex); // Khóa mutex
        counter--;
        pthread_mutex_unlock(&mutex); // Mở khóa mutex
    }
    return NULL;
}

int main() {
    pthread_t thread1, thread2;

    // Khởi tạo mutex
    if (pthread_mutex_init(&mutex, NULL) != 0) {
        perror("Không thể khởi tạo mutex");
        return 1;
    }

    // Tạo thread 1 (tăng biến đếm)
    if (pthread_create(&thread1, NULL, increment, NULL) != 0) {
        perror("Không thể tạo thread 1");
        return 1;
    }

    // Tạo thread 2 (giảm biến đếm)
    if (pthread_create(&thread2, NULL, decrement, NULL) != 0) {
        perror("Không thể tạo thread 2");
        return 1;
    }

    // Chờ cả hai threads hoàn thành
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);

    // In giá trị cuối cùng của biến đếm
    printf("Final counter value: %d\n", counter);

    // Hủy mutex
    pthread_mutex_destroy(&mutex);

    return 0;
}

// 6. Rào cản là cơ chế đồng bộ hóa khiến tất cả các luồng phải đợi cho đến khi một số luồng cụ thể đạt đến điểm chung.

// Viết chương trình có:

// -Tạo N luồng (ví dụ: 4 luồng).

// -Mỗi luồng phải in ra "Luồng X đã đạt đến rào cản", sau đó đợi ở rào cản.

// - Luồng cuối cùng đến sẽ in ra "Tất cả các luồng đã đạt đến rào cản! Đang giải phóng chúng..." và cho phép tất cả các luồng tiếp tục.

// Mỗi luồng phải in ra "Luồng X đã vượt qua rào cản" sau khi được giải phóng.

// Gợi ý: Sử dụng mutex để bảo vệ bộ đếm và biến điều kiện để báo hiệu cho tất cả các luồng khi luồng cuối cùng đến.
#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define N 4 // Số lượng threads

// Biến toàn cục
int counter = 0; // Bộ đếm số threads đã đến barrier
pthread_mutex_t mutex; // Mutex để bảo vệ bộ đếm
pthread_cond_t cond; // Condition variable để thông báo

// Hàm thực thi của mỗi thread
void* threadFunc(void* arg) {
    int thread_id = *(int*)arg; // Lấy ID của thread
    free(arg); // Giải phóng bộ nhớ cấp phát cho ID

    // Thread đến barrier
    printf("Thread %d reached the barrier\n", thread_id);

    pthread_mutex_lock(&mutex); // Khóa mutex
    counter++; // Tăng bộ đếm

    if (counter == N) {
        // Nếu đây là thread cuối cùng
        printf("All threads reached the barrier! Releasing them...\n");
        pthread_cond_broadcast(&cond); // Thông báo cho tất cả các threads
    } else {
        // Nếu chưa đủ threads đến, chờ
        while (counter < N) {
            pthread_cond_wait(&cond, &mutex);
        }
    }
    pthread_mutex_unlock(&mutex); // Mở khóa mutex

    // Sau khi được giải phóng khỏi barrier
    printf("Thread %d passed the barrier\n", thread_id);

    return NULL;
}

int main() {
    pthread_t threads[N];

    // Khởi tạo mutex và condition variable
    pthread_mutex_init(&mutex, NULL);
    pthread_cond_init(&cond, NULL);

    // Tạo N threads
    for (int i = 0; i < N; i++) {
        int* thread_id = malloc(sizeof(int)); // Cấp phát bộ nhớ cho ID thread
        *thread_id = i + 1; // Gán ID cho thread
        if (pthread_create(&threads[i], NULL, threadFunc, thread_id) != 0) {
            perror("Không thể tạo thread");
            return 1;
        }
    }

    // Chờ tất cả threads hoàn thành
    for (int i = 0; i < N; i++) {
        pthread_join(threads[i], NULL);
    }

    // Hủy mutex và condition variable
    pthread_mutex_destroy(&mutex);
    pthread_cond_destroy(&cond);

    return 0;
}
// 7. Viết chương trình sản xuất-tiêu thụ sử dụng mutex và biến điều kiện.

// Chương trình nên:

// -Sử dụng bộ đệm chia sẻ (mảng số nguyên có kích thước n).

// Có một chủ đề của nhà sản xuất:

// + Tạo số và thêm chúng vào bộ đệm.

// + Chờ nếu bộ đệm đầy.

// Có một chủ đề tiêu dùng:

// + Xóa và in số khỏi bộ đệm.

// + Chờ nếu bộ đệm trống.

#include <pthread.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

#define BUFFER_SIZE 5 // Kích thước của buffer

// Biến toàn cục
int buffer[BUFFER_SIZE]; // Buffer dùng chung
int count = 0;           // Số phần tử hiện tại trong buffer
int in = 0;              // Vị trí để producer thêm vào buffer
int out = 0;             // Vị trí để consumer lấy ra từ buffer

pthread_mutex_t mutex;   // Mutex để bảo vệ buffer
pthread_cond_t not_full; // Condition variable: buffer không đầy
pthread_cond_t not_empty;// Condition variable: buffer không rỗng

// Hàm của Producer
void* producer(void* arg) {
    while (1) {
        int item = rand() % 100; // Sinh số ngẫu nhiên

        pthread_mutex_lock(&mutex); // Khóa mutex

        // Chờ nếu buffer đầy
        while (count == BUFFER_SIZE) {
            pthread_cond_wait(&not_full, &mutex);
        }

        // Thêm item vào buffer
        buffer[in] = item;
        printf("Producer produced: %d\n", item);
        in = (in + 1) % BUFFER_SIZE; // Cập nhật vị trí tiếp theo
        count++;

        // Thông báo cho consumer rằng buffer không rỗng
        pthread_cond_signal(&not_empty);

        pthread_mutex_unlock(&mutex); // Mở khóa mutex

        sleep(1); // Tạm dừng để dễ quan sát
    }
    return NULL;
}

// Hàm của Consumer
void* consumer(void* arg) {
    while (1) {
        pthread_mutex_lock(&mutex); // Khóa mutex

        // Chờ nếu buffer rỗng
        while (count == 0) {
            pthread_cond_wait(&not_empty, &mutex);
        }

        // Lấy item từ buffer
        int item = buffer[out];
        printf("Consumer consumed: %d\n", item);
        out = (out + 1) % BUFFER_SIZE; // Cập nhật vị trí tiếp theo
        count--;

        // Thông báo cho producer rằng buffer không đầy
        pthread_cond_signal(&not_full);

        pthread_mutex_unlock(&mutex); // Mở khóa mutex

        sleep(1); // Tạm dừng để dễ quan sát
    }
    return NULL;
}

int main() {
    pthread_t producer_thread, consumer_thread;

    // Khởi tạo mutex và condition variables
    pthread_mutex_init(&mutex, NULL);
    pthread_cond_init(&not_full, NULL);
    pthread_cond_init(&not_empty, NULL);

    // Tạo producer thread
    if (pthread_create(&producer_thread, NULL, producer, NULL) != 0) {
        perror("Không thể tạo producer thread");
        return 1;
    }

    // Tạo consumer thread
    if (pthread_create(&consumer_thread, NULL, consumer, NULL) != 0) {
        perror("Không thể tạo consumer thread");
        return 1;
    }

    // Chờ các thread (trong trường hợp này là vô hạn)
    pthread_join(producer_thread, NULL);
    pthread_join(consumer_thread, NULL);

    // Hủy mutex và condition variables
    pthread_mutex_destroy(&mutex);
    pthread_cond_destroy(&not_full);
    pthread_cond_destroy(&not_empty);

    return 0;
}
