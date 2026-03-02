DROP DATABASE IF EXISTS uet_devices;
CREATE DATABASE uet_devices;
USE uet_devices;

-- Table structure for table `department`
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `department` WRITE;
INSERT INTO `department` VALUES 
(1,'Khoa công nghệ thông tin'),
(2,'Khoa điện tử viễn thông'),
(3,'Khoa vật lý kỹ thuật & Công nghệ Nano'),
(4,'Khoa cơ học Kỹ thuật & Tự động hóa'),
(5,'Khoa công nghệ Nông nghiệp'),
(6,'Khoa công nghệ Xây dựng và Giao thông'),
(7,'Viện công nghệ Hàng không Vũ trụ'),
(8,'Viện tiên tiến về Kỹ thuật & Công nghệ'),
(9,'Viện trí tuệ nhân tạo');
UNLOCK TABLES;

-- Table structure for table `account`
DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','MANAGER') DEFAULT NULL,
  `status` enum('ACTIVE','BLOCK') DEFAULT NULL,
  `last_change_password_date_time` datetime(6) DEFAULT NULL,
  `created_date_time` datetime(6) DEFAULT NULL,
  `updated_date_time` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `account` WRITE;
INSERT INTO `account`  
VALUES 
(1,'nguyenquhuy158@gmail.com', 'Nguyễn', 'Quang Huy', 'nguyenhuy', '$2a$10$W2neF9.6Agi6kAKVq8q3fec5dHW8KUA.b0VSIGdIZyUravfLpyIFi', 'ADMIN', 'ACTIVE',  NOW(), NOW(), NOW()),
(2, 'jane.smith@example.com', 'Jane', 'Smith', 'janesmith', '$2a$10$lazuFs3RTDrzWfWWUjFtVu8w7Df802bEmMZ70WlmJcDuE9x1z.bWO', 'MANAGER', 'ACTIVE',  NOW(), NOW(), NOW()),
(3, 'ripgobaby@gmail.com', 'Alice', 'Jones', 'alicejones', '$2a$10$zY1IiS8QlDEYsSoDdKlBPej9RRJYY6fq.o5z.xpFw7ybrFY//rm6G', 'MANAGER', 'BLOCK', NOW(), NOW(), NOW());
UNLOCK TABLES;

-- Table structure for table `devicesType`
DROP TABLE IF EXISTS `devicesType`;
CREATE TABLE `devicesType` (
    id INT UNSIGNED NOT NULL  AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
	`code` VARCHAR(20) NOT NULL,
	quantity INT UNSIGNED DEFAULT 0 NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `devicesType` WRITE;
INSERT INTO devicesType  VALUES
(1, 'Type A', 'ABC', 11),
(2, 'Type B', 'AJD', 9),
(3, 'Type C', 'JDM',9),
(4, 'Type D', 'JAS',0),
(5, 'Type E', 'XYZ', 0),
(6, 'Type F', 'LMN', 0),
(7, 'Type G', 'OPQ', 0),
(8, 'Type H', 'RST', 0),
(9, 'Type I', 'UVW', 0),
(10, 'Type J', 'QRS', 0),
(11, 'Type K', 'TUV', 0),
(12, 'Type L', 'WXY', 0),
(13, 'Type M', 'ZAB', 0),
(14, 'Type N', 'CDE', 0),
(15, 'Type O', 'FGH', 0),
(16, 'Type P', 'IJK', 0),
(17, 'Type Q', 'LMN', 0),
(18, 'Type R', 'OPQ', 0),
(19, 'Type S', 'RST', 0),
(20, 'Type T', 'UVW', 0),
(21, 'Type U', 'XYZ', 0),
(22, 'Type V', 'ABC', 0),
(23, 'Type W', 'DEF', 0),
(24, 'Type X', 'GHI', 0);
UNLOCK TABLES;

-- Table structure for table `subjects`
DROP TABLE IF EXISTS `subjects`;
CREATE TABLE `subjects` (
  `id` INT UNSIGNED AUTO_INCREMENT,
  `name` varchar(100) NOT NULL UNIQUE,
  department_Id INT UNSIGNED NOT NULL,
  FOREIGN KEY (department_Id) REFERENCES department(id),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `subjects` WRITE;
INSERT INTO subjects  VALUES
(1, 'Bộ môn Điện tử và Kỹ thuật máy tính',  1),
(2, 'Bộ môn Thông tin vô tuyến',  2),
(3, 'Bộ môn hệ thống viễn thông', 3),
(4, 'Bộ môn Điện tử viễn thông', 3),
(5, 'Bộ môn Khoa học Máy tính', 3),
(6, 'Bộ môn Công nghệ Phần mềm', 4);
UNLOCK TABLES;

-- Table structure for table `laboratories`
DROP TABLE IF EXISTS `laboratories`;
CREATE TABLE `laboratories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
    manager_Name varchar(100) NOT NULL,
    quantity INT UNSIGNED DEFAULT 0,
  email VARCHAR(50) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  department_Id INT UNSIGNED DEFAULT NULL,
  subject_Id INT UNSIGNED DEFAULT NULL,
  location VARCHAR(100) NOT NULL,
  FOREIGN KEY (department_Id) REFERENCES department(id),
  FOREIGN KEY (subject_Id) REFERENCES subjects(id) ON DELETE SET NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `laboratories` WRITE;
INSERT INTO laboratories  VALUES
(1, 'Phòng thí nghiệm Tín hiệu và Hệ thống', 'Bùi Trung Ninh', 11, 'ninhbt@vnu.edu.vn', '123-456-7890', 1, 1, 'Tòa nhà A'),
(2, 'Phòng thực tập Điện tử viễn thông', 'Phạm Duy Hưng', 9, 'hungpd@vnu.edu.vn', '345-678-9922',2, 2, 'Tòa nhà B'),
(3, 'Phòng Thí nghiệm Hệ thống Nhúng','Phạm Đình Tuân', 9, 'tuanpd@vnu.edu.vn', '345-678-9012', 3, 3, 'Tòa nhà C'),
(4, 'Phòng thí nghiệm tương tác người máy','Hoàng Gia Hưng', 0,'hunghg@vnu.edu.vn', '345-678-90123', 3, 4, 'Tòa nhà D'),
(5, 'Phòng thí nghiệm công nghệ quang tử', 'Lâm Sinh Công', 0,'congls@vnu.edu.vn', '123-456-78910' , 4, 4, 'Tòa nhà E'),
(6, 'Phòng thí nghiệm kỹ thuật năng lượng', 'Đinh Thị Thái Mai', 0,'dttmai@vnu.edu.vn', '123-456-7820', 4, 5, 'Tòa nhà F');
UNLOCK TABLES;

-- Table structure for table `detail`
DROP TABLE IF EXISTS `detail`;
CREATE TABLE `detail` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  assignment_Date DATE,
  note TEXT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `detail` WRITE;
INSERT INTO `detail` VALUES
(1, '2024-01-15', 'Kiểm tra chức năng của mạch điện trong hệ thống điều khiển'),
(2, '2024-02-01', 'Vi mạch gặp lỗi không nhận tín hiệu, cần kiểm tra lại kết nối'),
(3, '2024-03-10', 'Robot không hoạt động, cần kiểm tra nguồn điện và cảm biến'),
(4, '2024-04-05', 'Mạch điều khiển tự động không phản hồi, cần sửa chữa'),
(5, '2024-05-20', 'Cần nâng cấp vi mạch để tăng cường hiệu suất xử lý'),
(6, '2024-06-15', 'Kiểm tra mạch điện cho robot, phát hiện lỗi trong phần mềm điều khiển'),
(7, '2024-07-30', 'Robot sản xuất gặp sự cố, cần thay thế bộ phận cảm biến'),
(8, '2024-08-25', 'Ra mắt robot mới với chức năng tự động hóa, đảm bảo hoạt động ổn định'),
(9, '2024-09-10', 'Đào tạo nhân viên về cách sử dụng mạch điện và vi mạch mới'),
(10, '2024-10-05', 'Lập kế hoạch bảo trì cho các mạch và robot trong năm tới'),

(11, '2024-11-01', 'Kiểm tra hiệu suất vi mạch, phát hiện lỗi cần khắc phục'),
(12, '2024-11-15', 'Tổ chức hội thảo về ứng dụng của mạch điện và vi mạch trong công nghiệp'),
(13, '2024-12-01', 'Phân tích phản hồi về lỗi từ robot trong quá trình sản xuất'),
(14, '2024-12-10', 'Đánh giá hiệu suất của mạch điều khiển, phát hiện lỗi phần mềm'),
(15, '2024-12-20', 'Kiểm tra các mạch điện trước khi đóng sổ tài chính, đảm bảo hoạt động bình thường'),
(16, '2025-01-05', 'Lập kế hoạch cho dự án robot tự động, đảm bảo chức năng hoạt động hiệu quả'),
(17, '2025-01-15', 'Đánh giá nhà cung cấp vi mạch, kiểm tra chất lượng sản phẩm'),
(18, '2025-01-25', 'Nghiên cứu thị trường vi mạch, phát hiện các lỗi phổ biến'),
(19, '2025-02-05', 'Kiểm tra chất lượng mạch điện trước khi đưa vào sử dụng, phát hiện lỗi'),
(20, '2025-02-15', 'Phát triển tài liệu hướng dẫn sử dụng cho robot mới, bao gồm các lỗi thường gặp'),

(21, '2025-03-01', 'Tổ chức hội thảo về các chức năng của robot trong sản xuất'),
(22, '2025-03-15', 'Đánh giá tiến độ dự án phát triển mạch điện, phát hiện trục trặc'),
(23, '2025-04-05', 'Chuẩn bị báo cáo về hiệu suất robot trong năm qua, chỉ ra lỗi phát sinh'),
(24, '2025-04-20', 'Đào tạo kỹ năng sử dụng vi mạch cho nhân viên, bao gồm xử lý lỗi'),
(25, '2025-05-10', 'Phát triển ứng dụng cho robot thông minh, kiểm tra chức năng hoạt động'),
(26, '2025-05-25', 'Bảo trì hệ thống và các mạch điện kết nối, phát hiện lỗi kết nối'),
(27, '2025-06-10', 'Nghiên cứu đối thủ cạnh tranh trong lĩnh vực mạch và robot, phân tích chức năng sản phẩm'),
(28, '2025-06-20', 'Tham gia hội nghị về công nghệ mạch điện và robot mới, tìm hiểu về các lỗi phổ biến'),
(29, '2025-07-01', 'Phát triển chiến lược tiếp thị cho vi mạch mới, bao gồm các chức năng nổi bật');


UNLOCK TABLES;

-- Table structure for table `maintenance`
DROP TABLE IF EXISTS `maintenance`;
CREATE TABLE `maintenance` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  maintenance_Date DATE,
  `description` TEXT,
  note TEXT,
  expense DECIMAL(20, 2) ,
  `address` VARCHAR(255) DEFAULT NULL,
  quantity INT UNSIGNED DEFAULT 0,
  `status` enum('DONE', 'UNFINISHED') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `maintenance` WRITE;
INSERT INTO `maintenance` VALUES
(1, '2023-01-15', 'Thay thế CPU', 'Thay thế CPU cho máy tính A', 250.00, '123 Đường Lê Văn Lương, Hà Nội', 1, 'DONE'),
(2, '2023-01-20', 'Nâng cấp RAM', 'Nâng cấp 8GB RAM cho máy tính B', 150.00, '456 Đường Nguyễn Trãi, Hà Nội', 1, 'DONE'),
(3, '2023-02-05', 'Sửa chữa bo mạch chủ', 'Sửa chữa bo mạch chủ cho máy tính C', 300.00, '789 Đường Kim Mã, Hà Nội', 1, 'UNFINISHED'),
(4, '2023-02-15', 'Thay thế ổ cứng', 'Thay thế ổ cứng HDD bằng SSD', 400.00, '101 Đường Đội Cấn, Hà Nội', 1, 'DONE'),
(5, '2023-03-10', 'Cài đặt phần mềm', 'Cài đặt hệ điều hành cho máy tính D', 100.00, '202 Đường Trần Duy Hưng, Hà Nội', 1, 'DONE'),
(6, '2023-03-20', 'Kiểm tra nguồn điện', 'Kiểm tra nguồn điện cho máy tính E', 80.00, '303 Đường Hoàng Quốc Việt, Hà Nội', 1,'DONE'),
(7, '2023-04-01', 'Thay thế card đồ họa', 'Thay thế card đồ họa cho máy tính F', 500.00, '404 Đường Phạm Văn Đồng, Hà Nội', 1,'UNFINISHED'),
(8, '2023-04-15', 'Bảo trì quạt tản nhiệt', 'Bảo trì quạt tản nhiệt cho máy tính G', 60.00, '505 Đường Nguyễn Khánh Toàn, Hà Nội', 1,'DONE'),
(9, '2023-05-05', 'Kiểm tra ổ đĩa', 'Kiểm tra tình trạng ổ đĩa cho máy tính H', 120.00, '606 Đường Cầu Giấy, Hà Nội', 1,'DONE'),
(10, '2023-05-20', 'Thay thế dây cáp', 'Thay thế dây cáp kết nối cho máy tính I', 40.00, '707 Đường Bưởi, Hà Nội', 1,'UNFINISHED'),
(11,'2023-06-01', 'Thay thế quạt tản nhiệt', 'Thay thế quạt tản nhiệt cho máy tính J', 75.00, '808 Đường Nguyễn Trãi, Hà Nội', 1,'DONE'),
(12,'2023-06-10', 'Nâng cấp phần mềm', 'Nâng cấp phần mềm cho máy tính K', 200.00, '909 Đường Lê Lợi, Hà Nội', 1,'UNFINISHED'),
(13,'2023-06-15', 'Sửa chữa màn hình', 'Sửa chữa màn hình cho máy tính L', 350.00, '1010 Đường Trần Hưng Đạo, Hà Nội', 1,'DONE'),
(14,'2023-07-01', 'Kiểm tra hệ thống', 'Kiểm tra toàn bộ hệ thống cho máy tính M', 150.00, '1111 Đường Láng, Hà Nội', 1,'UNFINISHED'),
(15,'2023-07-10', 'Thay thế pin', 'Thay thế pin cho máy tính N', 90.00, '1212 Đường Phố Huế, Hà Nội', 1,'DONE');

UNLOCK TABLES;

-- Table structure for table `loans`
DROP TABLE IF EXISTS `loans`;

CREATE TABLE `loans` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_name` VARCHAR(100) NOT NULL,
  `contact_person` VARCHAR(100) NOT NULL,
  `contact_info` VARCHAR(100) DEFAULT NULL,
  `loan_date` DATETIME NOT NULL,
  `return_date` DATETIME DEFAULT NULL,
  `purpose` TEXT,
  `quantity` INT UNSIGNED DEFAULT 0,
  `status` enum('INUSE','RETURNED') DEFAULT 'INUSE',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


LOCK TABLES `loans` WRITE;
INSERT INTO `loans` VALUES
(1, 'K65K', 'Nguyễn Văn A', 'nguyenvana@example.com', '2024-12-01 09:00:00', NULL, 'asdasdas', 2, 'INUSE'),
(2, 'K68-CQ', 'Trần Thị B', 'tranthib@example.com', '2024-12-01 10:00:00', NULL, 'asdasdasd', 1, 'INUSE'),
(3, 'K69-M', 'Lê Văn C', 'levanc@example.com', '2024-12-01 11:00:00', NULL, 'asdasda', 2, 'INUSE'),
(4, 'K67-I', 'Phạm Thị D', 'phamthid@example.com', '2024-12-01 12:00:00', NULL, 'Dự án cuối kỳ', 1, 'INUSE'),
(5, 'K68-H', 'Nguyễn Thị E', 'nguyenthee@example.com', '2024-12-01 13:00:00', NULL, 'asdasdasd', 1, 'INUSE'),
(6, 'K64-K', 'Nguyễn Văn F', 'nguyenf@example.com', '2024-12-01 14:00:00', NULL, 'Nghiên cứu khoa học', 1, 'INUSE'),
(7, 'K66-CLC', 'Trần Văn G', 'tranvangu@example.com', '2024-12-01 15:00:00', NULL, 'Thực hiện thí nghiệm', 1, 'INUSE'),
(8, 'K67-CLC', 'Lê Thị H', 'lethih@example.com', '2024-12-01 16:00:00', NULL, 'asdasdas', 1, 'INUSE'),
(9, 'K65-R', 'Phạm Văn I', 'phamvani@example.com', '2024-12-01 17:00:00', NULL, 'dsfsdvsfsdf', 1, 'INUSE'),
(10, 'K69-M', 'Nguyễn Văn J', 'nguyenj@example.com', '2024-12-01 18:00:00', NULL, 'Ôn thi giữa kỳ', 1, 'INUSE');

UNLOCK TABLES;

-- Table structure for table `devices`
DROP TABLE IF EXISTS `devices`;
CREATE TABLE `devices` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL ,
  type_Id INT UNSIGNED NOT NULL,
  lab_Id INT UNSIGNED,
  `code` VARCHAR(100) NOT NULL,
  purchase_Date datetime(6) DEFAULT NULL,
  warranty_Date datetime(6) DEFAULT NULL,
  price DECIMAL(20, 2) NOT NULL,
  detail_Id INT UNSIGNED UNIQUE,
  maintenance_Id INT UNSIGNED UNIQUE DEFAULT NULL,
   `status` ENUM('AVAILABLE', 'INUSE', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    total INT UNSIGNED DEFAULT 0,
  FOREIGN KEY (type_Id) REFERENCES devicesType(id),
  FOREIGN KEY (lab_Id) REFERENCES laboratories(id) ON DELETE SET NULL,
  FOREIGN KEY (detail_Id) REFERENCES detail(id) ON DELETE SET NULL,
  FOREIGN KEY (maintenance_Id) REFERENCES maintenance(id) ON DELETE SET NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `devices` WRITE;
INSERT INTO `devices` VALUES
(1, 'Device A', 1, 1, 'CODE001', '2023-01-15 10:00:00', '2025-01-15 10:00:00', 1500.00,  1, null, 'INUSE', 1),
(2, 'Device B', 2, 2, 'CODE002', '2023-02-20 11:30:00', '2025-02-20 11:30:00', 2000.00,  2, null,'INUSE', 1),
(3, 'Device C', 3, 3, 'CODE003', '2023-03-25 09:45:00', '2025-03-25 09:45:00', 2500.00,  3, 3, 'MAINTENANCE', 1),
(4, 'Device D', 1, 1, 'CODE004', '2023-04-30 14:00:00', '2025-04-30 14:00:00', 3000.00,  4, null, 'INUSE', 1),
(5, 'Device E', 2, 2, 'CODE005', '2023-05-05 08:15:00', '2025-05-05 08:15:00', 3500.00,  5, null, 'INUSE', 1),
(6, 'Device F', 3, 3, 'CODE006', '2023-06-10 12:00:00', '2025-06-10 12:00:00', 4000.00,  6, 6, 'MAINTENANCE', 1),
(7, 'Device G', 1, 1, 'CODE007', '2023-07-15 16:30:00', '2025-07-15 16:30:00', 4500.00,  7, null, 'INUSE', 1),
(8, 'Device H', 2, 2, 'CODE008', '2023-08-20 10:45:00', '2025-08-20 10:45:00', 5000.00,  8, null, 'INUSE', 1),
(9, 'Device I', 3, 3, 'CODE009', '2023-09-25 13:00:00', '2025-09-25 13:00:00', 5500.00,  9, 9, 'MAINTENANCE', 1),
(10, 'Device J', 1, 1, 'CODE010', '2023-10-30 09:00:00', '2025-10-30 09:00:00', 6000.00,  10, null, 'INUSE', 1),
(11,'Device K', 1, 1, 'CODE011', '2023-11-01 10:00:00', '2025-11-01 10:00:00', 6500.00, 11, null, 'INUSE', 1),
(12,'Device L', 2, 2, 'CODE012', '2023-11-05 11:30:00', '2025-11-05 11:30:00', 7000.00, 12, null, 'INUSE', 1),
(13,'Device M', 3, 3, 'CODE013', '2023-11-10 09:45:00', '2025-11-10 09:45:00', 7500.00, 13, 10, 'MAINTENANCE', 1),
(14,'Device N', 1, 1, 'CODE014', '2023-11-15 14:00:00', '2025-11-15 14:00:00', 8000.00, 14, null, 'INUSE', 1),
(15,'Device O', 2, 2, 'CODE015', '2023-11-20 08:15:00', '2025-11-20 08:15:00', 8500.00, 15, null, 'AVAILABLE', 0),
(16,'Device P', 3, 3, 'CODE016', '2023-11-25 12:00:00', '2025-11-25 12:00:00', 9000.00, 16, 11, 'MAINTENANCE', 1),
(17,'Device Q', 1, 1, 'CODE017', '2023-11-30 16:30:00', '2025-11-30 16:30:00', 9500.00, 17, null, 'INUSE', 1),
(18,'Device R', 2, 2, 'CODE018', '2023-12-05 10:45:00', '2025-12-05 10:45:00', 10000.00, 18, null, 'AVAILABLE', 0),
(19,'Device S', 3, 3, 'CODE019', '2023-12-10 13:00:00', '2025-12-10 13:00:00', 10500.00, 19, 12, 'MAINTENANCE', 1),
(20,'Device T', 1, 1, 'CODE020', '2023-12-15 09:00:00', '2025-12-15 09:00:00', 11000.00, 20, null, 'AVAILABLE', 0),
(21,'Device U', 2, 2, 'CODE021', '2023-12-20 11:30:00', '2025-12-20 11:30:00', 11500.00, 21, null, 'INUSE', 1),
(22,'Device V', 3, 3, 'CODE022', '2023-12-25 09:45:00', '2025-12-25 09:45:00', 12000.00, 22, 13, 'MAINTENANCE', 1),
(23,'Device W', 1, 1, 'CODE023', '2023-12-30 14:00:00', '2025-12-30 14:00:00', 12500.00, 23, null, 'AVAILABLE', 0),
(24,'Device X', 2, 2, 'CODE024', '2024-01-05 08:15:00', '2026-01-05 08:15:00', 13000.00, 24, null, 'AVAILABLE', 0),
(25,'Device Y', 3, 3, 'CODE025', '2024-01-10 12:00:00', '2026-01-10 12:00:00', 13500.00, 25, 14, 'MAINTENANCE', 1),
(26,'Device Z', 1, 1, 'CODE026', '2024-01-15 16:30:00', '2026-01-15 16:30:00', 14000.00, 26, null, 'AVAILABLE', 0),
(27,'Device AA', 2, 2, 'CODE027', '2024-01-20 10:45:00', '2026-01-20 10:45:00', 14500.00, 27, null, 'AVAILABLE', 0),
(28,'Device AB', 3, 3, 'CODE028', '2024-01-25 13:00:00', '2026-01-25 13:00:00', 15000.00, 28, 15, 'MAINTENANCE', 1),
(29,'Device AC', 1, 1, 'CODE029', '2024-01-30 09:00:00', '2026-01-30 09:00:00', 15500.00, 29, null, 'AVAILABLE', 1);

UNLOCK TABLES;



DROP TABLE IF EXISTS `loan_devices`;

CREATE TABLE `loan_devices` (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    loan_id INT UNSIGNED NOT NULL,
    device_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (loan_id) REFERENCES loans(id) ON DELETE CASCADE,
    FOREIGN KEY (device_id) REFERENCES devices(id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `loan_devices` WRITE;

INSERT INTO `loan_devices`  VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 14),
(4, 3, 4),
(5, 3, 5),
(6, 4, 17),
(7, 5, 7),
(8, 6, 8),
(9, 7, 21),
(10, 8, 10),
(11, 9, 11),
(12, 10, 12);

UNLOCK TABLES;




-- Table structure for table `token`
DROP TABLE IF EXISTS `token`;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `expired_date` datetime(6) DEFAULT NULL,
  `key` varchar(100) NOT NULL,
  `type` enum('FORGOT_PASSWORD','REFRESH_TOKEN','REGISTER') NOT NULL,
  `account_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_7j0yhsp5euaky0vj1wwdpt1l2` (`key`),
  KEY `FKftkstvcfb74ogw02bo5261kno` (`account_id`),
  CONSTRAINT `FKftkstvcfb74ogw02bo5261kno` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `token` WRITE;
-- Add your inserts for the token table here
UNLOCK TABLES;
